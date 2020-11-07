import pulp
import csv
# 関数を読み込み
from get_nutrition_val_list import get_nutrition_val_list
from old_one_da_nutrition_dict import old_one_da_nutrition_dict
from up_limit import up_limit
from menu_dict import menu_dict

def main():
    #問題の定義　最小化か最大化か　
    # 今回はカロリーを最小化したい。
    problem = pulp.LpProblem(name ="1日の栄養素を満たすメニュー", sense = pulp.LpMinimize)

    data = {"shop":["dennys","macdonalds"]}
    MenuDict = menu_dict(data["shop"])
    #print("wx: ",MenuDict)

    # メニューリストを自動で取得するようにする。のちに選択式になる予定。

    data = {"menu":[ "てりやきマックバーガー",
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
        ]}

    if not data["menu"]:
        target_menu_list = list(MenuDict.keys())
    else:
        target_menu_list = data["menu"]
    #print("target_menu_list:",target_menu_list)
    # メニューリスト
    # target_menu_list = [
    # "てりやきマックバーガー",
    # "ハンバーガー",
    # "チーズバーガー",
    # "ベーコンレタスバーガー",
    # "チキンフィレオ",
    # "えびフィレオ",
    # "フィレオフィッシュ",
    # "ダブルチーズバーガー",
    # "ビッグマック",
    # "チキンマックナゲット 5ピース",
    # "マックフライポテト(L)",
    # "マックフライポテト(M)",
    # "マックフライポテト(S)",
    # "ホットアップルパイ",
    # "ワッフルコーン プレーン",
    # "マックフルーリーオレオ",
    # "プチパンケーキ",
    # "三角チョコパイ 黒",
    # "スイートコーン",
    # "サイドサラダ",
    # "ハッシュポテト",
    # "コカ・コーラ",
    # "アイスカフェラテ",
    # "キャラメルラテ",
    # "マックシェイクバニラ",
    # "マックシェイクチョコレート",
    # "ミニッツメイドオレンジ",
    # ]
    #
    # print("\n")
    # print("target_menu_list",target_menu_list)

    one_da_nutrition_dict = old_one_da_nutrition_dict()
    #print("one_da_nutrition_dict:",one_da_nutrition_dict)

    # 対象とする栄養素について、対象の商品リストごとの栄養価を、リスト形式で作成する
    eiyou_data = {}
    for key in one_da_nutrition_dict.keys():
        # keyに入っている栄養の名称を、データのdictのkeyにする。
        eiyou_data[key] = get_nutrition_val_list(MenuDict,target_menu_list,key)
    #print("eiyou_data",eiyou_data)

    # 変数の定義
    #LpVariableで自由辺巣を作成。値は-∞から∞まで
    #lowBoundで0から∞まで
    #catで変数の種類指定
    # 上限を指定
    upbound = 10
    xs = up_limit(target_menu_list,upbound)
    #print("xs:",xs)

    # 目的関数：カロリーを最小化
    # lpdot:二つのリストのない席を求める。
    problem += pulp.lpDot(eiyou_data["エネルギー[kcal]"],xs)

    #制約条件：　一日に必要内容量をそれぞれ満たすこと
    # 条件カスタマイズ＆ON-OFFしやすいように、あえてループ外で起債。
    #食塩相当については、「以内」としている。解が存在スカは要注意
    # 栄養素を存在するかどうかをkeyがあるかどうかの判定にする
    # この場合だとメニューを組み合わせたときにエラーが起こる
    for key in eiyou_data.keys():
        if key == "食塩相当量[g]":
            continue
        # メニューの数と栄養素のデータの数が一致しないときは計算しない。
        if len(eiyou_data[key]) == len(target_menu_list):
            #print("eiyou_data[key]",len(eiyou_data[key]),len(target_menu_list))
            problem += pulp.lpDot(eiyou_data[key], xs) >= float(one_da_nutrition_dict[key])

    problem += pulp.lpDot(eiyou_data["食塩相当量[g]"], xs) <= float(one_da_nutrition_dict["食塩相当量[g]"])

    #与えられた問題の内容を表示
    #print(problem)
    status = problem.solve()
    print("Status:", pulp.LpStatus[status])  # Statusがoptionalなら解が見つかっている。

    if pulp.LpStatus[status] == "Optimal":
        #簡易結果表示
        #print([x.value() for x in xs])
        #print(problem.objective.value())

        #　変数名ごとに表示
        print("「一日に必要な栄養素を摂取するには」")
        for x in xs:
            #print("x.value:",x.value)
            print(str(x),":",str(int(x.value())),"個")

        print("\n")
        # それぞれの栄養素がいくらか
        print("栄養素の値")
        for key in one_da_nutrition_dict:
            print(key,":",str(one_da_nutrition_dict[key]),"に対し",str(round(pulp.lpDot(eiyou_data[key],xs).value())))

    else:
         print("結果が求められていないか、ERRORか")

# python main.pyで実行されたときだけ動くようにする。
if  __name__ == "__main__":		# importされると"__main__"は入らないので，実行かimportかを判断できる．
	main()    # メイン関数を実行
