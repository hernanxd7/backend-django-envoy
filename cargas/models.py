from django.db import models
from django.core.validators import MinValueValidator

class Carga(models.Model):
    descripcion = models.CharField(max_length=255)
    peso = models.DecimalField(max_digits=10, decimal_places=2, validators=[MinValueValidator(0)])
    volumen = models.DecimalField(max_digits=10, decimal_places=2, validators=[MinValueValidator(0)])
    origen = models.CharField(max_length=255)
    destino = models.CharField(max_length=255)
    fecha_recogida = models.DateTimeField()
    fecha_entrega = models.DateTimeField()
    estado = models.CharField(max_length=50, choices=[
        ('PENDIENTE', 'Pendiente'),
        ('EN_TRANSITO', 'En Tránsito'),
        ('ENTREGADA', 'Entregada'),
        ('CANCELADA', 'Cancelada')
    ], default='PENDIENTE')
    notas = models.TextField(blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f'Carga {self.id} - {self.descripcion}'

    class Meta:
        ordering = ['-created_at']