import { GreenButton } from '@/components/atoms/buttons/GreenButton'
import { BaseTextField } from '@/components/atoms/form/BaseTextField'
import { BaseHeader } from '@/components/layouts/BaseHeader'
import { BaseContainer } from '@/components/layouts/BaseContainer'
import { BaseSidebar } from '@/components/layouts/BaseSidebar'
import { AuthContext } from '@/contexts/AuthContext'
import { useInput } from '@/hooks/useInput'
import { createCircleNewJoy, getCircleNewJoy, updateCircleNewJoy } from '@/infra/api/cirecle_new_joy'
import { NextPage } from 'next'
import { useRouter } from 'next/router'
import { useContext, useEffect, useState } from 'react'
import { BaseSelect } from '@/components/atoms/form/BaseSelect'
import { getAllPlaceOfActivity } from '@/lib/enum/api/PlaceOfActivity'
import { __ } from '@/lang/ja'
import { Circle } from '@/infra/api/types'
import { isUpdateCircleNewJoyRequestValidationError, UpdateCircleNewJoyRequest } from '@/lib/types/api/UpdateCircleNewJoyRequest'

const CreatePage: NextPage = () => {
    const authContext = useContext(AuthContext)
    const router = useRouter()
    const { id, circleNewJoyId } = router.query
    const [circle, setCircle] = useState<Circle|null>(null)

    const title = useInput('')
    const description = useInput('')
    const url = useInput('')
    const placeOfActivity = useInput('')
    const placeOfActivityDetail = useInput('')
    const publishFrom = useInput('')
    const publishTo = useInput('')
    const startDate = useInput('')
    const endDate = useInput('')
    const release = useInput('true')

    useEffect(() => {
        const f = async () => {
            const {
                circle: newCircle,
                circleNewJoy
            } = await getCircleNewJoy(Number(id), Number(circleNewJoyId), authContext.accessToken)
            setCircle(newCircle)

            title.set(circleNewJoy.title)
            description.set(circleNewJoy.description)
            url.set(circleNewJoy.url)
            placeOfActivity.set(circleNewJoy.placeOfActivity || 'null')
            placeOfActivityDetail.set(circleNewJoy.placeOfActivityDetail || '')
            publishFrom.set(circleNewJoy.publishFrom || '')
            publishTo.set(circleNewJoy.publishTo || '')
            startDate.set(circleNewJoy.startDate || '')
            endDate.set(circleNewJoy.endDate || '')
            release.set(circleNewJoy.release === true ? 'true' : 'false')
        }

        if (authContext.accessToken && !Array.isArray(id)) {
            f()
        }
    }, [ authContext.accessToken, id ])

    const onSubmit = async (event) => {
        event.preventDefault()

        const data = await updateCircleNewJoy(
            Number(id),
            Number(circleNewJoyId),
            {
                type: 'UpdateCircleNewJoyRequest',
                title: title.value,
                description: description.value,
                url: url.value,
                placeOfActivity: placeOfActivity.value !== 'null' ? placeOfActivity.value : null,
                placeOfActivityDetail: placeOfActivityDetail.value,
                publishFrom: publishFrom.value,
                publishTo: publishTo.value,
                startDate: startDate.value,
                endDate: endDate.value,
                release: release.value === 'true',
            } as UpdateCircleNewJoyRequest, authContext.accessToken)

        if (data && isUpdateCircleNewJoyRequestValidationError(data)) {
            title.setError(data.errors.title && Array.isArray(data.errors.title) ? data.errors.title[0] : '')
            description.setError(data.errors.description && Array.isArray(data.errors.description) ? data.errors.description[0] : '')
            url.setError(data.errors.url && Array.isArray(data.errors.url) ? data.errors.url[0] : '')
            placeOfActivity.setError(data.errors.placeOfActivity && Array.isArray(data.errors.placeOfActivity) ? data.errors.placeOfActivity[0] : '')
            placeOfActivityDetail.setError(data.errors.placeOfActivityDetail && Array.isArray(data.errors.placeOfActivityDetail) ? data.errors.placeOfActivityDetail[0] : '')
            publishFrom.setError(data.errors.publishFrom && Array.isArray(data.errors.publishFrom) ? data.errors.publishFrom[0] : '')
            publishTo.setError(data.errors.publishTo && Array.isArray(data.errors.publishTo) ? data.errors.publishTo[0] : '')
            startDate.setError(data.errors.startDate && Array.isArray(data.errors.startDate) ? data.errors.startDate[0] : '')
            endDate.setError(data.errors.endDate && Array.isArray(data.errors.endDate) ? data.errors.endDate[0] : '')
            release.setError(data.errors.release && Array.isArray(data.errors.release) ? data.errors.release[0] : '')

            return
        }

        await router.push(`/circle/${id}/newjoy`)
    }

    return (
        <div>
            <BaseHeader />

            <BaseContainer>
                <div className="flex flex-wrap">
                    <div className="w-full lg:w-1/5">
                        <BaseSidebar />
                    </div>

                    <div className="w-full lg:w-4/5">
                        <div className="py-10">
                            <div className="flex justify-between mb-8">
                                <h1 className="text-2xl text-gray-100">
                                サークル新歓編集
                                </h1>
                            </div>

                            <div className="border-2 border-gray-800 px-2 py-4">
                                <form onSubmit={onSubmit}>
                                    <BaseSelect
                                        label="公開設定"
                                        id="release"
                                        name="release"
                                        items={[
                                            { value: 'true', label: '公開' },
                                            { value: 'false', label: '非公開' },
                                        ]}
                                        { ...release }
                                    />

                                    <BaseTextField
                                        label="サークル新歓"
                                        name="title"
                                        id="title"
                                        required
                                        { ...title }
                                    />

                                    <BaseTextField
                                        label="新歓URLのパス"
                                        name="url"
                                        id="url"
                                        placeholder="u-lab"
                                        note="新歓の告知で使うURLをはってください。(Twitterなど)。zoomは安全上、控えてください"
                                        { ...url }
                                    />

                                    <BaseTextField
                                        label="サークル新歓説明"
                                        name="description"
                                        id="description"
                                        required
                                        { ...description }
                                    />

                                    <BaseSelect
                                        label="活動場所"
                                        id="placeOfActivity"
                                        name="placeOfActivity"
                                        items={[
                                            ...getAllPlaceOfActivity().map((_placeOfActivity) => ({
                                                value: _placeOfActivity,
                                                label: __(_placeOfActivity)
                                            }))
                                        ]}
                                        { ...placeOfActivity }
                                    />

                                    <BaseTextField
                                        label="サークル新歓活動場所"
                                        name="placeOfActivityDetail"
                                        id="placeOfActivityDetail"
                                        { ...placeOfActivityDetail }
                                    />

                                    <BaseTextField
                                        label="公開開始日時"
                                        name="publishFrom"
                                        id="publishFrom"
                                        type="date"
                                        { ...publishFrom }
                                    />

                                    <BaseTextField
                                        label="公開終了日時"
                                        name="publishTo"
                                        id="publishTo"
                                        type="date"
                                        { ...publishTo }
                                    />

                                    <BaseTextField
                                        label="新歓開始日時"
                                        name="startDate"
                                        id="startDate"
                                        type="datetime-local"
                                        { ...startDate }
                                    />

                                    <BaseTextField
                                        label="新歓終了日時"
                                        name="endDate"
                                        id="endDate"
                                        type="datetime-local"
                                        { ...endDate }
                                    />

                                    <div className="flex justify-center mt-8">
                                        <GreenButton type="submit">
                                            進む
                                        </GreenButton>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </BaseContainer>
        </div>
    )
}

export default CreatePage