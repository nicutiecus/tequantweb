from django.contrib import admin
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from . import views 
from django.urls import path, include


router = DefaultRouter()
router.register(r'modules', views.ModuleViewSet) # Assuming you have these
router.register(r'topics', views.TopicViewSet)   # Assuming you have these




urlpatterns = [
    path('', include(router.urls)),
    path('teachers/',views.TeacherList.as_view()),
    path('teacher-login/', views.TeacherLoginView.as_view()), # Note the trailing slash
    path('teacher/courses/', views.TeacherCourseList.as_view()),
    path('teacher/students/', views.TeacherStudentList.as_view()),
    path('teacher/<int:pk>',views.TeacherDetail.as_view()),
    path('student/',views.StudentList.as_view()),
    path('student/<int:pk>',views.StudentDetail.as_view()),
    path('student-register/', views.StudentRegistrationView.as_view()),
    path('student_login/',views.StudentLoginView.as_view()),
    path('student/profile/<int:pk>/', views.StudentProfileView.as_view()),
    path('staff_login/',views.StaffLoginView.as_view()),
    path('staff/students/', views.StaffStudentListView.as_view()),
    path('courses/',views.CourseList.as_view()),
    path('courses/<int:pk>',views.CourseDetails.as_view()),
    path('enrollment/',views.EnrollmentView.as_view()),
    #specific course module
    path('course-module/<int:course_id>',views.CourseModuleList.as_view()),
    path('checkout-info/<uuid:enrollment_id>/', views.CheckoutInfoView.as_view()),
    path('verify-payment/', views.VerifyPaymentView.as_view()),
    path('my-courses/<str:email>/', views.MyCoursesList.as_view()),
    

    
    
]
