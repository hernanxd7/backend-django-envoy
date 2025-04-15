from rest_framework import viewsets
from .models import ResearchPaper
from .serializers import ResearchPaperSerializer

class ResearchPaperViewSet(viewsets.ModelViewSet):
    queryset = ResearchPaper.objects.all()
    serializer_class = ResearchPaperSerializer