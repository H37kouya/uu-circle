import { FC } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import SwiperCore, { Navigation, Pagination, Scrollbar, A11y } from 'swiper'
import { Swiper, SwiperSlide } from 'swiper/react'
import { useMediaQuery } from '@/hooks/useMediaQuery'

SwiperCore.use([Navigation, Pagination, Scrollbar, A11y])
type Props = {}
const MainUucircleTopButtons: FC<Props> = () => {
  const { isMd } = useMediaQuery()
  const params: Swiper = {
    //Swiperの設定

    initialSlide: 1,
    spaceBetween: 50,
    slidesPerView: 1,
    centeredSlides: true,
    // autoplay: {
    //   delay: 4000,
    //   disableOnInteraction: false,
    // },
    // loop: true,
    navigation: true,
  }
  return (
    <div className="flex justify-center pt-10 pb-10 bg-gray-100">
      {isMd ? (
        <nav style={{ margin: 'auto!important' }}>
          <button
            className="mx-3 my-3"
            style={{
              // backgroundColor: '#faf6e3',
              width: '280px',
              height: '65px',
            }}
          >
            <Link href="/">
              <a
                className="text-gray-900 text-2xl"
                style={
                  {
                    // borderBottom: '3px solid #66c7eb',
                  }
                }
              >
                <Image
                  width="286"
                  height="65"
                  src="/images/topButtons/Rectangle15.png"
                />
              </a>
            </Link>
          </button>

          <button
            className="mx-3 my-3"
            style={{
              // backgroundColor: '#faf6e3',
              width: '280px',
              height: '65px',
            }}
          >
            <Link href="/circle/newjoy">
              <a
                className="text-gray-900 text-2xl"
                style={
                  {
                    // borderBottom: '3px solid #66c7eb',
                  }
                }
              >
                <Image
                  width="286"
                  height="65"
                  src="/images/topButtons/shinkan1.png"
                />
              </a>
            </Link>
          </button>

          <button
            className="mx-3 my-3"
            style={{
              // backgroundColor: '#faf6e3',
              width: '280px',
              height: '65px',
            }}
          >
            <Link href="/guide/discord">
              <a
                className="text-gray-900 text-2xl"
                style={
                  {
                    // borderBottom: '3px solid #66c7eb',
                  }
                }
              >
                <Image
                  width="286"
                  height="65"
                  src="/images/topButtons/discordBunner1.png"
                />
              </a>
            </Link>
          </button>
        </nav>
      ) : (
        <Swiper {...params}>
          <nav className="mx-3" style={{ margin: 'auto!important' }}>
            <SwiperSlide className="text-center">
              <button
                style={{
                  // backgroundColor: '#faf6e3',
                  width: '280px',
                  height: '65px',
                }}
              >
                <Link href="/">
                  <a
                    className="text-gray-900 text-2xl"
                    style={
                      {
                        // borderBottom: '3px solid #66c7eb',
                      }
                    }
                  >
                    <Image
                      width="286"
                      height="65"
                      src="/images/topButtons/Rectangle15.png"
                    />
                  </a>
                </Link>
              </button>
            </SwiperSlide>
            <SwiperSlide className="text-center">
              <button
                style={{
                  // backgroundColor: '#faf6e3',
                  width: '280px',
                  height: '65px',
                }}
              >
                <Link href="/">
                  <a
                    className="text-gray-900 text-2xl"
                    style={
                      {
                        // borderBottom: '3px solid #66c7eb',
                      }
                    }
                  >
                    <Image
                      width="286"
                      height="65"
                      src="/images/topButtons/shinkan1.png"
                    />
                  </a>
                </Link>
              </button>
            </SwiperSlide>
            <SwiperSlide className="text-center">
              <button
                style={{
                  // backgroundColor: '#faf6e3',
                  width: '280px',
                  height: '65px',
                }}
              >
                <Link href="/guide/discode">
                  <a
                    className="text-gray-900 text-2xl"
                    style={
                      {
                        // borderBottom: '3px solid #66c7eb',
                      }
                    }
                  >
                    <Image
                      width="286"
                      height="65"
                      src="/images/topButtons/discordBunner1.png"
                    />
                  </a>
                </Link>
              </button>
            </SwiperSlide>
          </nav>
        </Swiper>
      )}
    </div>
  )
}

export { MainUucircleTopButtons }
