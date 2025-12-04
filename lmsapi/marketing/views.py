from django.shortcuts import render
from rest_framework import viewsets
from .models import Lead, ScheduledEmail
from .serializers import LeadSerializer, ScheduledEmailSerializer # Assuming you create basic DRF serializers

class LeadViewSet(viewsets.ModelViewSet):
    queryset = Lead.objects.all().order_by('-created_at')
    serializer_class = LeadSerializer

class CalendarViewSet(viewsets.ReadOnlyModelViewSet):
    """
    Returns emails scheduled for the future so the admin can see the 'Calendar'
    """
    queryset = ScheduledEmail.objects.filter(is_sent=False).order_by('scheduled_date')
    serializer_class = ScheduledEmailSerializer