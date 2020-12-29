# 기존 view 대신 rest_framework를 활용해 데이터 전송하기
from rest_framework.response import Response
# http 메서드 중 원하는 타입을 지정하기 위해 api_view를 활용하기
from rest_framework.decorators import api_view

# 생성한 모델 및 시리얼라이저를 import시키기
from .models import QuizApp
from .serializers import QuizAppSerialize

# 크롤링에 사용할 api
from urllib.request import urlopen
from bs4 import BeautifulSoup

import requests 

@api_view(['GET'])
def hello_api(request):
    
    # 크롤링을 이용한 방법
    URL = 'https://www.piku.co.kr/w/get_list.php'

    # TODO
    # 화면에서 page_num 보내주기
    page_num = 0
    formData = {
        'l': '',
        's': page_num,
        'n': 'bj',
        'st': 'hot',
        'dt': '7777',
        'tp': 'all'
    }
    response = requests.post(URL, data=formData) 
    html = response.text
    stock_html = BeautifulSoup(html, "html.parser")
    titles = stock_html.find_all("a", attrs={"class":"product-name"})
    images = stock_html.find_all("div", attrs={"class":"product-imitation"})

    title_list = []
    for title in titles:
        title_str = title.text
        title_list.append(title_str)
    image_list = []
    for image in images:
        image_str = str(image).split("url('")
        first_image = image_str[1].split(");")[0]
        second_image = image_str[2].split(");")[0]
        name_list = image.text.strip().split('\n')
        image_list.append(first_image)
        image_list.append(second_image)
        image_list.append(name_list[0])
        image_list.append(name_list[1])
    quiz_list = []
    for quiz in title_list:
        quiz_dic = {'title': quiz, 'first_image': '', 'second_image': '', 'first_name': '', 'second_name': ''}
        for i in range(4):
            if i == 0:
                quiz_dic['first_image'] = image_list.pop(0)
            elif i == 1:
                quiz_dic['second_image'] = image_list.pop(0)
            elif i == 2:
                quiz_dic['first_name'] = image_list.pop(0)
            elif i == 3:
                quiz_dic['second_name'] = image_list.pop(0)
        quiz_list.append(quiz_dic)
    
    serializer = QuizAppSerialize(quiz_list, many=True)
    return Response(serializer.data)

@api_view(['GET'])
def select_quiz(request, page_num):
    quizdata = QuizApp.objects.all()
    random_quizs = list(quizdata)
    serializer = QuizAppSerialize(random_quizs, many=True)
    return Response(serializer.data)
