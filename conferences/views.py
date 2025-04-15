from rest_framework import viewsets
from .models import Conference
from .serializers import ConferenceSerializer
from rest_framework.permissions import IsAuthenticated

class ConferenceViewSet(viewsets.ModelViewSet):
    queryset = Conference.objects.all()
    serializer_class = ConferenceSerializer
    permission_classes = [IsAuthenticated]
