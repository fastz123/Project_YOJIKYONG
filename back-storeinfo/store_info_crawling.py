import requests
from bs4 import BeautifulSoup
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
import pymysql

driver = webdriver.Chrome('./chromedriver')


# res = requests.get('https://map.kakao.com/?q='+curstr)
def search_daum(curstr):
    driver.get('https://map.kakao.com/?q=' + curstr)
    wait = WebDriverWait(driver, 8)
    try:
        element = wait.until(EC.element_to_be_clickable((By.CLASS_NAME, 'link_new')))
    except Exception:
        return False

    html = driver.page_source
    bsObject = BeautifulSoup(html, "html.parser")
    info_str = ""
    store_information = ""
    oc_time = ""
    menus = ""
    star = ""
    comment_str = ""

    if (len(bsObject.select(".placelist > li")) >= 1):

        link = bsObject.select(".moreview")[0]['href']
        driver.get(link)
        wait = WebDriverWait(driver, 5)
        element = wait.until(EC.element_to_be_clickable((By.CLASS_NAME, 'link_info')))
        info = driver.page_source
        soupinfo = BeautifulSoup(info, "html.parser")
        length = len(soupinfo.select(".location_detail > a"))
        if (length == 1):
            for i in range(0, length):
                info_str += " " + soupinfo.select(".location_detail > a")[i].text
        #             print(info_str)
        else:
            for i in range(0, length - 1):
                info_str += " " + soupinfo.select(".location_detail > a")[i].text
        #             print(info_str)
        length = len(soupinfo.select(".txt_introduce"))
        if (length >= 1):
            store_information = soupinfo.select(".txt_introduce")[0].text.strip()
        #             print(soupinfo.select(".txt_introduce")[0].text.strip())
        if (len(soupinfo.select(".txt_operation")) >= 1):
            oc_time = soupinfo.select(".txt_operation")[0].text
        #             print(soupinfo.select(".txt_operation")[0].text)
        menulen = len(soupinfo.select(".loss_word"))
        if(menulen >10):
            for i in range(10):
                menus += " " + soupinfo.select(".loss_word")[i].text
        else :
            for i in range(menulen):
                menus += " " + soupinfo.select(".loss_word")[i].text
        #             print(menu.text)
        if (len(soupinfo.select(".evaluation_sorting")) >= 1):
            star = soupinfo.select(".grade_star > .num_rate")[1].text
        #             print("평균점수 "+ soupinfo.select(".grade_star > .num_rate")[1].text)
        comment_len = len(soupinfo.select(".comment_info > .txt_comment"))
        for comment in soupinfo.select(".comment_info > .txt_comment"):
            comment_str += " " + comment.text.split("더보기")[0].replace("❤️", "").replace("👍", "")
    #         print(comment_str)
    return (info_str, store_information, menus, oc_time, star, comment_str)

def crawling(to,end):
    # MySQL Connection 연결
    conn = pymysql.connect(host='13.124.127.88', user='ssafy', password='ssafy',
                           db='project', charset='utf8')
    # Connection 으로부터 Cursor 생성
    curs = conn.cursor()

    # SQL문 실행
    sql = sql = "select * from currency where id>="+str(to)+" and id<"+str(end)
    curs.execute(sql)
    row = curs.fetchall()
    for i in range(end-to):
        rows = row[i]
        # print(rows)
        # print(rows)
        if i % 100 == 0:
            print(i)
        if "음식" in rows[3]:
            sid = rows[0]
            name = rows[2]
            req_str = ""
            ro = ""
            if (len(rows[4].split()) == 0 and len(rows[5].split()) == 0):
                req_str = rows[1] + " " + name
            elif (len(rows[4].split()) > 0):
                ro = rows[4].split()[-2]
                req_str = ro + " " + name.replace("#", "")
            else:
                ri = rows[5].split()[-2]
                req_str = ri + " " + (name.replace("#", ""))
            # print(req_str)
            f = search_daum(req_str)
            hashtag = ""
            infomation = ""
            menus = ""
            oc_time = ""
            star = ""
            review = ""
            insert_query = "insert into store_infos values("
            ids = repr(sid)
            insert_query += "'" + ids + "'" + ", "
            insert_query += "'" + name + "'" + ", "
            # print(f)
            if (f != False):
                if (f[0] == ''):
                    insert_query += "null, "
                else:
                    insert_query += "'" + f[0] + "'" + ", "
                if (f[1] == ''):
                    insert_query += "null, "
                else:
                    insert_query += "'" + f[1].replace("'", "").replace('"', '') + "'" + ", "
                if (f[2] == ''):
                    insert_query += "null, "
                else:
                    insert_query += "'" + f[2].replace("'", "").replace('"', '') + "'" + ", "
                if (f[3] == ''):
                    insert_query += "null, "
                else:
                    insert_query += "'" + f[3].replace("'", "").replace('"', '') + "'" + ", "
                if (f[4] == ''):
                    insert_query += "null, "
                else:
                     insert_query += "'" + f[4].replace("'", "").replace('"', '') + "'" + ", "
                if (f[5] == ''):
                    insert_query += "null"
                else:
                    insert_query += "'" + f[5].replace("'", "").replace('"', '') + "'"
            else:
                insert_query += "null, null, null, null, null, null"

            insert_query += ");"
            # print(insert_query)
            curs.execute(insert_query)
            conn.commit()
    conn.close()

def main():
    crawling(226000,227000)

if __name__ == "__main__":
    main()