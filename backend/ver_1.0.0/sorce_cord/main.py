import pulp
from get_nutrition_val_list import get_nutrition_val_list

def main():
    #問題の定義　最小化か最大化か　
    # 今回はカロリーを最小化したい。
    problem = pulp.LpProblem(name ="1日の栄養素を満たすメニュー", sense = pulp.LpMinimize)

    import csv
    McdonaldsDict = {}
    with open('nutrition_data/windows_macdonalds_nutrition.csv',encoding='cp932') as f:
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
        "エネルギーkcal" : 2650.0,
        "たんぱく質g" : 65.0 ,
        "脂質g" : 73.6 ,
        "炭水化物g" : 380.9 ,
        "カルシウムmg" : 800.0 ,
        "鉄mg" : 7.5 ,
        "ビタミンAμg" : 850.0 ,
        "ビタミンB1mg" : 1.4 ,
        "ビタミンB2mg" : 1.6 ,
        "ビタミンCmg" : 100.0 ,
        "食物繊維g" : 21.0 ,
        "食塩相当量g" : 7.5 ,
        }
    print("one_da_nutrition_dict:",one_da_nutrition_dict)
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
    #print("xs:",xs)

    # 目的関数：カロリーを最小化
    # lpdot:二つのリストのない席を求める。
    problem += pulp.lpDot(eiyou_data["エネルギーkcal"],xs)

    #制約条件：　一日に必要内容量をそれぞれ満たすこと
    # 条件カスタマイズ＆ON-OFFしやすいように、あえてループ外で起債。
    #食塩相当については、「以内」としている。解が存在スカは要注意
    problem += pulp.lpDot(eiyou_data["たんぱく質g"], xs) >= one_da_nutrition_dict["たんぱく質g"]
    problem += pulp.lpDot(eiyou_data["脂質g"], xs) >= one_da_nutrition_dict["脂質g"]
    problem += pulp.lpDot(eiyou_data["炭水化物g"], xs) >= one_da_nutrition_dict["炭水化物g"]
    problem += pulp.lpDot(eiyou_data["カルシウムmg"], xs) >= one_da_nutrition_dict["カルシウムmg"]
    problem += pulp.lpDot(eiyou_data["鉄mg"], xs) >= one_da_nutrition_dict["鉄mg"]
    problem += pulp.lpDot(eiyou_data["ビタミンAμg"], xs) >= one_da_nutrition_dict["ビタミンAμg"]
    problem += pulp.lpDot(eiyou_data["ビタミンB1mg"], xs) >= one_da_nutrition_dict["ビタミンB1mg"]
    problem += pulp.lpDot(eiyou_data["ビタミンB2mg"], xs) >= one_da_nutrition_dict["ビタミンB2mg"]
    problem += pulp.lpDot(eiyou_data["ビタミンCmg"], xs) >= one_da_nutrition_dict["ビタミンCmg"]
    problem += pulp.lpDot(eiyou_data["食物繊維g"], xs) >= one_da_nutrition_dict["食物繊維g"]
    problem += pulp.lpDot(eiyou_data["食塩相当量g"], xs) <= one_da_nutrition_dict["食塩相当量g"]

    #与えられた問題の内容を表示
    print(problem)
    status = problem.solve()
    print("Status:", pulp.LpStatus[status])  # Statusがoptionalなら解が見つかっている。

    #簡易結果表示
    #print([x.value() for x in xs])
    #print(problem.objective.value())

    #　変数名ごとに表示
    print("「一日に必要な栄養素を摂取するには」")
    for x in xs:
        print(str(x),":",str(int(x.value())),"個")
    print("\n")
    # それぞれの栄養素がいくらか
    print("栄養素の値")
    for key in one_da_nutrition_dict:
        print(key,":",str(one_da_nutrition_dict[key]),"に対し",str(round(pulp.lpDot(eiyou_data[key],xs).value())))


# python main.pyで実行されたときだけ動くようにする。
if  __name__ == "__main__":		# importされると"__main__"は入らないので，実行かimportかを判断できる．
	main()    # メイン関数を実行
