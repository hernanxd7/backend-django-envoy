from rest_framework import viewsets, filters, status
from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import action
from rest_framework.response import Response
from django_filters.rest_framework import DjangoFilterBackend
from .models import Transporte
from .serializers import TransporteSerializer
from datetime import date, timedelta

class TransporteViewSet(viewsets.ModelViewSet):
    queryset = Transporte.objects.all()
    serializer_class = TransporteSerializer
    permission_classes = [IsAuthenticated]
    filter_backends = [DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter]
    filterset_fields = ['estado', 'tipo_vehiculo', 'conductor']
    search_fields = ['matricula', 'marca', 'modelo']
    ordering_fields = ['created_at', 'kilometraje', 'año']
    ordering = ['-created_at']

    @action(detail=False, methods=['get'])
    def disponibles(self, request):
        transportes = self.queryset.filter(estado='DISPONIBLE')
        serializer = self.get_serializer(transportes, many=True)
        return Response(serializer.data)

    @action(detail=False, methods=['get'])
    def mantenimiento_pendiente(self, request):
        # Obtener vehículos que no han tenido mantenimiento en los últimos 6 meses
        seis_meses_atras = date.today() - timedelta(days=180)
        transportes = self.queryset.filter(
            models.Q(fecha_ultimo_mantenimiento__lt=seis_meses_atras) |
            models.Q(fecha_ultimo_mantenimiento__isnull=True)
        )
        serializer = self.get_serializer(transportes, many=True)
        return Response(serializer.data)

    @action(detail=True, methods=['post'])
    def registrar_mantenimiento(self, request, pk=None):
        transporte = self.get_object()
        transporte.fecha_ultimo_mantenimiento = date.today()
        transporte.estado = 'DISPONIBLE'
        transporte.save()
        serializer = self.get_serializer(transporte)
        return Response(serializer.data)

    def perform_create(self, serializer):
        if 'matricula' in serializer.validated_data:
            serializer.validated_data['matricula'] = serializer.validated_data['matricula'].upper()
        serializer.save()