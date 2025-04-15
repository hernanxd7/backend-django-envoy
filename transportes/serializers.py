from rest_framework import serializers
from .models import Transporte
from conductores.serializers import ConductorSerializer
from datetime import date

class TransporteSerializer(serializers.ModelSerializer):
    conductor_details = ConductorSerializer(source='conductor', read_only=True)

    class Meta:
        model = Transporte
        fields = '__all__'
        read_only_fields = ('created_at', 'updated_at')

    def validate_matricula(self, value):
        # Eliminar espacios y convertir a mayúsculas
        value = value.replace(' ', '').upper()
        # Verificar formato de matrícula española (0000XXX)
        if not (len(value) == 7 and value[:4].isdigit() and value[4:].isalpha()):
            raise serializers.ValidationError('Formato de matrícula inválido. Debe ser 4 números seguidos de 3 letras')
        return value

    def validate_año(self, value):
        if value < 1900 or value > date.today().year:
            raise serializers.ValidationError('Año inválido')
        return value

    def validate_kilometraje(self, value):
        if value < 0:
            raise serializers.ValidationError('El kilometraje no puede ser negativo')
        return value

    def validate_fecha_ultimo_mantenimiento(self, value):
        if value and value > date.today():
            raise serializers.ValidationError('La fecha de último mantenimiento no puede ser futura')
        return value

    def validate(self, data):
        # Validar que si el estado es EN_RUTA, debe tener un conductor asignado
        if data.get('estado') == 'EN_RUTA' and not data.get('conductor'):
            raise serializers.ValidationError({
                'conductor': 'Un transporte en ruta debe tener un conductor asignado'
            })
        return data