from django.contrib import admin
from downloadapp.models import contactEnquiry
from downloadapp.models import pdfData
# Register your models here.

class contactEnquiryAdmin(admin.ModelAdmin):
    list_display=("name","email","age")

class pdfDataAdmin(admin.ModelAdmin):
    list_display = ("selectPdf", "fullName", "estimateNum", "currentDate", "placeField")

admin.site.register(contactEnquiry,contactEnquiryAdmin)
admin.site.register(pdfData, pdfDataAdmin)
