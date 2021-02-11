export interface Circle {
    type: 'Circle'
    id: number
    slug: string
    release: boolean
    circleType: string
    name: string
    nameKana: string
    shortName: string
    prefixName: string
    description: string
    intro: string
    commonPlaceOfActivity: string
    commonPlaceOfActivityDetail: string
    commonDateOfActivityMonday: boolean
    commonDateOfActivityTuesday: boolean
    commonDateOfActivityWednesday: boolean
    commonDateOfActivityThursday: boolean
    commonDateOfActivityFriday: boolean
    commonDateOfActivitySaturday: boolean
    commonDateOfActivitySunday: boolean
    commonDateOfActivityDetail: string
    isOnlineActivity: boolean
    onlinePlaceOfActivityDetail: string
    onlineDateOfActivityMonday: boolean
    onlineDateOfActivityTuesday: boolean
    onlineDateOfActivityWednesday: boolean
    onlineDateOfActivityThursday: boolean
    onlineDateOfActivityFriday: boolean
    onlineDateOfActivitySaturday: boolean
    onlineDateOfActivitySunday: boolean
    onlineDateOfActivityDetail: string
    admissionFeePerYear: number
    numberOfMembers: number
    isClubActivities: boolean
    appealingPoint1: string
    appealingPoint2: string
    appealingPoint3: string
    publicEmail: string
    twitterUrl: string
    facebookUrl: string
    instagramUrl: string
    lineUrl: string
    youtubeUrl: string
    homepageUrl: string
    peingUrl: string
    githubUrl: string
    tiktokUrl: string
    participationUrl: string
    mainImageUrl: string
    handbillImageUrl: string
    activityImageUrl1: string
    activityImageUrl2: string
    activityImageUrl3: string
    activityImageUrl4: string
    activityImageUrl5: string
    activityImageUrl6: string
    createdAt: string
    updatedAt: string
}

export const isCircle = (v: any): v is Circle => v && v.type === 'Circle'
export const newCircle = (circle: Circle): Circle => ({
    ...circle,
    type: 'Circle'
})