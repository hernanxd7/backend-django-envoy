from rest_framework import viewsets, filters, status
from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import action
from rest_framework.response import Response
from django_filters.rest_framework import DjangoFilterBackend
from .models import Conductor
from .serializers import ConductorSerializer
from datetime import date, timedelta  # Añadido timedelta que faltaba
from rest_framework.permissions import AllowAny

class ConductorViewSet(viewsets.ModelViewSet):
    queryset = Conductor.objects.all()
    serializer_class = ConductorSerializer
    permission_classes = [AllowAny]
    filter_backends = [DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter]
    # Corregimos el campo filterset_fields para usar solo campos que existen en el modelo
    filterset_fields = ['estado']  # Quitamos 'tipo_licencia' que no existe en el modelo
    search_fields = ['nombre', 'apellidos', 'dni', 'numero_licencia', 'email']
    ordering_fields = ['apellidos', 'nombre', 'created_at', 'años_experiencia']
    ordering = ['apellidos', 'nombre']

    @action(detail=False, methods=['get'])
    def licencias_por_vencer(self, request):
        # Obtener conductores con licencias que vencen en los próximos 30 días
        treinta_dias = date.today() + timedelta(days=30)
        conductores = self.queryset.filter(
            fecha_vencimiento_licencia__lte=treinta_dias,
            fecha_vencimiento_licencia__gte=date.today()
        )
        serializer = self.get_serializer(conductores, many=True)
        return Response(serializer.data)

    @action(detail=False, methods=['get'])
    def activos(self, request):
        conductores = self.queryset.filter(estado='ACTIVO')
        serializer = self.get_serializer(conductores, many=True)
        return Response(serializer.data)

    def perform_create(self, serializer):
        # Convertir datos a mayúsculas antes de guardar
        if 'dni' in serializer.validated_data:
            serializer.validated_data['dni'] = serializer.validated_data['dni'].upper()
        if 'numero_licencia' in serializer.validated_data:
            serializer.validated_data['numero_licencia'] = serializer.validated_data['numero_licencia'].upper()
        serializer.save()