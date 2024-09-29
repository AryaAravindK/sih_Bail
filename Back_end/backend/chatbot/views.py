from django.shortcuts import render
from django.http import JsonResponse
import os
import google.generativeai as genai
# Create your views here.

genai.configure(api_key = os.getenv("GEMINI_API_KEY"))


def chatbot_view(request):
    
    if request.method == 'POST':
        user_message = request.POST.get('message')
        
        response = genai.text(message = user_message)
        
        return JsonResponse({'message':user_message,'response':response})
    
    return render(request,'chatbot/chatbot.html')
    
    