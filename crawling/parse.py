import requests
from bs4 import BeautifulSoup
import json
import os
import urllib.request
import urllib.parse
import ast

import time;

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
## HTTP GET Request
data = []

apikey = [ #http://www.vworld.kr/dev/v4dv_geocoderguide2_s001.do 여기사이트에서 한계정마다 10개 키를 제공해줌 키 1개당 3만개의 주소를 위도,경도로 바꿔줍니다
           "B4AEF259-8D52-3DD1-A1B8-340F8DD91B42", #한 페이지당 100개 데이터 있음, result37이니까 3700개 크롤링했다는거니까 이 키는 26300 개 남음
           "40E448A8-2C0E-35DC-8B07-30D15FA4FC61", #얘 30000개 남음
           "A7D8491C-8EDF-300C-99BA-E926A0036DF7", #얘 30000개 남음
           "77C37183-AD05-3687-9FFD-882ADEF799F6",#얘 30000개 남음
           "53FB0E4F-2965-3FDD-A8EC-E818C04ABB0E",#얘 30000개 남음
           "B9C84068-AF86-32E3-A7F7-62E3CAA5835D",#얘 30000개 남음
           "4CB10024-BF28-3B50-886E-4A601B1AA99E",#얘 30000개 남음
           "2DCE38B3-968C-3AAE-AB38-BFD3BC331D79",#얘 30000개 남음
           "D6D9DC76-02CD-3643-99F5-21113D6C3648", #얘 테스트한다고 한 5000개 씀 25000개 남음
           "7A11C0BC-0E26-36A6-92C0-F1C87C26946D" #얘도 테스트한다고 한 5000개 씀 25000개 남음
            ]
count = 1
idx = 0;
for page_number in range(1, 5342):
    print(page_number)
    url = 'http://gmoney.or.kr/main/gmoney/searchFranchisee.do?pageIndex=' + str(page_number)
    print(url)
    req = requests.get(url)
    ## HTML 소스 가져오기
    html = req.text
## BeautifulSoup으로 html소스를 python객체로 변환하기
## 첫 인자는 html소스코드, 두 번째 인자는 어떤 parser를 이용할지 명시.
## 이 글에서는 Python 내장 html.parser를 이용했다.
    soup = BeautifulSoup(html, 'html.parser')

    currency = soup.find('tbody')
                      # 데이터를 저장할 리스트 생성
    for tr in currency.find_all('tr'):      # 모든 <tr> 태그를 찾아서 반복(각 지점의 데이터를 가져옴)
        tds = list(tr.find_all('td'))    # 모든 <td> 태그를 찾아서 리스트로 만듦                                     # (각 날씨 값을 리스트로 만듦)

        CMPNM_NM = tds[0].text
        REFINE_ROADNM_ADDR = tds[1].text    # <td> 태그 리스트의 여섯 번째(인덱스 5)에서 기온을 가져옴
        INDUTPYE_NM = tds[2].text
        TELNO = tds[3].text

        if count >= 28000: #count 변수가 키 값 사용범위 넘어가면 다음 키로 바꿔주도록 함
            idx += 1 #idx 하나 올려주고
            count = 1
        print("idx(키인덱스) : " + str(idx) + " " + "count(키사용횟수) : " + str(count))
        ApiKey = apikey[idx] #키 바꿔주는거
        #-----------------------------api 호출 부분

        apiUrl = 'http://api.vworld.kr/req/address?service=address&request=getCoord&key=' + ApiKey + '&'
        values = {'address': REFINE_ROADNM_ADDR, 'type': 'road'}
        param = urllib.parse.urlencode(values)
        Adding = apiUrl + param
        req = urllib.request.Request(Adding)
        res = urllib.request.urlopen(req)
        respon_data = res.read().decode()
        DataDict = ast.literal_eval(respon_data)
        v_check = DataDict['response']['status']
        print(v_check)
        print(DataDict['response'])
        count += 1 #키 사용 갯수 세는거

        #-----------------------------api 호출 부분
        if v_check == 'OK': # 성공하면 OK 인데 실패하면 뭐 다른거 뜨면서 멈추더라고
            data.append({"CMPNM_NM": CMPNM_NM,
                         "REFINE_ROADNM_ADDR": REFINE_ROADNM_ADDR,
                         "INDUTPYE_NM": INDUTPYE_NM,
                         "TELNO": TELNO,
                         "REFINE_WGS84_LAT": DataDict['response']['result']['point']['y'],
                         "REFINE_WGS84_LOGT": DataDict['response']['result']['point']['x']
                         })  # data 리스트에 지점, 기온, 습도를 추가

        else:  # 위도, 경도 데이터 받아서 update 실패할경우 그냥 위도경도에 빈칸 넣음
            data.append({"CMPNM_NM" : CMPNM_NM ,
                     "REFINE_ROADNM_ADDR" : REFINE_ROADNM_ADDR,
                     "INDUTPYE_NM" : INDUTPYE_NM,
                     "TELNO" : TELNO,
                     "REFINE_WGS84_LAT" : "",
                     "REFINE_WGS84_LOGT" : ""})
    if page_number % 10 == 0:
        filename = 'result' + str(int(page_number/10)) + '.json'
        with open(os.path.join(BASE_DIR, filename), 'w+', encoding='UTF8') as json_file:
             json.dump(data, json_file, ensure_ascii=False)



#---페이징 완료 시점


