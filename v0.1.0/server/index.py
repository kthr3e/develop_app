from flask import Flask
from flask import request, make_response, jsonify
from flask_cors import CORS
import csv
import pulp
import os

app = Flask(__name__, static_folder="./build/static", template_folder="./build")
CORS(app) #Cross Origin Resource Sharing

@app.route("/", methods=['POST'])
def index():
    #問題の定義　最小化か最大化か　
    # 今回はカロリーを最小化したい。
    problem = pulp.LpProblem(name ="1日の栄養素を満たすメニュー", sense = pulp.LpMinimize)

    McdonaldsDict = {}
    with open(os.getcwd()+'/windows_macdonalds_nutrition.csv',encoding='cp932') as f:
        #print(f.read())
        reader = csv.DictReader(f)
        #print(reader)
        # OrderedDict([('商品名', 'えびフィレオ'), ('重量g', '174'), ・・・が１行ごとに入っている
        # ※ジュース系などで、栄養価が「-」のものは０を置換済み
        for row in reader:
            # 'えびフィレオ' : OrderedDict([('商品名', 'えびフィレオ'), ('重量g', '174')・・・ の辞書形式に加工
            McdonaldsDict[row["商品名"]] = row
            # print(row,'\n')

    #print(McdonaldsDict)

    # 特定の栄養価リストを取得する
    # 対象のtarget_menu_listに入っている順番に、栄養価の値を取得
    def get_nutrition_val_list(nutrition_dict, target_menu_list, eiyou_name):
        result_list = []
        for menu_name in target_menu_list:
            #　栄養価を取得してfloatに変換
            eiyou_val = nutrition_dict[menu_name][eiyou_name]
            result_list.append(float(eiyou_val))
        return result_list


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


    #　男性18歳から29歳までの一日に必要な栄養量。
    #  身体活動レベル　ふつう(レベルII)　座位中心の仕事だが、
    #職場内での移動や立位での作業・接客等、あるいは通勤・買物・家事、軽いスポーツ等のいずれかを含む場合
    ## ただし、食塩相当量は、必要ではなく「以下」にすべき値

    one_da_nutrition_dict ={
        "エネルギー[kcal]" : 2650.0,
        "たんぱく質[g]" : 65.0 ,
        "脂質[g]" : 73.6 ,
        "炭水化物[g]" : 380.9 ,
        "カルシウム[mg]" : 800.0 ,
        "鉄[mg]" : 7.5 ,
        "ビタミンA[μg]" : 850.0 ,
        "ビタミンB1[mg]" : 1.4 ,
        "ビタミンB2[mg]" : 1.6 ,
        "ビタミンC[mg]" : 100.0 ,
        "食物繊維[g]" : 21.0 ,
        "食塩相当量[g]" : 7.5 ,
    }

    # 対象とする栄養素について、対象の商品リストごとの栄養価を、リスト形式で作成する
    eiyou_data = {}
    for key in one_da_nutrition_dict.keys():
        # keyに入っている栄養の名称を、データのdictのkeyにする。
        eiyou_data[key] = get_nutrition_val_list(McdonaldsDict,target_menu_list,key)

    # 変数の定義
    #LpVariableで自由辺巣を作成。値は-∞から∞まで
    #lowBoundで0から∞まで
    #catで変数の種類指定
    xs = [pulp.LpVariable('{}'.format(x), cat = 'Integer', lowBound = 0) for x in target_menu_list]
    # print("xs:",xs)

    # 目的関数：カロリーを最小化
    # lpdot:二つのリストのない席を求める。
    problem += pulp.lpDot(eiyou_data["エネルギー[kcal]"],xs)

    #制約条件：　一日に必要内容量をそれぞれ満たすこと
    # 条件カスタマイズ＆ON-OFFしやすいように、あえてループ外で起債。
    #食塩相当については、「以内」としている。解が存在スカは要注意
    problem += pulp.lpDot(eiyou_data["たんぱく質[g]"], xs) >= one_da_nutrition_dict["たんぱく質[g]"]
    problem += pulp.lpDot(eiyou_data["脂質[g]"], xs) >= one_da_nutrition_dict["脂質[g]"]
    problem += pulp.lpDot(eiyou_data["炭水化物[g]"], xs) >= one_da_nutrition_dict["炭水化物[g]"]
    problem += pulp.lpDot(eiyou_data["カルシウム[mg]"], xs) >= one_da_nutrition_dict["カルシウム[mg]"]
    problem += pulp.lpDot(eiyou_data["鉄[mg]"], xs) >= one_da_nutrition_dict["鉄[mg]"]
    problem += pulp.lpDot(eiyou_data["ビタミンA[μg]"], xs) >= one_da_nutrition_dict["ビタミンA[μg]"]
    problem += pulp.lpDot(eiyou_data["ビタミンB1[mg]"], xs) >= one_da_nutrition_dict["ビタミンB1[mg]"]
    problem += pulp.lpDot(eiyou_data["ビタミンB2[mg]"], xs) >= one_da_nutrition_dict["ビタミンB2[mg]"]
    problem += pulp.lpDot(eiyou_data["ビタミンC[mg]"], xs) >= one_da_nutrition_dict["ビタミンC[mg]"]
    problem += pulp.lpDot(eiyou_data["食物繊維[g]"], xs) >= one_da_nutrition_dict["食物繊維[g]"]
    problem += pulp.lpDot(eiyou_data["食塩相当量[g]"], xs) <= one_da_nutrition_dict["食塩相当量[g]"]

    #与えられた問題の内容を表示
    # print(problem)
    status = problem.solve()
    # print("Status:", pulp.LpStatus[status])  # Statusがoptionalなら解が見つかっている。

    #簡易結果表示
    print([x.value() for x in xs])
    #print(problem.objective.value())

    #　変数名ごとに表示
    print("「一日に必要な栄養素を摂取するには」")
    response1={}
    for x in xs:
        if int(x.value())!= 0:
            print(str(x),":",str(int(x.value())),"個")
            response1[str(x)]=str(int(x.value()))+"個"
    print("\n")
    # それぞれの栄養素がいくらか
    print("栄養素の値")
    response2={}
    for key in one_da_nutrition_dict:
        print(key,":",str(one_da_nutrition_dict[key]),"に対し",str(round(pulp.lpDot(eiyou_data[key],xs).value())))
        response2[key]=str(one_da_nutrition_dict[key])+"に対し"+str(round(pulp.lpDot(eiyou_data[key],xs).value()))
    return make_response(jsonify(response1,response2))


@app.route("/post", methods=['POST'])
def parse():
    #print(request.get_json()) # -> {'post_text': 'テストテストテスト'}
    data = request.get_json()
    text = data['post_text']

    response = {'result': text}
    #print(response)
    return make_response(jsonify(response))

if __name__ == "__main__":
    app.debug = True
    app.run(host='localhost', port=5000)
