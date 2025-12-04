from rest_framework import generics, permissions
from django.contrib.auth.models import User
from .models import Profile, Post, Comment, Category
from .serializers import ProfileSerializer, PostSerializer, CommentSerializer, RegisterSerializer, UserSerializer, CategorySerializer
from rest_framework.permissions import IsAuthenticatedOrReadOnly, IsAuthenticated
from .permissions import IsOwnerOrReadOnly

class RegisterView(generics.CreateAPIView):
    queryset = User.objects.all()
    permission_classes = (permissions.AllowAny,)
    serializer_class = RegisterSerializer

class ProfileDetailView(generics.RetrieveUpdateAPIView):
    queryset = Profile.objects.all()
    serializer_class = ProfileSerializer
    permission_classes = [IsOwnerOrReadOnly]

    def get_object(self):
        """
        Returns the profile of the user specified by the username in the URL.
        """
        username = self.kwargs.get('username')
        user = generics.get_object_or_404(User, username=username)
        return generics.get_object_or_404(Profile, user=user)

class AuthorPostListView(generics.ListAPIView):
    serializer_class = PostSerializer
    
    def get_queryset(self):
        username = self.kwargs.get('username')
        user = generics.get_object_or_404(User, username=username)
        return Post.objects.filter(author=user).order_by('-created')

class PostListView(generics.ListCreateAPIView):
    queryset = Post.objects.all().order_by('-created')
    serializer_class = PostSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]

    def perform_create(self, serializer):
        serializer.save(author=self.request.user)

class PostDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Post.objects.all()
    serializer_class = PostSerializer
    permission_classes = [IsOwnerOrReadOnly]
    lookup_field = 'slug'

class CommentListView(generics.ListCreateAPIView):
    queryset = Comment.objects.all()
    serializer_class = CommentSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]

    def get_queryset(self):
        post_slug = self.kwargs.get('slug')
        post = generics.get_object_or_404(Post, slug=post_slug)
        return Comment.objects.filter(post=post).order_by('-created')

    def perform_create(self, serializer):
        post_slug = self.kwargs.get('slug')
        post = generics.get_object_or_404(Post, slug=post_slug)
        serializer.save(author=self.request.user, post=post)

class CommentDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Comment.objects.all()
    serializer_class = CommentSerializer
    permission_classes = [IsOwnerOrReadOnly]

class CategoryListView(generics.ListCreateAPIView):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer
