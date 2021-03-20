import { useMediaQuery } from "@/hooks/useMediaQuery"
import Image from "next/image"
import Link from "next/link"
import { FC } from "react"

type Props = {
  circleId: number
  name: string
}
const CircleNameHeader: FC<Props> = ({ circleId, name }) => {
  const { isMd } = useMediaQuery()

  return (
    <div className="flex justify-between items-center py-8 px-8 border-b border-gray-300">
      <div className="flex items-center">
        <div className="mr-4">
          <Link href="/circle/[circleId]" as={`/circle/${circleId}`}>
            <a>
              <Image
                src="/images/no-image.png"
                width={isMd ? 80 : 62}
                height={isMd ? 80 : 62}
                className="rounded-full"
              />
            </a>
          </Link>
        </div>

        <Link href="/circle/[circleId]" as={`/circle/${circleId}`}>
          <a>
            <h1 className="text-black text-lg md:text-2xl font-bold">
              { name }
            </h1>
          </a>
        </Link>
      </div>

      <div>
        <Link href="/">
          <a className="text-blue-500 hover:underline text-sm">切り替え</a>
        </Link>
      </div>
    </div>
  )
}

export { CircleNameHeader }