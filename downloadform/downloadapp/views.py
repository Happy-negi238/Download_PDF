from django.shortcuts import render
from django.http import HttpResponse , JsonResponse
from downloadapp.models import contactEnquiry
from downloadapp.models import pdfData
from datetime import date

# Create your views here.

today = date.today()
# print(latest_record.id + 1)
# latest_record = None
latest_record = pdfData.objects.order_by('-id').first()
def readval(request):
    # print(latest_record)
    place = "07-Delhi"
    select = request.POST.get('select')
    text = request.POST.get('text')
    # estimate = request.POST.get('estimate')
    estimate = latest_record.id + 1
    # date = request.POST.get('date')
    # place = request.POST.get('place')

    if select == '1':
        select = "Do it certain"
    elif select == "2":
        select = "certificate"

    data = pdfData(selectPdf=select, fullName=text, estimateNum=estimate, currentDate=today, placeField=place)
    data.save()

    return JsonResponse({'status': 'success', 'message': 'Data saved successfully!'})
        

def homepage(request):

    latest_record = pdfData.objects.order_by('-id').first()
    context = {
        'latest': latest_record.id + 1
    }

    return render(request,'index.html', context)

# def get_data(request):
#     my_data = contactEnquiry.objects.all()
    # return render(request, 'pdf.html', {'my_data':my_data})