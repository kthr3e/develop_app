#性別と年齢を入力された時の値から算出しそれに合わせた一日の栄養素を適用する。
#  身体活動レベル　ふつう(レベルII)　座位中心の仕事だが、
#職場内での移動や立位での作業・接客等、あるいは通勤・買物・家事、軽いスポーツ等のいずれかを含む場合
# ただし、食塩相当量は、必要ではなく「以下」にすべき値

#from calculate_age import calculate_age
import csv
import pandas as pd

def old_one_da_nutrition_dict():
    # 年齢を取得
    #year,month,day = map(int,input("あなたの生年月日を入力してください　例：1998/09/01\n").split("/"))
    #age = calculate_age(year,month,day)
    #print(age)
    #print(type(age))  Integer
    #gender = map(int,input("あなたの性別を教えてください。　0:man 1:woman  例：あなたが女性の場合1を選択してください\n"))
    #old = map(int,input("あなたの年齢を入力してください。\n"))
    # 一日に必要な栄養素を取得する。

    man_one_da_nutrition_dict={}
    woman_one_da_nutrition_dict={}
    with open('nutrition_data/old_age_nutrition.csv',encoding='cp932') as f:
        #lst = pd.read_csv(f).values.tolist()
        #print(lst)
        reader = csv.DictReader(f)
        #print(reader)
        for row in reader:
            #print("row:",row)
            #print("row[]:",row["性別"])
            #男女別でcsvを分ける。
            if row["性別"] == "man":
                man_one_da_nutrition_dict[row["年齢"]] = row

            else :
                woman_one_da_nutrition_dict[row["年齢"]] = row
    print(man_one_da_nutrition_dict)
    #print(woman_one_da_nutrition_dict)


old_one_da_nutrition_dict()
