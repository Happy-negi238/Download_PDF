from django.db import models

# Create your models here.

class contactEnquiry(models.Model):
    name= models.CharField(max_length=50)
    email= models.CharField(max_length=50)
    age= models.IntegerField()

class pdfData(models.Model):
    selectPdf = models.TextField()
    fullName = models.CharField(max_length=50)
    estimateNum = models.IntegerField()
    currentDate = models.DateField()
    placeField = models.CharField(max_length=50)
 