from rest_framework import viewsets, filters
from rest_framework.permissions import AllowAny
from django_filters.rest_framework import DjangoFilterBackend
from .models import Carga
from .serializers import CargaSerializer

class CargaViewSet(viewsets.ModelViewSet):
    queryset = Carga.objects.all()
    serializer_class = CargaSerializer
    permission_classes = [AllowAny]
    filter_backends = [DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter]
    filterset_fields = ['estado', 'origen', 'destino']
    search_fields = ['descripcion', 'origen', 'destino', 'notas']
    ordering_fields = ['fecha_recogida', 'fecha_entrega', 'created_at', 'updated_at']
    ordering = ['-created_at']