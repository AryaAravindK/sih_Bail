from django.db import models

# Create your models here.


class Offences(models.Model):
    title = models.CharField(max_length=100 )
    penal_code = models.CharField(max_length=10)
    max_penalty = models.CharField(max_length=255)
    min_penalty = models.CharField(max_length=255)
    bailable = models.BooleanField()
    compoundable = models.BooleanField()
    

    def __str__(self):
        return f"{self.penal_code} - {self.title}"
    
