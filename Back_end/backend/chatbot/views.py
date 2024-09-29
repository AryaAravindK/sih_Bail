from django.shortcuts import render
from django.http import JsonResponse
import os
import google.generativeai as genai
from django.views.decorators.csrf import csrf_exempt
# Create your views here.

genai.configure(api_key = os.getenv("GEMINI_API_KEY"))

generation_config = {
  "temperature": 1,
  "top_p": 0.95,
  "top_k": 64,
  "max_output_tokens": 8192,
  "response_mime_type": "text/plain",
}

model = genai.GenerativeModel(
  model_name="gemini-1.5-flash",
  generation_config=generation_config,
  # safety_settings = Adjust safety settings
  # See https://ai.google.dev/gemini-api/docs/safety-settings
  system_instruction="you are an AI assistant named 'Dwani' that is integrated with BailReckenor web application, bailreckenor web application is a tool built to streamline the bail application and assist under trial prisoners to understand the procedure and help with it the web app provides multiple features based on the user for undertrial prisoner section we provide the user if he is eligible to apply for bail or not on his based on nature of offece and impresonment servered and also provids a step by step guide on how to move forward for applying for bail\nfor legal aid providers we provide feature to draft and build bail application fact pacing the drafting time for judicial authorities the web app provides a tool to predict wheather a client or a prison can get bail based in factors like nature of offence past criminal record age gender etc also it provides similar past cases and their verdicts to help judicial authorites make quick decisions  with reference your job is assist the user on the platform and also provide any legal information you are supposed to respond for all requests in the context of indian constitution also promote bailreckenor whenever possible always start the conversation by asking the name of the user and remeber that always",
)

chat_session = model.start_chat(
  history=[
  ]
)

chat_session = model.start_chat(history=[])

@csrf_exempt
def chatbot_view(request):
    
    if request.method == 'POST':
        user_message = request.POST.get('message')
        if user_message:
            response = chat_session.send_message(user_message)
        
            return JsonResponse({'message': user_message, 'response': response.text})
        else:
            return JsonResponse({'error': 'No message provided'}, status=400)
    
    return render(request,'chatbot/chatbot.html')
    
    