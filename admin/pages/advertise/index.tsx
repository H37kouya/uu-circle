import { useState } from 'react'
import { NextPage } from 'next'
import useSWR from 'swr'
import { DangerBunner } from '@/components/atoms/bunner/DangerBunner'
import { SuccessBunner } from '@/components/atoms/bunner/SuccessBunner'
import { BaseContainer } from '@/components/layouts/BaseContainer'
import { BaseWrapper } from '@/components/layouts/BaseWrapper'
import { BaseHeader } from '@/components/layouts/BaseHeader'
import { AdvertiseListItem } from '@/components/molecules/list_items/AdvertiseListItem'
import { useSuccess } from '@/hooks/useSuccess'
import { deleteAdvertise, getAdvertiseList } from '@/infra/api/advertise'
import { Advertise } from '@/lib/types/model/Advertise'


const IndexPage: NextPage = () => {
    const [ advertises, setAdvertise ] = useState<Advertise[]>([])
    const [ error, setError ] = useState<string>('')
    const { success, setSuccess } = useSuccess<string>('')
    
    const fetchAdvertise = async () => {
        setAdvertise(await getAdvertiseList())
    }
    useSWR('/admin/api/advertise', fetchAdvertise)

    const onDelete = async (advertiseId: number) => {
        setError('')
        setSuccess('')
        const data = await deleteAdvertise(advertiseId)

        if (data && data.type === 'Success') {
            setSuccess('広告を削除しました', 3000)
            fetchAdvertise()
            return
        }
    }

    return (
        <div>
            <BaseHeader />

            <BaseContainer>
                <BaseWrapper
                    title="広告管理"
                    actionText="広告発行"
                    actionHref="/advertise/create"
                >
                    {
                        success ? (
                            <SuccessBunner text={success} />
                        ) : ''
                    }

                    {
                        error ? (
                            <DangerBunner text={error} />
                        ) : ''
                    }

                    <div className="border-2 border-gray-800 p-2">
                        {advertises.length > 0 ? (
                            advertises.map((advertise: Advertise) => {
                                return <AdvertiseListItem
                                    key={`circle-${advertise.id}`}
                                    advertise={advertise}
                                    onDelete={onDelete}
                                />
                            })
                        ) : ''}

                        {advertises.length === 0 ? (
                            <div className="py-4">
                                <p className="text-white">まだサークルが登録されていません</p>
                            </div>
                        ) : ''}
                    </div>
                </BaseWrapper>
            </BaseContainer>
        </div>
    )
}

export default IndexPage