"""
@ File name: get_rationality
@ Description:计算理性度
@ Input:读取路径 输出路径
@ Output：对应计算结果
@ Time of Creation： 2020-07-24
"""

import pandas as pd
import numpy as np
import math
import datetime
import os
import sys


def Tconst(na, nb, c, va, vb):
    try:
        part1 = (na - nb) / (c * (2 - va - vb))
        part2 = math.log((nb * (na - nb + c)) / (c * na), math.e)
        part3 = 4 * ((nb - c) / (na - nb))
        Tct = part1 * (part2 + part3)
        if Tct == 0:
            # print("na" + str(na) + "nb" + str(nb) + "c" + str(c) + "va" + str(va) + "vb" + str(vb))
            # print(part1,part2,part3)
        return Tct
    except:
        # print("na" + str(na) + "nb" + str(nb) + "c" + str(c) + "va" + str(va) + "vb" + str(vb))
        return 0


def get_Country_within_Time(dayOne, dayTwo, start1, end2, COUNTRYf):
    # 第一时间段数据计算
    dayOne = dayOne[dayOne['country'] == COUNTRYf]
    true1 = len(dayOne[dayOne['nb_label'] == 1]) / len(dayOne)
    false1 = len(dayOne[dayOne['nb_label'] == 0]) / len(dayOne)

    # 第二时间段数据计算
    dayTwo = dayTwo[dayTwo['country'] == COUNTRYf]

    true2 = len(dayTwo[dayTwo['nb_label'] == 1]) / len(dayTwo)
    false2 = len(dayTwo[dayTwo['nb_label'] == 0]) / len(dayTwo)

    # 计算变化速率（如果数据不足即返回）
    try:
        vtrue = (true1 - true2) / true1
        vfalse = (false1 - false2) / false1
    except:
        # print(str(COUNTRYf) + ": Data deficiencies 1(divide zero)")
        return 0

    # 计算c
    retweet = dayOne[dayOne['retweet_count'] != 'unknown']
    total = 0
    for each in retweet['retweet_count']:
        total = total + int(each)
    c = total / len(retweet)
    # print(total)

    # 计算理性统计值
    # try:
    if true1 > false1:
        rationality = -Tconst(true1, false1, c, vtrue, vfalse)
    else:
        rationality = Tconst(false1, true1, c, vfalse, vtrue)
    # print(COUNTRYf + ":" + str(rationality))

    # if rationality == 0:
    #     print(COUNTRYf + "ERROR")

    return [COUNTRYf, rationality, true1, false1, true2, false2, c, vtrue, vfalse, start1, end2]


def get_time_period(dataset, daybegin, dayend):
    dataset['time'] = pd.to_datetime(dataset['time'])
    frames = dataset[dataset['time'] == pd.Timestamp(daybegin)]
    for i in range((dayend - daybegin).days + 1):
        day = daybegin + datetime.timedelta(days=i)

        if (day != datetime.date(2020, 3, 29)):
            if (day > daybegin and day < dayend):
                thisdaydata = dataset[dataset['time'] == pd.Timestamp(day)]
                frames = pd.concat([frames, thisdaydata])

    return frames


def get_country_lixing_list(dataset, start1, end1, start2, end2):
    test = ['India', 'United States', 'Canada', 'United Kingdom']
    data1 = get_time_period(dataset, start1, end1)
    data2 = get_time_period(dataset, start2, end2)
    rationality = ['country', 'rationality', 'true1', 'false1', 'true2', 'false2', 'c', 'vtrue', 'vfalse', 'start_time',
                   'end_time']
    for country in test:
        result = get_Country_within_Time(data1, data2, start1, end2, country)
        if result:
            rationality = np.vstack((rationality, result))

    return rationality


def get_rationality(*argv):
    dataset = pd.read_csv(argv[0], low_memory=False)

    begin = datetime.date(2020, 3, 20)
    end = datetime.date(2020, 10, 4)
    weekcounter = 0
    week1begin = datetime.date(2020, 1, 1)
    week1end = datetime.date(2020, 1, 1)
    week2begin = datetime.date(2020, 1, 1)
    week2end = datetime.date(2020, 1, 1)

    # outcome = pd.DataFrame()
    index = 0
    for i in range((end - begin).days + 1):
        day = begin + datetime.timedelta(days=i)
        if (day != datetime.date(2020, 3, 29)):
            weekcounter += 1
            if (weekcounter == 1):
                week1begin = day
            elif (weekcounter == 7):
                week1end = day
            elif (weekcounter == 8):
                week2begin = day
            elif (weekcounter == 14):
                week2end = day
                index += 1
                # 计算，存储
                dataf = pd.DataFrame(
                    get_country_lixing_list(dataset, week1begin, week1end, week2begin, week2end))
                dataname = str(index) + ".csv"
                dataf.to_csv(dataname, index=False, header=False)

                weekcounter = 7
                week1begin = week2begin
                week1end = week2end

    final = pd.read_csv(r'1.csv')
    os.remove("1.csv")
    for i in range(2, index + 1):
        location = str(i) + ".csv"
        datatemp = pd.read_csv(location)
        final = pd.concat([final, datatemp])
        os.remove(location)

    final.to_csv(argv[1], index=False)
    print(argv[1])


# inpath,outpath
# if __name__ == '__main__':
#   main(sys.argv)
