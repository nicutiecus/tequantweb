from django.contrib import admin
from django.urls import path, include
from . import views

urlpatterns = [
    path('teacher/',views.TeacherList.as_view()),
    path('teacher/<int:pk>',views.TeacherDetail.as_view()),
    path('teacher_login/',views.teacher_login),
    path('student/',views.StudentList.as_view()),
    path('student/<int:pk>',views.StudentDetail.as_view()),
    path('student_login/',views.student_login),
    path('course/',views.CourseList.as_view())
]
