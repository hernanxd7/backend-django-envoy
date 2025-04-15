from rest_framework import viewsets
from .models import AcademicJournal
from .serializers import AcademicJournalSerializer
from rest_framework.permissions import IsAuthenticated

class AcademicJournalViewSet(viewsets.ModelViewSet):
    queryset = AcademicJournal.objects.all()
    serializer_class = AcademicJournalSerializer
    permission_classes = [IsAuthenticated]
