import { DangerBunner } from "@/components/atoms/bunner/DangerBunner"
import { RedButton } from "@/components/atoms/buttons/RedButton"
import { BaseContainer } from "@/components/layouts/BaseContainer"
import { BaseHeader } from "@/components/layouts/BaseHeader"
import { BaseWrapper } from "@/components/layouts/BaseWrapper"
import { deleteAdminUser, getAdminUser } from "@/infra/api/admin_user"
import { getAuthUser } from "@/infra/api/auth"
import { NextPage } from "next"
import { useRouter } from "next/router"
import { FormEvent, useEffect, useState } from "react"
import useSWR from "swr"

const DeletePage: NextPage = () => {
    const router = useRouter()
    const { userId } = router.query
    const [ error, setError ] = useState('本当に削除しますか。削除したら元に戻せません。')
    const { data: user } = useSWR(
        ['/admin/api/admin-user/[userId]', Number(userId)], 
        () => getAdminUser(Number(userId))
    )
    const { data: authUser } = useSWR(
        '/admin/api/user',
        getAuthUser
    )

    useEffect(() => {
        if (authUser && Number(userId) === authUser.id) {
            router.push('/user/admin')
            return
        }
    }, [ authUser, userId ])

    const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        setError('')
        const data = await deleteAdminUser(Number(userId))

        if (data && data.type === 'DeleteAdminUserValidationError') {
            setError(data.errors.data)
            return
        }

        if (data && data.type === 'success') {
            router.push('/user/admin')
            return
        }
    }

    return (
        <div>
            <BaseHeader />

            <BaseContainer>
                <BaseWrapper
                    title={user ? `${user.displayName}の削除をしますか` : ''}
                    actionHref="/user/admin"
                    actionText="管理者アカウント一覧に戻る"
                >
                    <div className="border-2 border-gray-800 p-2">
                        {
                            error ? (
                                <DangerBunner text={error} />
                            ) : ''
                        }

                        <form onSubmit={onSubmit}>
                            <div className="text-center">
                                <RedButton type="submit">
                                    削除する
                                </RedButton>
                            </div>
                        </form>
                    </div>
                </BaseWrapper>
            </BaseContainer>
        </div>
    )
}

export default DeletePage