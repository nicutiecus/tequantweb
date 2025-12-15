from django.contrib import admin
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from . import views 
from django.urls import path, include


router = DefaultRouter()
router.register(r'courses', views.CourseViewSet)
router.register(r'modules', views.ModuleViewSet) # Assuming you have these
router.register(r'topics', views.TopicViewSet)   # Assuming you have these




urlpatterns = [
    path('', include(router.urls)),
    path('teacher/',views.TeacherList.as_view()),
    path('teacher/<int:pk>',views.TeacherDetail.as_view()),
    path('teacher_login/',views.teacher_login),
    path('student/',views.StudentList.as_view()),
    path('student/<int:pk>',views.StudentDetail.as_view()),
    path('student_login/',views.student_login),
    path('course/',views.CourseList.as_view()),
    path('enrollment/',views.EnrollmentView.as_view())
    
]
