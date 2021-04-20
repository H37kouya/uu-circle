import discord
from discord.ext import tasks, commands
import settings
from datetime import datetime, timedelta, timezone
import requests
import json
import io
from create_text import get_now, to_jst, is_time_overlap
from domain import todayCircleNewJoy as domain

###SET_ENVIRONMENT_VALUES###
TOKEN = settings.TOKEN
CHANNEL_ID = int(settings.CHANNEL_ID)
API_URL = settings.API_URL
# TEST_API_URL = settings.TEST_API_URL

###TEST_CHANNEL_ID###
# CHANNEL_ID = int(settings.TEST_CHANNEL_ID)

###GET_API_INFORMATION###
payload = {'key': 'value'}
r = requests.get(API_URL, params=payload).json()

##TEST_API_INFORMATION###
# r = requests.get(TEST_API_URL, params=payload).json()

###MAKE_BOT###
# 接続に必要なオブジェクトを生成
client = discord.Client()

###MAKE_todayCircleNewJoys_Objects###
todayCircleNewJoys = list(
    map(lambda newjoy: domain.TodayCircleNewJoy(newjoy), r['todayCircleNewJoys']))

###SORT_LIST###
time_arr = []
time_arr = sorted(todayCircleNewJoys, key=lambda x: x.circleNewJoy.startDate)
###could check it's sorted###
print(list(map(lambda x: x.circleNewJoy.startDate, time_arr)))

###MAKE_TIME_DICT###
time_dict = {}
# key = hour * 60 + min
# start_hour * 60(min), end_hour * 60(min), interval = 30(min)
for dict_key in range(7 * 60, 32 * 60, 30):
    time_dict[dict_key] = []

for newjoy in todayCircleNewJoys:
    occupancyStartTime = newjoy.circleNewJoy.occupancyStartTime()
    occupancyEndTime = newjoy.circleNewJoy.occupancyEndTime()
    print(occupancyStartTime, occupancyEndTime)
    duration = abs(occupancyStartTime - occupancyEndTime)
    print(duration.seconds)
    room_count = duration.seconds / (30 * 60)
    print(room_count)
    for dict_key in range(0, int(room_count)):
        time_dict_key = dict_key * 30 + \
            occupancyStartTime.hour * 60 + occupancyStartTime.minute
        time_dict[time_dict_key].append(newjoy.circleNewJoy)

print(time_dict)

newjoy_rooms = {
    1: {
        'name': '新歓ルーム1',
        'todayCircleNewJoys': None,
    },
    2: {
        'name': '新歓ルーム2',
        'todayCircleNewJoys': None,
    },
    3: {
        'name': '新歓ルーム3',
        'todayCircleNewJoys': None,
    },
    4: {
        'name': '新歓ルーム4',
        'todayCircleNewJoys': None,
    },
    5: {
        'name': '新歓ルーム5',
        'todayCircleNewJoys': None,
    },
    6: {
        'name': '新歓ルーム6',
        'todayCircleNewJoys': None,
    },
    7: {
        'name': '新歓ルーム7',
        'todayCircleNewJoys': None,
    },
    8: {
        'name': '新歓ルーム8',
        'todayCircleNewJoys': None,
    },
    9: {
        'name': '新歓ルーム9',
        'todayCircleNewJoys': None,
    },
    10: {
        'name': '新歓ルーム10',
        'todayCircleNewJoys': None,
    },
}
print(newjoy_rooms)
newjoy_results = []

for td in time_dict:
    print(time_dict[td])

    # 新歓がないとき
    if len(time_dict[td]) == 0:
        for room in newjoy_rooms:
            # 新歓ルーム記録用配列に入れる
            if newjoy_rooms[room]['todayCircleNewJoys'] != None:
                newjoy_results.append(newjoy_rooms[room])

            # 新歓ルームを空にする
            newjoy_rooms[room]['todayCircleNewJoys'] = None
            continue

        continue

    # 今新歓ルーム配列に割り当てられている新歓がValue内にあるかを確認する。
    # [ある場合] そのまま新歓ルーム配列に値を入れたまま。
    # [ない場合] 新歓ルーム配列から値を削除し、新歓ルーム記録用配列に値を挿入する
    for room in newjoy_rooms:
        if newjoy_rooms[room]['todayCircleNewJoys'] != None:

            done = True
            for td_arr in time_dict[td]:
                if time_dict[td][td_arr].circleNewJoyId == newjoy_rooms[room]['todayCircleNewJoys'].circleNewJoyId:
                    done = False
                    break

            if done:
                # 新歓ルーム記録用配列に入れる
                newjoy_results.append(newjoy_rooms[room])
                # 新歓ルームを空にする
                newjoy_rooms[room]['todayCircleNewJoys'] = None

    # 新歓があるとき
    for td_arr in time_dict[td]:

        doing = False
        for room in newjoy_rooms:
            # 前の時間帯に新歓を行なったかどうか
            if time_dict[td][td_arr].circleNewJoyId == newjoy_rooms[room]['todayCircleNewJoys'].circleNewJoyId:
                doing = True
                break

        # 空いている新歓ルームへの割り当て
        if doing == False:
            for room in newjoy_rooms:
                if newjoy_rooms[room]['todayCircleNewJoys'] == None:
                    newjoy_rooms[room]['todayCircleNewJoys'] = time_dict[td]
                    break

    print(newjoy_rooms)

print(newjoy_results)

# ###SET_LOOP###
# # ループ処理
# @client.event
# async def on_ready():
#     channel = client.get_channel(CHANNEL_ID)
#     # アナウンス
#     if (len(r['todayCircleNewJoys']) == 0):
#         await channel.send('***:crescent_moon:今日の新歓はありません***')
#         exit()
#     else:
#         now = get_now()
#         await channel.send('***☀️今日の新歓 '+now+'***')
#         for idx, newjoy in enumerate(time_arr):
#             message = newjoy.make_text(idx)
#             await channel.send(message)
#         exit()

# client.run(TOKEN)

###TEST_CODES###

# room_arr = []
# room_resist_arr = []

# time_arr = []
# todayCircleNewJoys = list(map(lambda newjoy: domain.TodayCircleNewJoy(newjoy), r['todayCircleNewJoys']))
# time_arr = sorted(todayCircleNewJoys, key=lambda x:x.circleNewJoy.startDate)

# ###could check it's sorted###
# print(list(map(lambda x: x.circleNewJoy.startDate, time_arr)))

# for n, i in enumerate(time_arr):
#     i.idx =n
#     print(i.idx,i.name, i.circleNewJoy.format_startDay())
