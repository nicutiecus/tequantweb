from django.db import models

#Teacher model
class Teacher(models.Model):
    full_name= models.CharField(max_length=200)
    email = models.CharField(max_length=200)
    password = models.CharField(max_length=200)

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

class Topic(models.Model):
    title = models.CharField(max_length=225)
    module = models.ForeignKey(Module, on_delete=models.CASCADE)
    note = models.TextField()
    video = models.CharField(max_length=225)