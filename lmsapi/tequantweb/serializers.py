from rest_framework import serializers
from django.contrib.auth.models import User
from . import models

class CohortWaitListSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.CohortWaitList
        fields = ['id','full_name','email','interested_course', 'time']