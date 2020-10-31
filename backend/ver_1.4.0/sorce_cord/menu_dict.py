import csv

# リクエスト送信後に受け取った店舗のメニューを辞書型で格納する。
def menu_dict(data):
    for name in data:
        with getcwd()+'/nutrition_data/'+name+'.csv',encoding='cp932') as f:
