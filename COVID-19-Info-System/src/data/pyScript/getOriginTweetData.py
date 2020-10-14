# -*- coding:utf-8 -*-
"""
@ Project name: CollectiveRational
@ File name:getOriginTweetData.py
@ Description: 
@ Author: Daisy
@ E-mail: daisy_jf@csu.edu.cn
@ Time of Creation： 2020/10/4 12:15
"""
from lxml import etree
import shutil

from twarc import Twarc
import pandas as pd
import os
import re
import requests
import test_Classifcation_Models
import get_retweet
import sys

month_map = {
    'january': '01',
    'february': '02',
    'march': '03',
    'april': '04',
    'may': '05',
    'june': '06',
    'july': '07',
    'august': '08',
    'september': '09',
    'october': '10',
    'november': '11',
    "december": '12'
}

# Initializing Twitter API keys
consumer_key = "IGMYSPiWpx0qLEjhYDrJqRuYp"
consumer_secret = "e5ypjtz2Xn49VsjPulIhrVEUduC0id1roNvzoqGfpy6CCRhBgs"
access_token = "1140054025791926272-sxzwfB5oCl8EBEPdhgewfuNP1oCemG"
access_token_secret = "0tIMUBEeurg9Qmd6e076SLoSbMK7opLaWaorkhpqa4Tn1"
t = Twarc(consumer_key, consumer_secret, access_token, access_token_secret)

# 这个是5个需要传进来的三个路径
# tweet_folder = sys.argv[1]
# last_week_folder = sys.argv[2]
# this_week_folder = sys.argv[3]
# news_path = sys.argv[4]
# result_path = sys.argv[5]
tweet_folder = "tweet_folder"
last_week_folder = "last_week_folder"
this_week_folder = "this_week_folder"
news_path = r"../COVID19下集体理性量化分析与思考/数据/recovery-news-data.csv"
result_path = "collective_rationalty"


# 用于判断是否存在存储tweet数据的文件夹,不存在则创建
def makedir():
    if not os.path.exists(tweet_folder):
        os.mkdir(tweet_folder)
    if not os.path.exists(last_week_folder):
        os.mkdir(last_week_folder)
    if not os.path.exists(this_week_folder):
        os.mkdir(this_week_folder)
    if not os.path.exists(result_path):
        os.mkdir(result_path)


def save_data(data, filename):
    isCalculated = judgeCal()
    test_Classifcation_Models.beigin(result_path, news_path)
    if isCalculated:
        # 转去计算
        read_origin_data(this_week_folder)
        print("地理位置、时间处理完毕，开始合并last_week and this_week")
        hebing_handled_data()
        print("开始训练,真假标签分类......")
        all_result_path = test_Classifcation_Models.beigin(result_path,news_path)
        print("分类完成,开始计算tweet的转发量......")
        result_to_calculate_collectiveRationality_path = get_retweet.start(result_path)
        print("计算完成，开始移动文件")
        movefiles(last_week_folder,tweet_folder)
        movefiles(this_week_folder,last_week_folder)
        return [True,result_to_calculate_collectiveRationality_path]
    else:
        print("直接保存结果")
        data.to_csv(this_week_folder + "\\" + filename)
        return [False,'no']


def hebing_handled_data():
    last_week = pd.read_csv(last_week_folder + "\\" + "tweetData_result.csv", encoding='utf-8')
    this_week = pd.read_csv(this_week_folder + "\\" + "tweetData_result.csv", header=None, encoding='utf-8')
    last_week.columns = ['id', 'text', "longitude", 'latitude', 'formatted_address', 'country', 'province', 'city',
                         'time']
    this_week.columns = ['id', 'text', "longitude", 'latitude', 'formatted_address', 'country', 'province', 'city',
                         'time']
    frames = [last_week, this_week]
    result = pd.concat(frames)
    result.to_csv("tweetData.csv", encoding='utf-8', index=None)


def movefiles(src, dst):
    filelist = os.listdir(src)
    for file in filelist:
        print(file)
        src_full = src + "\\" + file
        shutil.move(src_full, dst)


def judgeCal():
    # last_week_files = os.listdir(last_week_folder)
    this_week_files = os.listdir(this_week_folder)
    if len(this_week_files) == 7:
        return True
    else:
        return False


def get_html():
    # cookie需要更新
    cookie = "_ga=GA1.2.1490067271.1595062060; WT_FPC=id=4859e044-fee3-4192-b1f4-a18758522875:lv=1595198459214:ss=1595198426642; __atssc=google%3B1; has_js=1; _gid=GA1.2.308708896.1602506476; SimpleSAMLAuthToken=_7629563523f41116a62d0d3ffe7a12b413c95a1b30; SESSf80f5dcc65a99d0290714d0bd9d60a3a=rnLVvojYixOWZYOxsdcRR64SMthni-EyQ-3aC53vB0Y; SSESSf80f5dcc65a99d0290714d0bd9d60a3a=DZl0Xu7jNjsQMrJgS4ksnL0vG4bpa8NTY0g2XPUjq_4; SimpleSAMLSessionID=cff11ab94f6c5dc2bce8cb4dff36e19a; _gat=1; __atuvc=0%7C38%2C0%7C39%2C0%7C40%2C30%7C41%2C9%7C42; __atuvs=5f85a4557940896c000"
    cookies = {}
    for line in cookie.split(';'):
        key, value = line.split("=", 1)
        cookies[key] = value
    headers = {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/84.0.4147.105 Safari/537.36"
    }
    url = "http://dx.doi.org/10.21227/fpsb-jz61"
    html = requests.get(url, headers=headers, cookies=cookies).text
    return html


# 获取最新一天的数据
def get_csv():
    # 获取html
    html = get_html()
    et_html = etree.HTML(html)

    urls = et_html.xpath("//tbody/tr/td//a/@href")
    filenames = et_html.xpath("//tbody/tr/td//a/text()")

    lastDayUrl = urls[len(urls) - 1].rsplit("&", 1)[0]
    data = pd.read_csv(lastDayUrl, index_col=0, parse_dates=[0])
    lastDayFileName = filenames[len(filenames) - 1]
    flag = save_data(data, lastDayFileName)
    # data.to_csv(folder + "\\" + lastDayFileName)


def read_origin_data(path):
    files = os.listdir(path)
    for file in files:
        print(file)
        if not os.path.isdir(file):
            try:
                df = pd.read_csv(path + '\\' + file, header=None)[0]
                get_tweetData(df, path, file)
            except Exception as e:
                print(e)


# hydrating the tweet IDs
def get_tweetData(df, path, file):
    data = pd.DataFrame(
        columns=['id', 'text', "longitude", 'latitude', 'formatted_address', 'country', 'province', 'city', 'time'])
    time = get_date(file)
    for tweet in t.hydrate(df):
        text = tweet["full_text"]
        ids = tweet["id"]
        try:
            longitude, latitude = tweet["coordinates"]["coordinates"]
            formatted_address, country, province, city = get_location(longitude, latitude)
            usr = tweet["user"]
            data = data.append([{"id": ids, "text": text, "longitude": longitude, "latitude": latitude,
                                 'formatted_address': formatted_address,
                                 'country': country, 'province': province, 'city': city, 'time': time}])
        except Exception as e:
            print(str(e))
    try:
        data.to_csv(path + "\\" + "tweetData_result.csv", encoding='utf-8', index=None, header=None, mode='a+')
        print(file + '保存成功')
    except Exception as e:
        print(e)
        print(file + "保存失败")


# get formatted_address,country,province according to lon and lat.
def get_location(longitude, latitude):
    location = str(str(latitude) + ',' + str(longitude))
    # print(location)
    parameters = {'location': location, 'output': 'json', 'coordtype': 'gcj02ll',
                  'pois': '0', 'latest_admin': '1', 'ak': 'y68BLmjYT5uVVS7VBMgr81PQiTXAEydK', 'extensions_road': 'true'}
    base = 'http://api.map.baidu.com/reverse_geocoding/v3/'

    try:
        response = requests.get(base, parameters)
    except Exception as e:
        print(e)
        print(response.url + "获取失败")
        return 'null', 'null', 'null', 'null'

    answer = response.json()

    return answer['result']['formatted_address'], answer['result']['addressComponent']['country'], \
           answer['result']['addressComponent']['province'], answer['result']['addressComponent']['city']


def get_date(filename):
    if filename:
        temp = filename.split("_")[0]
    month_str = re.findall(r"\D+", temp)[0]
    month = month_map.get(month_str)
    day_str = re.findall(r"\d+", temp)[0]
    day = day_str
    if eval(day) < 10:
        day = "0" + day
    date = "2020-" + month + "-" + day
    print(date)
    return date


def inti_():
    data = pd.DataFrame(
        columns=['id', 'text', "longitude", 'latitude', 'formatted_address', 'country', 'province', 'city',
                 'time']).to_csv("tweetData_result.csv", encoding='utf-8', index=False)


if __name__ == "__main__":
    makedir()
    flag = get_csv()
    # flag为一个数组，若成功得到数据，则返回[True,path],path为前面计算结果的路径,用于下一步计算集体理性
    # 若失败，则返回[False,'no']
    print(flag)
