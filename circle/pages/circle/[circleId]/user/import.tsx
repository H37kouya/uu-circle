import { DangerBunner } from '@/components/atoms/bunner/DangerBunner'
import { BlueButton } from '@/components/atoms/buttons/BlueButton'
import { SearchTextField } from '@/components/atoms/form/SearchTextField'
import { FormHeader } from '@/components/atoms/header/FormHeader'
import { SubmitLoading } from '@/components/atoms/loading/SubmitLoading'
import { BaseFooter } from '@/components/layouts/BaseFooter'
import { BaseLayout } from '@/components/layouts/BaseLayout'
import {
  BaseBreadcrumbItem,
  BaseBreadcrumbs,
} from '@/components/molecules/Breadcrumbs/BaseBreadcrumbs'
import { BaseContainer } from '@/components/molecules/Container/BaseContainer'
import { IndexCircleUserListByImport } from '@/components/organisms/CircleUser/IndexCircleUserListByImport'
import { AuthContext } from '@/contexts/AuthContext'
import { useStringInput } from '@/hooks/useInput'
import { showCircle } from '@/infra/api/circle'
import { importCircleUser, searchCircleUser } from '@/infra/api/circleUser'
import { Role } from '@/lib/enum/api/Role'
import {
  ImportCircleUserRequest,
  isImportCircleUserRequestValidationError,
} from '@/lib/types/api/ImportCircleUserRequest'
import { User } from '@/lib/types/model/User'
import { faUser } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { NextPage } from 'next'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { FormEvent, useContext, useMemo, useState } from 'react'
import useSWR from 'swr'

const useParams = () => {
  const router = useRouter()
  const { circleId } = router.query

  return {
    isError: !circleId || Array.isArray(circleId),
    circleId: Number(circleId),
  }
}

const CreatePage: NextPage = () => {
  const authContext = useContext(AuthContext)
  const router = useRouter()
  const [isOpen, setIsOpen] = useState(false)
  const [user, setUser] = useState<User[]>()
  const searchText = useStringInput('')
  const { circleId } = useParams()

  const { data: circle } = useSWR(
    [`/circle/api/circle/${circleId}`, circleId],
    () => showCircle(circleId)
  )

  const role = useStringInput('')

  const onSearch = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setIsOpen(true)
    searchText.setErrors([])

    if (searchText.value && searchText.value.length > 2) {
      const data = await searchCircleUser(circleId, searchText.value)
      setUser(data.users)
      searchText.setErrors(
        data.users.length === 0
          ? ['検索結果は0件でした。別のキーワードを試してください。']
          : []
      )
      setIsOpen(false)
      return
    }

    searchText.setErrors(['検索する文字列は3文字以上で検索してください'])
    setIsOpen(false)
  }

  const onSubmit = async (userId: number, newRole: Role) => {
    setIsOpen(true)

    const data = await importCircleUser(circleId, userId, {
      type: 'ImportCircleUserRequest',
      role: newRole,
    } as ImportCircleUserRequest)

    if (isImportCircleUserRequestValidationError(data)) {
      role.setErrors(data.errors.role)
      setIsOpen(false)

      return
    }

    console.log('onSubmit Done')

    await router.push(`/circle/${circleId}/user`)
  }

  const baseBreadcrumbsItems: BaseBreadcrumbItem[] = useMemo(() => {
    return circle && circle.circle
      ? [
          ...[
            {
              text: circle.circle.shortName || circle.circle.name,
              href: `/circle/[circleId]`,
              as: `/circle/${circle.circle.id}`,
            },
            {
              text: `部員アカウント一覧`,
              href: `/circle/[circleId]/user`,
              as: `/circle/${circle.circle.id}/user`,
            },
            {
              text: `既存部員アカウント招待`,
              href: `/circle/[circleId]/user/import`,
              as: `/circle/${circle.circle.id}/user/import`,
              active: true,
            },
          ],
        ]
      : []
  }, [circle])

  return (
    <div>
      <BaseLayout user={authContext.user}>
        <BaseBreadcrumbs items={baseBreadcrumbsItems} />

        <h1 className="text-lg font-bold bg-white text-center py-6">
          <FontAwesomeIcon icon={faUser} className="mr-4" size="lg" />
          既存部員アカウントを招待
        </h1>

        <BaseContainer>
          <div className="px-2 pt-8 pb-32">
            <p className="pb-8">
              <Link
                href="/circle/[circleId]/user"
                as={`/circle/${Number(circleId)}/user`}
              >
                <a className="underline text-blue-500">← 戻る</a>
              </Link>
            </p>

            <SubmitLoading isOpen={isOpen} />

            <div className="mb-8">
              <p className="text-sm">ユーザー検索</p>

              <form onSubmit={onSearch}>
                <div className="mb-4">
                  <SearchTextField
                    id="searchUser"
                    name="searchUser"
                    expand
                    {...searchText}
                  />
                </div>

                <div className="flex justify-center">
                  <BlueButton type="submit">検索</BlueButton>
                </div>
              </form>
            </div>

            <FormHeader>ユーザーを招待する</FormHeader>

            {role.error ? <DangerBunner text={role.error} /> : ''}

            {user && user.length > 0 ? (
              <IndexCircleUserListByImport
                users={user}
                onClickCommon={(userId: number) =>
                  onSubmit(userId, Role.COMMON)
                }
                onClickManager={(userId: number) =>
                  onSubmit(userId, Role.MANAGER)
                }
              />
            ) : (
              <p>ユーザーを検索してください</p>
            )}
          </div>
        </BaseContainer>

        <BaseFooter />
      </BaseLayout>
    </div>
  )
}

export default CreatePage
