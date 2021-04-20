from datetime import datetime, timedelta, timezone

###TO_GET_JST_TIME_FUNC###
#SEE THIS(https://qiita.com/b2bmakers/items/34ba70510e35d2c12e94)
JST = timezone(timedelta(hours=+9), 'JST')
def to_jst(time):
    time = time.replace(tzinfo=timezone.utc)
    time = time.astimezone(JST)
    time = time.replace(tzinfo=None)
    return time

###GET_TIME###
def get_now():
    day = datetime.now(JST)
    now = day.strftime('%Y.%m.%d')
    return now

###JUDGE_SCHEDULE###
#schedule1(start1~end1)
#schedule2(start2~end2)
def is_time_overlap(time1, time2):
    return time1[0] <= time2[1] and time2[0] <= time1[1]


