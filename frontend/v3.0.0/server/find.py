import pulp
import csv
# 関数を読み込み
from get_nutrition_val_list import get_nutrition_val_list
from old_one_da_nutrition_dict import old_one_da_nutrition_dict
from up_limit import up_limit
from menu_dict import menu_dict

def find(problem,data,MenuDict,target_menu_list,one_da_nutrition_dict):
    # print("one_da_nutrition_dict:",one_da_nutrition_dict)

    # 対象とする栄養素について、対象の商品リストごとの栄養価を、リスト形式で作成する
    eiyou_data = {}
    for key in one_da_nutrition_dict.keys():
        # keyに入っている栄養の名称を、データのdictのkeyにする。
        eiyou_data[key] = get_nutrition_val_list(
            MenuDict, target_menu_list, key)

    # 変数の定義
    # LpVariableで自由辺巣を作成。値は-∞から∞まで
    # lowBoundで0から∞まで
    # catで変数の種類指定
    # 商品の上限指定　
    #print("up_value:", up_value)
    xs = up_limit(target_menu_list, up_value)

    # 目的関数：カロリーを最小化
    # lpdot:二つのリストのない席を求める。
    problem += pulp.lpDot(eiyou_data["エネルギー[kcal]"], xs)

    # 制約条件：　一日に必要内容量をそれぞれ満たすこと
    # 条件カスタマイズ＆ON-OFFしやすいように、あえてループ外で起債。
    # 食塩相当については、「以内」としている。解が存在スカは要注意
    for key in eiyou_data.keys():
        # 食塩は以下なので別個でやる
        if key == "食塩相当量[g]":
            continue
        # メニューの数と栄養素のデータの数が一致しないときは計算しない。
        if len(eiyou_data[key]) == len(target_menu_list):
            #print("eiyou_data[key]",len(eiyou_data[key]),len(target_menu_list))
            problem += pulp.lpDot(eiyou_data[key], xs) >= float(one_da_nutrition_dict[key])

    problem += pulp.lpDot(eiyou_data["食塩相当量[g]"], xs) <= float(one_da_nutrition_dict["食塩相当量[g]"])

    # 与えられた問題の内容を表示
    # print(problem)
    status = problem.solve()
    return eiyou_data,xs,status,cal_key
