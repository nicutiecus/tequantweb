from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import generics, permissions
from .serializers import CohortWaitListSerializer
from . import models

# Create your views here.


class CohortWaitList(generics.ListCreateAPIView):
    queryset = models.CohortWaitList.objects.all()
    serializer_class = CohortWaitListSerializer
    #permission_classes = [permissions.IsAuthenticated]