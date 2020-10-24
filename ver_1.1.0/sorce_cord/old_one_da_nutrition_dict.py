#性別と年齢を入力された時の値から算出しそれに合わせた一日の栄養素を適用する。
#  身体活動レベル　ふつう(レベルII)　座位中心の仕事だが、
#職場内での移動や立位での作業・接客等、あるいは通勤・買物・家事、軽いスポーツ等のいずれかを含む場合
# ただし、食塩相当量は、必要ではなく「以下」にすべき値

from calculate_age import calculate_age

def old_one_da_nutrition_dict():
    # 年齢を取得
    year,month,day = map(int,input("あなたの生年月日を入力してください　例：1998/09/01\n").split("/"))
    age = calculate_age(year,month,day)
    #print(age)
    #print(type(age))  Integer
    #　性別を取得　ここはwebの表現で変えてほしい。
    gender = map(int,input("あなたの性別を教えてください。　0:man 1:woman  例：あなたが女性の場合　1を選択してください"))

    # 一日に必要な栄養素を取得する。
    if gender:
        if age >= 3 and age <= 5:
            one_da_nutrition_dict ={
                "エネルギーkcal" : 1300.0,
                "たんぱく質g" : 25.0 ,
                "脂質g" : 36.1 ,
                "炭水化物g" : 186.9 ,
                "カルシウムmg" : 600.0 ,
                "鉄mg" : 5.5 ,
                "ビタミンAμg" : 450.0 ,
                "ビタミンB1mg" : 1.4 ,
                "ビタミンB2mg" : 1.6 ,
                "ビタミンCmg" : 100.0 ,
                "食物繊維g" : 21.0 ,
                "食塩相当量g" : 7.5 ,
                }


old_one_da_nutrition_dict()
