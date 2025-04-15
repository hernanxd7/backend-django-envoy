from rest_framework import viewsets
from .models import Citation
from .serializers import CitationSerializer
from rest_framework.permissions import IsAuthenticated

class CitationViewSet(viewsets.ModelViewSet):
    queryset = Citation.objects.all()
    serializer_class = CitationSerializer
    permission_classes = [IsAuthenticated]
