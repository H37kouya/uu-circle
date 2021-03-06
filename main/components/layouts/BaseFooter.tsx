import { useMediaQuery } from '@/hooks/useMediaQuery'
import { useWindowResize } from '@/hooks/useWindowResize'
import { __ } from '@/lang/ja'
import { CircleTagModel } from '@/lib/enum/api/CircleTagModel'
import { CircleType } from '@/lib/enum/api/CircleType'
import { TagSlugProperty } from '@/lib/enum/api/TagSlugProperty'
import { Category } from '@/lib/enum/app/Category'
import { ImagePath } from '@/lib/enum/app/ImagePath'
import Image from 'next/image'
import Link from 'next/link'
import { FC, Fragment, useEffect, useState } from 'react'
import { WP_REST_API_Post, WP_REST_API_Posts } from 'wp-types'
import { BaseContainer } from '../molecules/Container/BaseContainer'

type TagItem = {
  text: string
  href: string
  as?: string
}
const tagAlwaysItems: TagItem[] = [
  {
    text: __(CircleTagModel.SPORT),
    href: '/circle/tag/[tag]',
    as: `/circle/tag/${TagSlugProperty.sport}`,
  },
  {
    text: __(CircleTagModel.MUSIC),
    href: '/circle/tag/[tag]',
    as: `/circle/tag/${TagSlugProperty.music}`,
  },
  {
    text: __(CircleTagModel.CULTURE),
    href: '/circle/tag/[tag]',
    as: `/circle/tag/${TagSlugProperty.culture}`,
  },
  {
    text: __(CircleTagModel.VOLUNTEER),
    href: '/circle/tag/[tag]',
    as: `/circle/tag/${TagSlugProperty.volunteer}`,
  },
  {
    text: __(CircleTagModel.PROGRAMMING),
    href: '/circle/tag/[tag]',
    as: `/circle/tag/${TagSlugProperty.programming}`,
  },
  {
    text: __(CircleTagModel.NATURE),
    href: '/circle/tag/[tag]',
    as: `/circle/tag/${TagSlugProperty.nature}`,
  },
  {
    text: __(CircleTagModel.INTERNATIONAL),
    href: '/circle/tag/[tag]',
    as: `/circle/tag/${TagSlugProperty.international}`,
  },
]
const tagOtherItems: TagItem[] = [
  {
    text: __(CircleTagModel.INCARE),
    href: '/circle/tag/[tag]',
    as: `/circle/tag/${TagSlugProperty.incare}`,
  },
  {
    text: __(CircleTagModel.LOOSE),
    href: '/circle/tag/[tag]',
    as: `/circle/tag/${TagSlugProperty.loose}`,
  },
  {
    text: __(CircleTagModel.COMMUNITY),
    href: '/circle/tag/[tag]',
    as: `/circle/tag/${TagSlugProperty.community}`,
  },
  {
    text: __(CircleTagModel.URGENT_RECRUITMENT),
    href: '/circle/tag/[tag]',
    as: `/circle/tag/${TagSlugProperty.urgent_recruitment}`,
  },
  {
    text: __(CircleTagModel.MYSTERY),
    href: '/circle/tag/[tag]',
    as: `/circle/tag/${TagSlugProperty.mystery}`,
  },
  {
    text: __(CircleTagModel.MAMMOTH),
    href: '/circle/tag/[tag]',
    as: `/circle/tag/${TagSlugProperty.mammoth}`,
  },
  {
    text: __(CircleTagModel.ACTIVE_ACTIVITY),
    href: '/circle/tag/[tag]',
    as: `/circle/tag/${TagSlugProperty.active_activity}`,
  },
  {
    text: __(CircleTagModel.ONLY_MONDAY),
    href: '/circle/tag/[tag]',
    as: `/circle/tag/${TagSlugProperty.only_monday}`,
  },
  {
    text: __(CircleTagModel.ONLY_TUESDAY),
    href: '/circle/tag/[tag]',
    as: `/circle/tag/${TagSlugProperty.only_tuesday}`,
  },
  {
    text: __(CircleTagModel.ONLY_WEDNESDAY),
    href: '/circle/tag/[tag]',
    as: `/circle/tag/${TagSlugProperty.only_wednesday}`,
  },
  {
    text: __(CircleTagModel.ONLY_THURSDAY),
    href: '/circle/tag/[tag]',
    as: `/circle/tag/${TagSlugProperty.only_thursday}`,
  },
  {
    text: __(CircleTagModel.ONLY_FRIDAY),
    href: '/circle/tag/[tag]',
    as: `/circle/tag/${TagSlugProperty.only_friday}`,
  },
  {
    text: __(CircleTagModel.HOLIDAY),
    href: '/circle/tag/[tag]',
    as: `/circle/tag/${TagSlugProperty.holiday}`,
  },
  {
    text: __(CircleTagModel.MINE),
    href: '/circle/tag/[tag]',
    as: `/circle/tag/${TagSlugProperty.mine}`,
  },
  {
    text: __(CircleTagModel.YOTO),
    href: '/circle/tag/[tag]',
    as: `/circle/tag/${TagSlugProperty.yoto}`,
  },
]

type TagItemFcProps = {
  tagItem: TagItem
}
const TagItemFc: FC<TagItemFcProps> = ({ tagItem }) => {
  return (
    <li className="mb-3">
      <Link href={tagItem.href} as={tagItem.as}>
        <a className="text-gray-400 font-bold text-sm tag-title">
          {tagItem.text}
        </a>
      </Link>
    </li>
  )
}

type Props = {
  uuYellArticles?: WP_REST_API_Posts
}
const BaseFooter: FC<Props> = ({ uuYellArticles }) => {
  const [isTagOpen, setIsTagOpen] = useState(false)
  const { width } = useWindowResize()
  const { isMd } = useMediaQuery()

  useEffect(() => {
    if (isMd) {
      setIsTagOpen(true)
    }
  })

  return (
    <div className="bg-gray-100">
      {width ? (
        <div className="md:px-6 md:mb-10 text-center">
          <a href="https://media.uu-circles.com/">
            <Image
              src={ImagePath.UU_YELL.POSTER}
              width={width > 700 ? 700 : width}
              height={width > 700 ? (700 * 218) / 375 : (width * 218) / 375}
            />
          </a>
        </div>
      ) : (
        ''
      )}

      <div className="mb-10">
        <BaseContainer>
          {uuYellArticles && uuYellArticles.length > 0 ? (
            <div className="px-6 pt-12 md:pt-16 mb-10">
              <h2 className="text-lg mb-6">uu-yellの最新記事</h2>

              <ul className="list-outside list-decimal text-gray-400 pl-4">
                {uuYellArticles.map((uuYellArticle: WP_REST_API_Post, idx) => {
                  return (
                    <li key={`uuYellArticle-${idx}`} className="mb-3">
                      <a
                        href={uuYellArticle.link}
                        className="text-gray-400 font-bold text-sm"
                      >
                        {uuYellArticle.title.rendered}
                      </a>
                    </li>
                  )
                })}
              </ul>
            </div>
          ) : (
            ''
          )}

          <hr className="border border-gray-200" />
        </BaseContainer>
      </div>

      <div className="px-6">
        <BaseContainer>
          <div className="flex">
            <div className="pt-6 w-1/2 md:w-3/4">
              <h2 id="footer_tag_list" className="text-lg mb-6">
                全てのタグ
              </h2>

              <ul className="grid grid-cols-1 md:grid-cols-3">
                {tagAlwaysItems.map((_tagItem, idx) => (
                  <TagItemFc key={_tagItem.text + idx} tagItem={_tagItem} />
                ))}
                {isTagOpen ? (
                  <Fragment>
                    {tagOtherItems.map((_tagItem, idx) => (
                      <TagItemFc key={_tagItem.text + idx} tagItem={_tagItem} />
                    ))}
                  </Fragment>
                ) : (
                  <p>
                    <a
                      onClick={() => setIsTagOpen(true)}
                      className="underline text-gray-400 text-xs"
                    >
                      全てのタグ
                    </a>
                  </p>
                )}
              </ul>
            </div>

            <div className="pt-6 w-1/2 md:w-1/4">
              <h2 className="text-lg mb-6">カテゴリー</h2>

              <ul>
                <li className="mb-3">
                  <Link
                    href="/circle/category/[category]"
                    as={`/circle/category/${Category.club}`}
                  >
                    <a className="text-gray-400 font-bold text-sm">部活</a>
                  </Link>
                </li>
                <li className="mb-3">
                  <Link
                    href="/circle/category/[category]"
                    as={`/circle/category/${Category.officialOrganization}`}
                  >
                    <a className="text-gray-400 font-bold text-sm">
                      {__(CircleType.OFFICIAL_ORGANIZATION)}
                    </a>
                  </Link>
                </li>
                <li className="mb-3">
                  <Link
                    href="/circle/category/[category]"
                    as={`/circle/category/${Category.studentGroup}`}
                  >
                    <a className="text-gray-400 font-bold text-sm">
                      {__(CircleType.STUDENT_GROUP)}
                    </a>
                  </Link>
                </li>
                <li className="mb-3">
                  <Link
                    href="/circle/category/[category]"
                    as={`/circle/category/${Category.unofficialOrganization}`}
                  >
                    <a className="text-gray-400 font-bold text-sm">
                      {__(CircleType.UNOFFICIAL_ORGANIZATION)}
                    </a>
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </BaseContainer>

        <BaseContainer>
          <div>
            <div className="flex flex-col-reverse md:flex-row">
              <div className="pt-20 md:w-1/2">
                <h2 className="text-lg mb-6">メニュー</h2>

                <ul>
                  <li className="mb-3">
                    <Link href="/circle">
                      <a className="text-gray-400 font-bold text-sm">
                        サークルを見つける
                      </a>
                    </Link>
                  </li>
                  <li className="mb-3">
                    <Link href="/circle/newjoy">
                      <a className="text-gray-400 font-bold text-sm">
                        今日の新歓
                      </a>
                    </Link>
                  </li>
                  <li className="mb-3">
                    <Link href="/gacha">
                      <a className="text-gray-400 font-bold text-sm">
                        サークルガチャ
                      </a>
                    </Link>
                  </li>
                  <li className="mb-3">
                    <Link href="/statistics">
                      <a className="text-gray-400 font-bold text-sm">
                        統計情報
                      </a>
                    </Link>
                  </li>
                  <li className="mb-3">
                    <a
                      href="https://forms.gle/1oULcDjiPaknvfvc8"
                      target="_blank"
                      rel="noreferrer"
                      className="text-gray-400 font-bold text-sm"
                    >
                      お問い合わせ
                    </a>
                  </li>
                </ul>
              </div>

              <div className="pt-20 md:w-1/2">
                <h2 className="text-lg mb-6">デモ画面</h2>

                <ul>
                  <li className="mb-3">
                    <Link href="/demo">
                      <a className="text-gray-400 font-bold text-sm">
                        メイン画面 (デモ)
                      </a>
                    </Link>
                  </li>
                  <li className="mb-3">
                    <Link href="/circle/newjoy/demo">
                      <a className="text-gray-400 font-bold text-sm">
                        今日の新歓 (デモ)
                      </a>
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </BaseContainer>

        <div className="pt-8 text-center">
          <BaseContainer>
            <hr className="border border-gray-200" />
            <div className="py-8">
              <Link href="/guide/management-team">
                <a className="text-gray-400 px-2 text-xs">UU-Circlesについて</a>
              </Link>

              <Link href="/terms">
                <a className="text-gray-400 px-2 text-xs">利用規約</a>
              </Link>

              <Link href="/privacy">
                <a className="text-gray-400 px-2 text-xs">
                  プライバシーポリシー
                </a>
              </Link>
            </div>
          </BaseContainer>
        </div>

        <div className="text-center pb-8">
          <a href="https://ulab-uu.com/">
            <Image
              src={ImagePath.U_LAB.COPY_LIGHT}
              width={160}
              height={40}
              alt="U-lab CopyLight"
            />
          </a>
        </div>
      </div>
    </div>
  )
}

export { BaseFooter }
