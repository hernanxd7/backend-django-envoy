from rest_framework import serializers
from .models import Carga
from django.utils.translation import gettext_lazy as _

class CargaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Carga
        fields = '__all__'
        read_only_fields = ('created_at', 'updated_at')
        extra_kwargs = {
            'volumen': {'required': True, 'error_messages': {
                'required': _('El volumen es obligatorio.'),
                'invalid': _('Por favor, ingrese un valor válido para el volumen.'),
                'min_value': _('El volumen debe ser mayor que 0.')
            }},
            'origen': {'required': True, 'error_messages': {
                'required': _('El origen es obligatorio.'),
                'blank': _('El origen no puede estar vacío.')
            }},
            'destino': {'required': True, 'error_messages': {
                'required': _('El destino es obligatorio.'),
                'blank': _('El destino no puede estar vacío.')
            }},
            'fecha_recogida': {'required': True, 'error_messages': {
                'required': _('La fecha de recogida es obligatoria.'),
                'invalid': _('Por favor, ingrese una fecha de recogida válida.')
            }},
            'fecha_entrega': {'required': True, 'error_messages': {
                'required': _('La fecha de entrega es obligatoria.'),
                'invalid': _('Por favor, ingrese una fecha de entrega válida.')
            }}
        }

    def validate(self, data):
        # Validar que la fecha de entrega sea posterior a la fecha de recogida
        if data.get('fecha_entrega') and data.get('fecha_recogida'):
            if data['fecha_entrega'] < data['fecha_recogida']:
                raise serializers.ValidationError({
                    'fecha_entrega': _('La fecha de entrega debe ser posterior a la fecha de recogida')
                })

        # Validar que el volumen sea un número positivo
        if data.get('volumen') is not None and data['volumen'] <= 0:
            raise serializers.ValidationError({
                'volumen': _('El volumen debe ser mayor que 0')
            })

        return data