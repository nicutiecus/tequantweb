from django.db import models

#Teacher model
class Teacher(models.Model):
    full_name= models.CharField(max_length=200)
    email = models.CharField(max_length=200)
    password = models.CharField(max_length=200)
    role = models.CharField(default="null", max_length=200)
    bio = models.TextField(default="no bio yet")
    image = models.CharField(default="no pic yet", max_length=225)

    def __str__(self):
        return self.full_name


class CourseCategory(models.Model):
    title= models.CharField(max_length=200)
    description = models.TextField()

    def __str__(self):
        return self.title

    class Meta:
        verbose_name_plural = "Course Categories"


class Course(models.Model):
    category = models.ForeignKey(CourseCategory, on_delete=models.CASCADE)
    title= models.CharField(max_length=200)
    description = models.TextField()
    teacher = models.ForeignKey(Teacher, on_delete=models.CASCADE)
    featured_img = models.ImageField(upload_to='course_imgs/', null=True) 

class Student(models.Model):
    full_name= models.CharField(max_length=200)
    email = models.CharField(max_length=200)
    password = models.CharField(max_length=200)
    interested_categories = models.TextField()

class Module(models.Model):
    title = models.CharField(max_length=225)
    course = models.ForeignKey(Course, on_delete=models.CASCADE)
    order = models.PositiveIntegerField(default="0")

class Topic(models.Model):
    title = models.CharField(max_length=225)
    module = models.ForeignKey(Module, on_delete=models.CASCADE)
    note = models.TextField()
    video = models.URLField()

# --- Assessment Models ---
class Exam(models.Model):
    course = models.ForeignKey(Course, related_name='exams', on_delete=models.CASCADE)
    title = models.CharField(max_length=200)
    duration_minutes = models.IntegerField()
    
class Question(models.Model):
    exam = models.ForeignKey(Exam, related_name='questions', on_delete=models.CASCADE)
    text = models.TextField()
    # Simplified options structure; could be a separate model
    option_a = models.CharField(max_length=200)
    option_b = models.CharField(max_length=200)
    option_c = models.CharField(max_length=200)
    option_d = models.CharField(max_length=200)
    correct_option = models.CharField(max_length=1, choices=[('A','A'), ('B','B'), ('C','C'), ('D','D')])