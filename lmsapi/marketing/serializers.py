from rest_framework import serializers
from . import models

class LeadSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Lead
        fields = ['first_name','email','created_at','status']

class ScheduledEmailSerializer(serializers.ModelSerializer):
    lead_email = serializers.EmailField(source='lead.email', read_only=True)

    class Meta:
        model = models.ScheduledEmail
        fields = ['id', 'lead_email', 'subject', 'scheduled_date', 'is_sent']
    

