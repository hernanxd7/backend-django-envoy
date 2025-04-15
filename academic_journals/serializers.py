from rest_framework import serializers
from .models import AcademicJournal

class AcademicJournalSerializer(serializers.ModelSerializer):
    class Meta:
        model = AcademicJournal
        fields = '__all__'