# -*- coding:utf-8 -*-
"""
@ Project name: CollectiveRational
@ File name:get_formatted_epidemicData.py
@ Description: 
@ Author: Daisy
@ E-mail: daisy_jf@csu.edu.cn
@ Time of Creation： 2020/9/24 20:25
"""

import pandas as pd
import os
import sys


def read_data(path,title):
    df = pd.read_csv(path)
    s = handleData(df,title)
    return s


def handleData(df,title):
    df = df.set_index(["Province/State","Country/Region","Lat","Long"])
    s = df.stack()
    s = s.reset_index()
    s = s.rename(columns={"level_4":"time",0:title})
    return s


def hebing_data(path,confirmed,death,recovered):
    death1= death['death']
    confirmed['death'] = death1
    confirmed['recovered'] = recovered['recovered']

    time = confirmed['time'].str.split('/')
    for i in range(len(time)):
        temp = time[i][1]
        if(len(temp)==1):
            temp="0"+temp
        time[i][1] = temp
        temp = time[i][0]
        if(len(temp)==1):
            temp = "0"+temp
        time[i][0] = temp
    time = time.apply(lambda x: str(x[2])+'20-' + str(x[0])[-2:]+'-'+str(x[1]))
    # time = str(time[2])+'-'+str(time[0])+"-"+str(time[1])
    confirmed['time'] = time
    confirmed['Country/Region'] = confirmed['Country/Region'].apply(lambda x:str(x).replace(","," "))
    confirmed['Province/State'] = confirmed['Province/State'].apply(lambda x: str(x).replace(",", " "))
    uniformed_data = path+"\\uniformed.csv"

    if not os.path.exists(path):
        os.makedirs(path)
    else:
        if os.path.exists(uniformed_data):
            os.remove(uniformed_data)
    confirmed.to_csv(uniformed_data, index=False, header=None)
    df = confirmed.sort_values("time",ascending=False)[0:253]
    df.to_csv(path+"\\lastedDayDate.csv",index=False,header = None)
    returnedFileName = path+"\\lastedDayDate.csv"
    print(returnedFileName)
    # confirmed.to_csv(uniformed_data,index=False,header=None)


def handleCanada(origin_data_path):
    # 原recovered数据
    recovered = pd.read_csv(origin_data_path+"\\recovered.csv")
    # 原recovered数据中的加拿大的数据
    recovered_canada = recovered.loc[recovered['Country/Region']=="Canada"]
    # 原recovered数据中的加拿大的数据中的前四个，目的是替换death和confirmed数据中合并加拿大地区后的经纬度
    recovered_canada_4 = recovered_canada.iloc[0:,:4]

    # 原死亡病例数
    death = pd.read_csv(origin_data_path+"\\death.csv")
    handled_death = getUniformData(death,recovered_canada_4)
    confirmed = pd.read_csv(origin_data_path+"\\confirmed.csv")
    handled_confirmed = getUniformData(confirmed,recovered_canada_4)
    path = sys.argv[2]
    if not os.path.exists(path):
        os.makedirs(path)

    saveData(path, handled_death, "death")
    saveData(path, recovered, "recovered")
    saveData(path,handled_confirmed,"confirmed")
    return path


def saveData(path,df,name):
    file = path + "\\"+name+".csv"
    if os.path.exists(file):
        os.remove(file)
    df.to_csv(file,index=False)


def getUniformData(df,recovered_canada_4):
    canada = df.loc[df['Country/Region'] == "Canada"]

    temp = canada.iloc[0:, 4:]
    temp2 = temp[:].apply(lambda x: x.sum()).to_frame()
    part2 = temp2.T

    result = recovered_canada_4.append(part2, ignore_index=True)

    result.iloc[0, 4:] = result.iloc[1, 4:]
    result.drop(result.index[1:], inplace=True)

    df.iloc[39:40, :] = result.iloc[0:1, :].values

    df.drop(df.index[40:53], inplace=True)

    return df


def get_latest_epidemic_data(name,save_name):
    url = "https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_time_series/"+name
    data = pd.read_csv(url, index_col=0, parse_dates=[0])
    data.to_csv(save_name)


def begin_download_epidemicData():
    origin_data_path = sys.argv[1]
    confirmed_path = origin_data_path + "\\confirmed.csv"
    death_path = origin_data_path + "\\death.csv"
    recovered_path = origin_data_path + "\\recovered.csv"
    if not os.path.exists(origin_data_path):
        os.makedirs(origin_data_path)
    else:
        if os.path.exists(confirmed_path):
            os.remove(confirmed_path)
        if os.path.exists(death_path):
            os.remove(death_path)
        if os.path.exists(recovered_path):
            os.remove(recovered_path)
    get_latest_epidemic_data("time_series_covid19_confirmed_global.csv", confirmed_path)
    get_latest_epidemic_data("time_series_covid19_deaths_global.csv", death_path)
    get_latest_epidemic_data("time_series_covid19_recovered_global.csv", recovered_path)

    return origin_data_path

if __name__ == "__main__":

    # 下载最新的疫情数据
    origin_data_path = begin_download_epidemicData()
    # 处理加拿大数据，并返回处理后的疫情数据的相对根目录
    path = handleCanada(origin_data_path)

    confirmed = read_data(path+'\\confirmed.csv','confirmed')
    death = read_data(path+'\\death.csv','death')
    recovered = read_data(path+'\\recovered.csv','recovered')
    hebing_data(path,confirmed,death,recovered)


