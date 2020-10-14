# -*- coding:utf-8 -*-
"""
@ File name: get_retweet
@ Description: 获取retweet的数目
@ Time of Creation： 2020-07-21
"""

import pandas as pd
import tweepy
import time

consumer_key = "IGMYSPiWpx0qLEjhYDrJqRuYp"
consumer_secret = "e5ypjtz2Xn49VsjPulIhrVEUduC0id1roNvzoqGfpy6CCRhBgs"
access_token = "1140054025791926272-sxzwfB5oCl8EBEPdhgewfuNP1oCemG"
access_token_secret = "0tIMUBEeurg9Qmd6e076SLoSbMK7opLaWaorkhpqa4Tn1"

auth = tweepy.OAuthHandler(consumer_key, consumer_secret)
auth.set_access_token(access_token, access_token_secret)

api = tweepy.API(auth)


def get_retweet_count(_id: str):
    try:
        status = api.get_status(int(_id))
    except tweepy.RateLimitError:
        # print("sleep...")
        time.sleep(15 * 60)
        return None
    except tweepy.error.TweepError:
        # print("   being protected. Fail to fetch.")
        return "unknown"
    return str(status.retweet_count)


def start(path):

    df = pd.read_csv(path+'\\'+'all_result.csv', dtype=object)
    ids = df["id"].tolist()
    list_retweet_count = []
    ids_len = len(ids)
    count = 0
    df["retweet_count"] = ''
    # df.to_csv(r"all_result.csv", index=False)
    for tweet_id in ids:
        # print("start to get retweet count of " + tweet_id
        #       + "  " + str(count) + "/" + str(ids_len))
        retweet_count = get_retweet_count(tweet_id)
        if retweet_count is None:
            retweet_count = get_retweet_count(tweet_id)
        df.loc[count, 'retweet_count'] = retweet_count
        df.to_csv(path+'\\'+'tweetData_result.csv', encoding='utf-8')
        # print(retweet_count)
        # print(tweet_id)
        # print(df.loc[count, 'id'])

        list_retweet_count.append(retweet_count)
        count += 1

    df["retweet_count"] = list_retweet_count
    df.to_csv(path+'\\'+'tweetData_result.csv', index=False)
    return path+'\\'+'tweetData.csv'


