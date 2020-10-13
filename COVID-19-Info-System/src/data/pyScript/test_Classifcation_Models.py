#!/usr/bin/env python
# coding: utf-8
"""
@ File name: test_Classifcation_Model
@ Description:谣言检测模型
@ Time of Creation： 2020-07-20
"""
# In[ ]:


# importing required packages
import numpy as np
import pandas as pd
import nltk
#importing other required packages
from nltk.tokenize import word_tokenize
from nltk import pos_tag
from nltk.corpus import stopwords
from nltk.stem import WordNetLemmatizer
from sklearn.preprocessing import LabelEncoder
from collections import defaultdict
from nltk.corpus import wordnet as wn
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn import model_selection, naive_bayes, svm
from sklearn.metrics import accuracy_score
from sklearn.model_selection import train_test_split

nltk.download('punkt')
nltk.download('wordnet')
nltk.download('averaged_perceptron_tagger')
nltk.download('stopwords')


def beigin(path,newsPath):
    print(path)
    print(newsPath)
    print("我看看哈")
    # reading the dataset
    col_label = ['text', 'longitude', 'latitude']
    dataset = pd.read_csv(newsPath, encoding='latin-1')
    my_dataset = pd.read_csv(path+'\\'+'tweetData.csv')
    # header=None, names=col_label)
    result_dataset = pd.read_csv(path+'\\'+'tweetData.csv')
    # header=None, names=col_label)
    dataset.head(5)

    # setting the random seed for output reproducibility
    np.random.seed(500)

    # In[ ]:

    # data_preprocessing steps

    # Step-1 => Remove blank rows if any
    dataset['body_text'].dropna(inplace=True)
    my_dataset['text'].dropna(inplace=True)

    # Step-2 => Tokenize the given text in the dataset and change it to lowercase
    # for entry in dataset['text']:
    # tokens_list = list()
    # tokens = word_tokenize(str(entry))
    # for token in tokens:
    # token = token.lower
    # tokens_list.append(token)
    # dataset['text'] = tokens_list
    print("is processing")
    dataset['body_text'] = [entry.lower() for entry in dataset['body_text']]
    dataset['body_text'] = [word_tokenize(entry) for entry in dataset['body_text']]
    my_dataset['text'] = [entry.lower() for entry in my_dataset['text']]
    my_dataset['text'] = [word_tokenize(entry) for entry in my_dataset['text']]

    # WordNetLemmatizer requires Pos tags to understand if the word is noun or verb or adjective etc. By default it is set to Noun
    tag_map = defaultdict(lambda: wn.NOUN)
    tag_map['J'] = wn.ADJ
    tag_map['V'] = wn.VERB
    tag_map['R'] = wn.ADV

    for index, entry in enumerate(dataset['body_text']):
        # Declaring Empty List to store the words that follow the rules for this step
        Final_words = []
        print("is iterating...")
        # Initializing WordNetLemmatizer()
        word_Lemmatized = WordNetLemmatizer()
        # pos_tag function below will provide the 'tag' i.e if the word is Noun(N) or Verb(V) or something else.
        for word, tag in pos_tag(entry):
            # Below condition is to check for Stop words and consider only alphabets
            if word not in stopwords.words('english') and word.isalpha():
                word_Final = word_Lemmatized.lemmatize(word, tag_map[tag[0]])
                Final_words.append(word_Final)
        # The final processed set of words for each iteration will be stored in 'text_final'
        dataset.loc[index, 'text_final'] = str(Final_words)

    for index, entry in enumerate(my_dataset['text']):
        # Declaring Empty List to store the words that follow the rules for this step
        Final_words = []
        print("my data is iterating...")
        # Initializing WordNetLemmatizer()
        word_Lemmatized = WordNetLemmatizer()
        # pos_tag function below will provide the 'tag' i.e if the word is Noun(N) or Verb(V) or something else.
        for word, tag in pos_tag(entry):
            # Below condition is to check for Stop words and consider only alphabets
            if word not in stopwords.words('english') and word.isalpha():
                word_Final = word_Lemmatized.lemmatize(word, tag_map[tag[0]])
                Final_words.append(word_Final)
        # The final processed set of words for each iteration will be stored in 'text_final'
        my_dataset.loc[index, 'text_final'] = str(Final_words)

    # In[ ]:

    # preparing the training and testing datasets
    # X_train, X_test, Y_train, Y_test = train_test_split(dataset['text_final'], dataset['label'], test_size=0.3)

    X_train = dataset['text_final']
    Y_train = dataset['reliability']
    X_test = my_dataset['text_final']
    print(X_train)
    print(Y_train)
    print(X_test)

    # In[ ]:

    # encoding the labels
    encoder = LabelEncoder()
    Y_train = encoder.fit_transform(Y_train)
    # Y_test = encoder.fit_transform(Y_test)

    # In[ ]:

    # word vectorization procedure
    tfidf_vect = TfidfVectorizer(max_features=5000)
    tfidf_vect.fit(dataset['text_final'])
    X_train_tfidf = tfidf_vect.transform(X_train)
    X_test_tfidf = tfidf_vect.transform(X_test)
    print(tfidf_vect.vocabulary_)

    # In[ ]:

    print(X_train_tfidf)

    # In[ ]:

    dataset.head(10)

    # In[ ]:

    print(dataset['text_final'])

    # In[ ]:

    # classification using Naive_Bayes algorithm
    nb_classifier = naive_bayes.MultinomialNB()
    nb_classifier.fit(X_train_tfidf, Y_train)

    # predicting the labels on the validation set
    nb_predictions = nb_classifier.predict(X_test_tfidf)
    nb_label = encoder.inverse_transform(nb_predictions)
    result_dataset['nb_label'] = nb_label
    print(result_dataset.head())
    # displaying the accuracy score
    # print("Naive_Bayes Accuracy Score: {}".format(accuracy_score(nb_predictions, Y_test)*100))

    # In[ ]:

    # classification using SVM algorithm
    svm_classifier = svm.SVC(C=1.0, kernel='linear', degree=3, gamma='auto')
    svm_classifier.fit(X_train_tfidf, Y_train)

    # predicting the labels on the validation set
    svm_predictions = svm_classifier.predict(X_test_tfidf)
    svm_label = encoder.inverse_transform(svm_predictions)
    result_dataset['svm_label'] = svm_label
    print(result_dataset.head())
    result_dataset.to_csv(path+'\\'+'all_result.csv', index=False)
    return path + '\\' + 'all_result.csv'
    # displaying the accuracy score
    # print("SVM Accuracy Score: {}".format(accuracy_score(svm_predictions, Y_test)*100))

    # In[ ]:

    # #plotting the histogram
    # import pandas as pd
    # import seaborn as sb
    # from matplotlib import pyplot as plt
    #
    # sb.distplot(accuracy_score((nb_predictions, Y_test)*100), accuracy_score((svm_predictions, Y_test)*100))
    # plt.show()

    # In[ ]:






