from datetime import datetime, timedelta, timezone
from create_text import to_jst, get_now, is_time_overlap


def formatDatetime(original: datetime) -> datetime:
    """
        日付のフォーマット (JST)
    """
    formatDatetime = datetime.strptime(original, '%Y-%m-%dT%H:%M:%S.%fZ')
    formatDatetime = formatDatetime.replace(microsecond=0)
    formatDatetimeToJst = to_jst(formatDatetime)
    print(formatDatetimeToJst)
    return formatDatetimeToJst


# 新歓
class CircleNewJoy:
    circleNewJoyId: int
    circleId: int
    title: str
    description: str
    url: str
    privateNewjoyLink: str
    release: bool
    placeOfActivity: str
    placeOfActivityDetail: str
    publishFrom: str
    startDate: str
    endDate: str
    createdAt: str
    updatedAt: str

###CONSTRUCTOR###
    def __init__(self, arr: dict):
        self.circleNewJoyId = arr['id']
        self.circleId = arr['circleId']
        self.title = arr['title']
        self.description = arr['description']
        self.url = arr['url']
        self.release = arr['release']
        self.placeOfActivity = arr['placeOfActivity']
        self.placeOfActivityDetail = arr['placeOfActivityDetail']
        self.publishFrom = arr['publishFrom']
        self.startDate = arr['startDate']
        self.endDate = arr['endDate']
        self.createdAt = arr['createdAt']
        self.updatedAt = arr['updatedAt']
        self.privateNewjoyLink = arr['privateNewjoyLink']

    def startDatetime(self) -> datetime:
        """
            新歓開始時間
            7:00 <= startDatetime < endDatetime <= 6:59
        """
        return formatDatetime(self.startDate)

    def endDatetime(self) -> datetime:
        """
            新歓終了時間
            7:00 <= startDatetime < endDatetime <= 6:59
        """

        if (self.endDate is None):
            tmp_day = self.startDatetime()
            tmp_format_endDay = tmp_day.now() + timedelta(days=1)
            format_endDay = tmp_format_endDay.replace(
                hour=6, minute=59, second=0, microsecond=0)
            return format_endDay

        return formatDatetime(self.endDate)

    def occupancyStartTime(self) -> datetime:
        """
            新歓ルーム占有開始時間

            時について
                新歓の開始日時の時と同じ。
            分について
                0 ≤ min < 30 のとき、分を00とする。
                30 ≤ min ≤ 0 のとき、分を30とする。
        """
        # 新歓開始時間
        startTime = self.startDatetime()

        # (変数) = (条件がTrueのときの値) if (条件) else (条件がFalseのときの値)
        minute = 0 if (startTime.minute < 30) else 30

        # 新歓ルーム占有開始時間
        occupancyStartTime = startTime.replace(
            minute=minute,
            second=0
        )
        return occupancyStartTime

    def occupancyEndTime(self) -> datetime:
        """
            新歓ルーム占有終了時間

            時について
                新歓の終了日時の時 (hour) + 1 (hour)

            分について
                0 ≤ min < 30 のとき、分 (min) を00とする。
                30 ≤ min < 0 のとき、分 (min) を30とする。
        """
        # 新歓終了時間
        endTime = self.endDatetime()

        # (変数) = (条件がTrueのときの値) if (条件) else (条件がFalseのときの値)
        minute = 0 if (endTime.minute < 30) else 30

        # 新歓ルーム占有終了時間
        occupancyEndTime = endTime.replace(
            hour=endTime.hour,
            minute=minute,
            second=0
        ) + timedelta(hours=1)
        return occupancyEndTime
