
import { GreenButton } from '@/components/atoms/buttons/GreenButton'
import { BaseTextField } from '@/components/atoms/form/BaseTextField'
import { BaseContainer } from '@/components/layouts/BaseContainer'
import { BaseSidebar } from '@/components/layouts/BaseSidebar'
import { AuthContext } from '@/contexts/AuthContext'
import { useInput } from '@/hooks/useInput'
import { createAdminUser } from '@/infra/api/admin_user'
import { NextPage } from 'next'
import { useRouter } from 'next/router'
import { useContext } from 'react'
import { BaseHeader } from '@/components/layouts/BaseHeader'
import { isRegisterAdminFormRequestValidationError, RegisterAdminFormRequest } from '@/lib/types/api/RegisterAdminFormRequest'
import { BaseWrapper } from '@/components/layouts/BaseWrapper'

const CreatePage: NextPage = () => {
    const authContext = useContext(AuthContext)
    const router = useRouter()

    const username = useInput('')
    const displayName = useInput('')
    const email = useInput('')

    const onSubmit = async (event) => {
        event.preventDefault()

        const data = await createAdminUser({
            username: username.value,
            displayName: displayName.value,
            email: email.value
        } as RegisterAdminFormRequest, authContext.accessToken)

        if (isRegisterAdminFormRequestValidationError(data)) {
            username.setError(data.errors.username && Array.isArray(data.errors.username) ? data.errors.username[0] : '')
            displayName.setError(data.errors.displayName && Array.isArray(data.errors.displayName) ? data.errors.displayName[0] : '')
            email.setError(data.errors.email && Array.isArray(data.errors.email) ? data.errors.email[0] : '')

            return
        }

        await router.push('/user/admin')
    }

    return (
        <div>
            <BaseHeader />

            <BaseContainer>
                <BaseWrapper
                    title="管理者アカウント新規作成"
                >
                    <div className="border-2 border-gray-800 px-2 py-4">
                        <form onSubmit={onSubmit}>
                            <BaseTextField
                                label="ユーザー名"
                                name="username"
                                id="username"
                                note="アルファベット、ハイフンのみ。入力がない場合は、自動で決まります"
                                { ...username }
                            />

                            <BaseTextField
                                label="表示名"
                                name="display_name"
                                id="display_name"
                                placeholder="u-lab"
                                note="入力がない場合は、自動で決まります"
                                { ...displayName }
                            />

                            <BaseTextField
                                label="メールアドレス"
                                name="email"
                                id="email"
                                required
                                placeholder="example@example.com"
                                { ...email }
                            />

                            <div className="flex justify-center mt-8">
                                <GreenButton type="submit">
                                    進む
                                </GreenButton>
                            </div>
                        </form>
                    </div>
                </BaseWrapper>
            </BaseContainer>
        </div>
    )
}

export default CreatePage