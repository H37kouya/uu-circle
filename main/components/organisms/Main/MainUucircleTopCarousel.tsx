import { FC } from 'react'
import Image from 'next/image'
import SwiperCore, {
  Autoplay,
  Navigation,
  Pagination,
  Scrollbar,
  A11y,
} from 'swiper'
import { Swiper, SwiperSlide } from 'swiper/react'
import { useMediaQuery } from '@/hooks/useMediaQuery'
import { useWindowResize } from '@/hooks/useWindowResize'
import { useEffect, useState } from 'react'

SwiperCore.use([Autoplay, Navigation, Pagination, Scrollbar, A11y])

const MainUucircleTopCarousel: FC = () => {
  const { isMd } = useMediaQuery()
  const { width } = useWindowResize()
  const [height, setHeight] = useState(0)

  useEffect(() => {
    setHeight(isMd ? 330 : (width * 4192) / 8001)
  }, [isMd, width])

  const params: Swiper = {
    //Swiperの設定
    initialSlide: 1,
    spaceBetween: 50,
    centeredSlides: true,
    autoplay: {
      delay: 4000,
      disableOnInteraction: false,
    },
    loop: true,
  }

  return (
    <div className="flex justify-center bg-gray-100">
      <Swiper {...params}>
        <nav>
          <SwiperSlide>
            <Image
              width={width || 1000}
              height={height}
              objectFit="cover"
              src="/images/topCarousel/Rectangle16.png"
            />
          </SwiperSlide>
          <SwiperSlide>
            <Image
              src="/images/top-image.png"
              width={width || 1000}
              height={height}
              objectFit="cover"
              alt="UU-circlesへようこそ！"
            />
          </SwiperSlide>
          <SwiperSlide>
            <Image
              width={width || 1000}
              height={height}
              objectFit="cover"
              src="/images/topCarousel/Rectangle16.png"
            />
          </SwiperSlide>
        </nav>
      </Swiper>
    </div>
  )
}

export { MainUucircleTopCarousel }