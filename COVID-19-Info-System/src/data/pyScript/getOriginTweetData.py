# -*- coding:utf-8 -*-
"""
@ Project name: CollectiveRational
@ File name:getOriginTweetData.py
@ Description: 
@ Author: Daisy
@ E-mail: daisy_jf@csu.edu.cn
@ Time of Creation： 2020/10/4 12:15
"""
import pandas as pd
import requests
from lxml import etree
import os


def get_html():
    cookie= "_ga=GA1.2.1490067271.1595062060;" \
            "WT_FPC=id=4859e044-fee3-4192-b1f4-a18758522875:lv=1595198459214:ss=1595198426642; " \
            "has_js=1; " \
            "__atssc=google%3B1; _gid=GA1.2.1769651345.1601949253;" \
            " SimpleSAMLSessionID=b962e6ace8b529c2e6040114d949fd5e; " \
            "SimpleSAMLAuthToken=_78f6f42eddfebd410cea4356d5082358ff76f0ead5;" \
            " SESSf80f5dcc65a99d0290714d0bd9d60a3a=fSqTJlwzAJzFnpo25UUMwv4dH6APMBY3Hy7gWBGcjXQ; " \
            "SSESSf80f5dcc65a99d0290714d0bd9d60a3a=EpIY7pD8A4xUYHM71s7tOk7EDy-NWO4HhDoF_rj9WMA; " \
            "_gat=1; __atuvc=1%7C37%2C0%7C38%2C0%7C39%2C0%7C40%2C29%7C41; " \
            "__atuvs=5f7bce44da38a37800c"
    cookies = {}
    for line in cookie.split(';'):
        key,value = line.split("=",1)
        cookies[key] = value
    headers = {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/84.0.4147.105 Safari/537.36"
    }
    url = "http://dx.doi.org/10.21227/fpsb-jz61"
    html = requests.get(url,headers=headers,cookies=cookies).text
    return html


def get_csv(html):
    et_html = etree.HTML(html)
    # 开始这样，后面我们每天获取时只需要取得最后一个即可
    # urls = et_html.xpath("//tbody/tr/td//a/@href[last()]")
    # filenames = et_html.xpath("//tbody/tr/td//a[last()]/text()")
    urls = et_html.xpath("//tbody/tr/td//a/@href")
    filenames = et_html.xpath("//tbody/tr/td//a/text()")
    folder = "origin_tweet_data"
    for each,filename in zip(urls,filenames):
        url = each.rsplit("&",1)[0]
        data = pd.read_csv(url, index_col=0, parse_dates=[0])
        if not os.path.exists(folder):
            os.mkdir(folder)
        data.to_csv(folder+"\\"+filename)


if __name__=="__main__":
    html = get_html()
    get_csv(html)
