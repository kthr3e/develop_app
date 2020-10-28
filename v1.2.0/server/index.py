from flask import Flask
from flask import request, make_response, jsonify
from flask_cors import CORS
import csv
import pulp
import os
# 関数呼び出し
from get_nutrition_val_list import get_nutrition_val_list
from old_one_da_nutrition_dict import old_one_da_nutrition_dict
from up_limit import up_limit


# flaskの設定
# Flaskオブジェクトの生成
# static_folderは静的ライブラリの指定　
app = Flask(__name__,static_folder = "./build/static",template_folder="./build")

@app.route('/',methods = ["GET","POST"])
def index():
    #GETのとき、年齢と性別を取得する。
    if request.method == "GET":
        return """
        性別と年齢を選択してください。
        <form action="/" method = "POST">
        <select name="gender">
        <option value="0">男性</option>
        <option value="1">女性</option>
        </select>
        <br>
        <select name="old">
        <option value="0">3-5歳</option>
        <option value="1">6-7歳</option>
        <option value="2">8-9歳</option>
        <option value="3">10-11歳</option>
        <option value="4">12-14歳</option>
        <option value="5">15-17歳</option>
        <option value="6">18-29歳</option>
        <option value="7">30-49歳</option>
        <option value="8">50-64歳</option>
        <option value="9">65-74歳</option>
        <option value="10">75歳以上</option>
        <input type="submit">
        </select>
        </form>
        """

    else:
        # error構文を追加　もしGETが正常じゃないとき
        try:
            #問題の定義　最小化か最大化か　
            # 今回はカロリーを最小化したい。
            problem = pulp.LpProblem(name ="1日の栄養素を満たすメニュー", sense = pulp.LpMinimize)


            McdonaldsDict = {}
            with open(os.getcwd()+'/nutrition_data/macdonalds_nutrition.csv',encoding='cp932') as f:
                reader = csv.DictReader(f)
                # OrderedDict([('商品名', 'えびフィレオ'), ('重量g', '174'), ・・・が１行ごとに入っている
                # ※ジュース系などで、栄養価が「-」のものは０を置換済み
                for row in reader:
                    # 'えびフィレオ' : OrderedDict([('商品名', 'えびフィレオ'), ('重量g', '174')・・・ の辞書形式に加工
                    McdonaldsDict[row["商品名"]] = row

            # メニューリスト
            target_menu_list = [
            "てりやきマックバーガー",
            "ハンバーガー",
            "チーズバーガー",
            "ベーコンレタスバーガー",
            "チキンフィレオ",
            "えびフィレオ",
            "フィレオフィッシュ",
            "ダブルチーズバーガー",
            "ビッグマック",
            "チキンマックナゲット 5ピース",
            "マックフライポテト(L)",
            "マックフライポテト(M)",
            "マックフライポテト(S)",
            "ホットアップルパイ",
            "ワッフルコーン プレーン",
            "マックフルーリーオレオ",
            "プチパンケーキ",
            "三角チョコパイ 黒",
            "スイートコーン",
            "サイドサラダ",
            "ハッシュポテト",
            "コカ・コーラ",
            "アイスカフェラテ",
            "キャラメルラテ",
            "マックシェイクバニラ",
            "マックシェイクチョコレート",
            "ミニッツメイドオレンジ",
            ]

            gender = int(request.form["gender"])
            old = int(request.form["old"])
            #print("gender:",gender,"old:",old)
            #gender,old = map(int,input().split())
            one_da_nutrition_dict = old_one_da_nutrition_dict(gender,old)
            #print("one_da_nutrition_dict:",one_da_nutrition_dict)

            # 対象とする栄養素について、対象の商品リストごとの栄養価を、リスト形式で作成する
            eiyou_data = {}
            for key in one_da_nutrition_dict.keys():
                # keyに入っている栄養の名称を、データのdictのkeyにする。
                eiyou_data[key] = get_nutrition_val_list(McdonaldsDict,target_menu_list,key)

            # 変数の定義
            #LpVariableで自由辺巣を作成。値は-∞から∞まで
            #lowBoundで0から∞まで
            #catで変数の種類指定
<<<<<<< HEAD
            # 商品の上限指定　
=======
>>>>>>> e1c87f6a651dc29c8a862dace48b42a3fa0b70b8
            up_value = int(request.form["up_value"])
            print("up_value:",up_value)
            xs = up_limit(target_menu_list,up_value)
            #print("xs:",xs)

            # 目的関数：カロリーを最小化
            # lpdot:二つのリストのない席を求める。
            problem += pulp.lpDot(eiyou_data["エネルギー[kcal]"],xs)

            #制約条件：　一日に必要内容量をそれぞれ満たすこと
            # 条件カスタマイズ＆ON-OFFしやすいように、あえてループ外で起債。
            #食塩相当については、「以内」としている。解が存在スカは要注意
            problem += pulp.lpDot(eiyou_data["たんぱく質[g]"], xs) >= float(one_da_nutrition_dict["たんぱく質[g]"])
            problem += pulp.lpDot(eiyou_data["脂質[g]"], xs) >= float(one_da_nutrition_dict["脂質[g]"])
            problem += pulp.lpDot(eiyou_data["炭水化物[g]"], xs) >= float(one_da_nutrition_dict["炭水化物[g]"])
            problem += pulp.lpDot(eiyou_data["カルシウム[mg]"], xs) >= float(one_da_nutrition_dict["カルシウム[mg]"])
            problem += pulp.lpDot(eiyou_data["鉄[mg]"], xs) >= float(one_da_nutrition_dict["鉄[mg]"])
            problem += pulp.lpDot(eiyou_data["ビタミンA[μg]"], xs) >= float(one_da_nutrition_dict["ビタミンA[μg]"])
            problem += pulp.lpDot(eiyou_data["ビタミンB1[mg]"], xs) >= float(one_da_nutrition_dict["ビタミンB1[mg]"])
            problem += pulp.lpDot(eiyou_data["ビタミンB2[mg]"], xs) >= float(one_da_nutrition_dict["ビタミンB2[mg]"])
            problem += pulp.lpDot(eiyou_data["ビタミンC[mg]"], xs) >= float(one_da_nutrition_dict["ビタミンC[mg]"])
            problem += pulp.lpDot(eiyou_data["食物繊維[g]"], xs) >= float(one_da_nutrition_dict["食物繊維[g]"])
            problem += pulp.lpDot(eiyou_data["食塩相当量[g]"], xs) <= float(one_da_nutrition_dict["食塩相当量[g]"])

            #与えられた問題の内容を表示
            #print(problem)
            status = problem.solve()
            #print("Status:", pulp.LpStatus[status])  # Statusがoptionalなら解が見つかっている。

            #簡易結果表示
            #print([x.value() for x in xs])
            #print(problem.objective.value())

            #　変数名ごとに表示
            one_da_neces_nutrition={}
            for x in xs:
                #print(str(x),":",str(int(x.value())),"個")
                one_da_neces_nutrition[str(x)]=str(int(x.value()))+"個"


            # それぞれの栄養素がいくらか
            # nutrition_comp 一日に必要な栄養素の比較
            nutrition_comp={}
            for key in one_da_nutrition_dict:
                #print(key,":",str(one_da_nutrition_dict[key]),"に対し",str(round(pulp.lpDot(eiyou_data[key],xs).value())))
                nutrition_comp[key]=str(one_da_nutrition_dict[key])+"に対し"+str(round(pulp.lpDot(eiyou_data[key],xs).value()))

            return one_da_neces_nutrition,nutrition_comp


        except:
            return"""
            ERROR !!!　お前うんち
            """


# python main.pyで実行されたときだけ動くようにする。
if  __name__ == "__main__":		# importされると"__main__"は入らないので，実行かimportかを判断できる．
    app.debug = True
    app.run(host='localhost', port=5000)
