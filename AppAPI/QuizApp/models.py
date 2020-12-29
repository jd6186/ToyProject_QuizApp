from django.db import models

# Create your models here.
class QuizApp(models.Model):
    title = models.TextField()
    first_image = models.TextField()
    second_image = models.TextField()
    first_name = models.TextField()
    second_name = models.TextField()
