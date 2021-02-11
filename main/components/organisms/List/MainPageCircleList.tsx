import { FC } from "react";
import Image from 'next/image'
import { Circle } from "@/lib/types/model/Circle";

type Props = {
    circles: Circle[]
}
const MainPageCircleList: FC<Props> = ({ circles }) => {
    const width = 400
    // w : h = 210 : 297
    const height = width * 297 / 210

    return (
        <div>
            <div className="max-w-screen-md md:mx-auto grid grid-cols-3 gap-4">
                {circles.map((circle) => {
                    return (
                        <div key={circle.id}>
                            <Image 
                                src={circle.handbillImageUrl} 
                                alt={`${circle.name}のビラ`}
                                width={width} 
                                height={height}
                            />

                            <h3 className="text-center font-bold">
                                { circle.name }
                            </h3>
                        </div>
                    )
                }) }
            </div>
        </div>
    )
}

export { MainPageCircleList }