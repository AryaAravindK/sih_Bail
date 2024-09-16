from django.shortcuts import render
from django.http import HttpResponse
from .models import Offences

# Create your views here.

def home(request):
    return render(request,'home.html')


def eligibility(request):
    offences = Offences.objects.all()
    return render(request,'eligibility.html',{'offences':offences})