from rest_framework import viewsets, filters, status
from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import action
from rest_framework.response import Response
from django_filters.rest_framework import DjangoFilterBackend
from .models import Vendedor
from .serializers import VendedorSerializer
from datetime import date

class VendedorViewSet(viewsets.ModelViewSet):
    queryset = Vendedor.objects.all()
    serializer_class = VendedorSerializer
    permission_classes = [IsAuthenticated]
    filter_backends = [DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter]
    filterset_fields = ['estado', 'zona_asignada']
    search_fields = ['nombre', 'apellidos', 'dni', 'email', 'zona_asignada']
    ordering_fields = ['apellidos', 'nombre', 'created_at', 'objetivo_ventas_mensual']
    ordering = ['apellidos', 'nombre']

    @action(detail=False, methods=['get'])
    def activos(self, request):
        vendedores = self.queryset.filter(estado='ACTIVO')
        serializer = self.get_serializer(vendedores, many=True)
        return Response(serializer.data)

    @action(detail=False, methods=['get'])
    def por_zona(self, request):
        zona = request.query_params.get('zona', None)
        if zona is None:
            return Response(
                {'error': 'Debe especificar una zona'},
                status=status.HTTP_400_BAD_REQUEST
            )
        vendedores = self.queryset.filter(zona_asignada=zona)
        serializer = self.get_serializer(vendedores, many=True)
        return Response(serializer.data)

    def perform_create(self, serializer):
        # Convertir datos a mayúsculas antes de guardar
        if 'dni' in serializer.validated_data:
            serializer.validated_data['dni'] = serializer.validated_data['dni'].upper()
        serializer.save()