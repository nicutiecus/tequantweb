from django.urls import path
from . import views
from rest_framework_simplejwt.views import (TokenObtainPairView, TokenRefreshView)

urlpatterns = [
    # Auth
    path('register/', views.RegisterView.as_view(), name='auth_register'),
    path('token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),

    # Profiles and Author posts
    path('authors/<str:username>/', views.ProfileDetailView.as_view(), name='author_profile'),
    path('authors/<str:username>/posts/', views.AuthorPostListView.as_view(), name='author_posts'),

    # Posts
    path('posts/', views.StaffPostListCreateView.as_view(), name='post_list'),
    path('posts/<slug:slug>/', views.PostDetailView.as_view(), name='post_detail'),
 
    #categories
    path('categories/',views.CategoryListView.as_view()),

    # Comments
    path('posts/<slug:slug>/comments/', views.CommentListView.as_view(), name='comment_list'),
    path('comments/<int:pk>/', views.CommentDetailView.as_view(), name='comment_detail'),
]
