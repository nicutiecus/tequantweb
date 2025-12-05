from rest_framework import serializers
from . import models

class TeacherSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Teacher
        fields = ['id','full_name','email','password', 'role','bio', 'image']

class StudentSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Student
        fields = ['id','full_name','email','password','interested_categories']

class CourseSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Course
        fields = ['category','title','description','teacher']