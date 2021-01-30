import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { FC } from 'react';
import Image from 'next/image'
import { faCheckCircle, faTimesCircle, faEdit } from '@fortawesome/free-solid-svg-icons';
import { User } from '@/infra/api/types';
import Link from 'next/link';

type Props = {
    user: User
}
const CircleUserListItem: FC<Props> = ({ user }) => {
    return (
        <div className="text-white flex">
        <div>
            <Image
                src={`/images/no-image.png`}
                width="100"
                height="100"
                layout={"fixed"}
                objectFit={"contain"}
                className="square-image"
            />
        </div>

        <div className="ml-2 w-full">
            <h2 className="font-bold text-lg text-gray-300 mb-2">{ user.displayName }</h2>

            <div className="flex flex-wrap w-full">
                <div className="w-full lg:w-1/6 pr-2">
                    <p className="text-center py-1 mb-2 bg-gray-800 text-gray-300 font-bold text-sm">ユーザー名</p>
                    <div className="flex justify-center h-7 items-center">
                        {user.username}
                    </div>
                </div>
                <div className="w-full lg:w-1/6 pr-2">
                    <p className="text-center py-1 mb-2 bg-gray-800 text-gray-300 font-bold text-sm">有効なアカウント</p>
                    <div className="flex justify-center h-7 items-center">
                        <FontAwesomeIcon
                            size="lg"
                            color={user.active ? 'green' : 'red' }
                            icon={user.active ? faCheckCircle : faTimesCircle}
                        />
                    </div>
                </div>
                <div className="w-full lg:w-1/6 pr-2">
                    <p className="text-center py-1 mb-2 bg-gray-800 text-gray-300 font-bold text-sm">認証済みか</p>
                    <div className="flex justify-center h-7 items-center">
                        <FontAwesomeIcon
                            size="lg"
                            color={user.emailVerifiedAt ? 'green' : 'red' }
                            icon={user.emailVerifiedAt ? faCheckCircle : faTimesCircle}
                        />
                    </div>
                </div>
                <div className="w-full lg:w-1/6">
                    <p className="text-center py-1 mb-2 bg-gray-800 text-gray-300 font-bold text-sm">編集する</p>
                    <div className="flex justify-center h-7 items-center">
                        {/* <Link href="/circle/edit/[id]" as={`/circle/edit/${user.id}`} >
                            <a> */}
                                <FontAwesomeIcon
                                    size="lg"
                                    color="orange"
                                    icon={ faEdit }
                                />
                            {/* </a>
                        </Link> */}
                    </div>
                </div>
            </div>
        </div>
    </div>
    )
}

export { CircleUserListItem }