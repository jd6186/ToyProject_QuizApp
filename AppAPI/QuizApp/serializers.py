from rest_framework import serializers
from .models import QuizApp

# serializer라는 것은 rest_framework의 내장 메서드의 하나로 
# 전달되는 model데이터를 Json형태로 바꾸어 성능을 향상시키기 위해 사용된다.
class QuizAppSerialize(serializers.ModelSerializer):
    class Meta:
        model = QuizApp
        fields = ('title', 'first_image', 'second_image', 'first_name', 'second_name')