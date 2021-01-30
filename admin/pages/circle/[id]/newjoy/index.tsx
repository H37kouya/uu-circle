import { GreenButton } from '@/components/atoms/buttons/GreenButton'
import { BaseContainer } from '@/components/layouts/BaseContainer'
import { BaseSidebar } from '@/components/layouts/BaseSidebar'
import { BaseHeader } from '@/components/layouts/BaseHeader'
import { CircleNewJoyListItem } from '@/components/molecules/list_items/CircleNewJoyListItem'
import { AuthContext } from '@/contexts/AuthContext'
import { getCircleNewJoyList } from '@/infra/api/cirecle_new_joy'
import { Circle, CircleNewJoy } from '@/infra/api/types'
import { NextPage } from 'next'
import { useRouter } from 'next/router'
import { useContext, useEffect, useState } from 'react'


const IndexPage: NextPage = () => {
    const authContext = useContext(AuthContext)
    const router = useRouter()
    const [circle, setCircle] = useState<Circle|null>(null)
    const [circleNewJoys, setCircleNewJoys] = useState<CircleNewJoy[]>([])
    const { id } = router.query

    useEffect(() => {
        const f = async () => {
            const {
                circle,
                circleNewJoys
            } = await getCircleNewJoyList(Number(id), authContext.accessToken)
            setCircle(circle)
            setCircleNewJoys(circleNewJoys)
        }

        if (authContext.accessToken && !Array.isArray(id)) {
            f()
        }
    }, [ authContext.accessToken, id ])

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
                                { 
                                    (circle && circle.name) ? `${circle.name}の新歓` : 'loading...'
                                 }
                            </h1>

                            <GreenButton href="/circle/[id]/newjoy/create" as={`/circle/${id}/newjoy/create`}>
                                新歓新規作成
                            </GreenButton>
                        </div>

                        <div className="border-2 border-gray-800 p-2">
                            {authContext.accessToken && circleNewJoys.length > 0 ? (
                                circleNewJoys.map((circleNewJoy: CircleNewJoy) => {
                                    return <CircleNewJoyListItem
                                        key={`circle-${circleNewJoy.id}`}
                                        circleNewJoy={circleNewJoy}
                                    />
                                })
                            ) : ''}
                            {authContext.accessToken && circleNewJoys.length === 0 ? (
                                <div className="py-4">
                                    <p className="text-white">まだ新歓が登録されていません</p>
                                </div>
                            ) : ''}
                        </div>
                    </div>
                </div>
                </div>
            </BaseContainer>
        </div>
    )
}

export default IndexPage