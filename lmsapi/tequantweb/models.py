from django.db import models

# Create your models here.

#Cohort waitlist
class CohortWaitList(models.Model):
    full_name= models.CharField(max_length=225)
    email= models.CharField(max_length=225)
    interested_course=models.CharField(max_length=225)
    time = models.DateField(auto_now_add=True)
