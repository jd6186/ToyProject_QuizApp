# QuizApp 내에 있는 url들을 관리하는 파일일 뿐 전체 url을 받을 수는 없다. 
# 해당 django파일로 유입되는 url들은 AppAPI에서 관리하고 있다. 
# 때문에 이 파일을 AppAPI의 urls에 import시켜야 들어온 요청에 대한 request를 받을 수 있다.

from django.urls import path, include
from .views import hello_api, select_quiz

urlpatterns = [
    path("home/", hello_api),
    path("<int:page_num>/", select_quiz)
]
