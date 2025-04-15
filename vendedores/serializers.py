from rest_framework import serializers
from .models import Vendedor
from datetime import date

class VendedorSerializer(serializers.ModelSerializer):
    class Meta:
        model = Vendedor
        fields = '__all__'
        read_only_fields = ('created_at', 'updated_at')

    def validate_fecha_contratacion(self, value):
        if value > date.today():
            raise serializers.ValidationError('La fecha de contratación no puede ser futura')
        return value

    def validate_porcentaje_comision(self, value):
        if value < 0 or value > 100:
            raise serializers.ValidationError('El porcentaje de comisión debe estar entre 0 y 100')
        return value

    def validate_objetivo_ventas_mensual(self, value):
        if value < 0:
            raise serializers.ValidationError('El objetivo de ventas mensual no puede ser negativo')
        return value

    def validate_dni(self, value):
        # Eliminar espacios en blanco
        value = value.replace(' ', '')
        # Verificar que el DNI tenga el formato correcto (8 números y una letra)
        if not (len(value) == 9 and value[:-1].isdigit() and value[-1].isalpha()):
            raise serializers.ValidationError('El DNI debe tener 8 números seguidos de una letra')
        return value.upper()

    def validate_telefono(self, value):
        # Eliminar espacios y guiones
        value = value.replace(' ', '').replace('-', '')
        if not value.isdigit():
            raise serializers.ValidationError('El número de teléfono solo debe contener dígitos')
        return value