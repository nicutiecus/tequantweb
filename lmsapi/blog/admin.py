from django.contrib import admin
from .models import Post, Category, Comment, Profile

# 1. Register Category
@admin.register(Category)
class CategoryAdmin(admin.ModelAdmin):
    list_display = ('title',)
    search_fields = ('title',)

# 2. Register Post with extra features
@admin.register(Post)
class PostAdmin(admin.ModelAdmin):
    list_display = ('title', 'slug', 'author', 'publish', 'status')
    list_filter = ('status', 'created', 'publish', 'author')
    search_fields = ('title', 'body')
    prepopulated_fields = {'slug': ('title',)} # Auto-fill slug from title
    raw_id_fields = ('author',)
    date_hierarchy = 'publish'
    ordering = ('status', 'publish')

# 3. Register Comment
@admin.register(Comment)
class CommentAdmin(admin.ModelAdmin):
    list_display = ('author', 'post', 'created_at', 'content')
    list_filter = ('created_at',)
    search_fields = ('content', 'author__username', 'post__title')

# 4. Register Profile
admin.site.register(Profile)