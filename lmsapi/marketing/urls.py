from django.contrib import admin
from django.urls import path, include
from . import views
from rest_framework.routers import DefaultRouter

# Create a router and register our viewsets with it.
router = DefaultRouter()
router.register(r'leads', views.LeadViewSet, basename='leads')
router.register(r'calendar', views.CalendarViewSet, basename='calendar')

urlpatterns = [
    path('', include(router.urls)),
]
