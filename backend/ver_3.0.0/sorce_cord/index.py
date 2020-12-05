import pulp
import csv
# 関数を読み込み
from get_nutrition_val_list import get_nutrition_val_list
from old_one_da_nutrition_dict import old_one_da_nutrition_dict
from up_limit import up_limit
from menu_dict import menu_dict
from recommend import recommend
from find import find

def index():
    #問題の定義　最小化か最大化か　
    # 今回はカロリーを最小化したい。
    problem = pulp.LpProblem(name ="1日の栄養素を満たすメニュー", sense = pulp.LpMinimize)

    data = {"shop":["dennys"]}
    MenuDict = menu_dict(data["shop"])
    print("MenuDict: ",MenuDict)

    # メニューリストを自動で取得するようにする。のちに選択式になる予定。

    data = {"menu":[]}

    if not data["menu"]:
        target_menu_list = list(MenuDict.keys())
    else:
        target_menu_list = data["menu"]
    #print("target_menu_list",target_menu_list)

    one_da_nutrition_dict = old_one_da_nutrition_dict()
    #print("one_da_nutrition_dict:",one_da_nutrition_dict)

    eiyou_data,xs,status,cal_key = find(problem,data,MenuDict,target_menu_list,one_da_nutrition_dict)

    #与えられた問題の内容を表示
    #print(problem)
    print("Status:", pulp.LpStatus[status])  # Statusがoptionalなら解が見つかっている。

    if pulp.LpStatus[status] == "Optimal":
        #簡易結果表示
        #print([x.value() for x in xs])
        #print(problem.objective.value())

        #　変数名ごとに表示
        print("「一日に必要な栄養素を摂取するには」")
        for x in xs:
            #print(x)
            if int(x.value()) != 0:
                #print("x.value:",x.value)
                print(str(x),":",str(int(x.value())),"個")

        print("\n")
        # それぞれの栄養素がいくらか
        print("栄養素の値")
        for key in cal_key:
            print(key,":",str(one_da_nutrition_dict[key]),"に対し",str(round(pulp.lpDot(eiyou_data[key],xs).value())))

    else:
        print("結果が求められていないか、ERRORか")
        # メニューリストを選択されたものを除外と選択されたものの栄養素を抜いた値を使用する。
        rec_problem = pulp.LpProblem(name ="1日の栄養素を満たす追加のメニュー", sense = pulp.LpMinimize)
        recommend_menu_list,one_da_nutrition_dict = recommend(MenuDict,target_menu_list,one_da_nutrition_dict,eiyou_data)
        #　全メニューが選択されたにもかかわらず、一日の栄養素を満たさない場合。
        if not recommend_menu_list:
            print("残念ながら選択されたお店では一日の栄養素を満たすものはないようです")
            exit()
        eiyou_data,xs,re_status,cal_key = find(rec_problem,data,MenuDict,recommend_menu_list,one_da_nutrition_dict)
        #　変数名ごとに表示
        if pulp.LpStatus[re_status] == "Optimal":
            print("追加でこんなメニューはどうですか")
            for x in xs:
                #print(x,x.value())
                if x.value() != None and int(x.value()) != 0:
                    #print("x.value:",x.value)
                    print(str(x),":",str(int(x.value())),"個")

            print("\n")

        else:
            print("！！！！残念ながら選択されたお店では一日の栄養素を満たすものはないようです")


# python main.pyで実行されたときだけ動くようにする。
if  __name__ == "__main__":		# importされると"__main__"は入らないので，実行かimportかを判断できる．
	index()    # メイン関数を実行
