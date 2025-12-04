from django.contrib import admin
from django.urls import path, include


urlpatterns = [
    path('admin/', admin.site.urls),
    path('lmsapi/', include('main.urls')),
    path('api-auth', include('rest_framework.urls')),
    path('blogapi/', include('blog.urls')),
    path('tequantweb/', include('tequantweb.urls')),
    path('marketing/', include('marketing.urls'))
    
]
