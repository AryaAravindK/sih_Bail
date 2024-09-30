from django.http import JsonResponse
import os
import google.generativeai as genai
from django.views.decorators.csrf import csrf_exempt
from django.shortcuts import render


# Configure API key for the generative model
genai.configure(api_key="AIzaSyAsCl5-BHlEcBwyPgLIKiMRWiG3jpPK_vM")

# Define generation configuration
generation_config = {
    "temperature": 1,
    "top_p": 0.95,
    "top_k": 64,
    "max_output_tokens": 1000,
    "response_mime_type": "text/plain",
}

# Initialize the chatbot model
model = genai.GenerativeModel(
    model_name="gemini-1.5-flash",
    generation_config=generation_config,
    system_instruction="you are an AI assistant named 'Dwani' that is integrated with BailReckenor web application, bailreckenor web application is a tool built to streamline the bail application and assist under trial prisoners to understand the procedure and help with it the web app provides multiple features based on the user for undertrial prisoner section we provide the user if he is eligible to apply for bail or not on his based on nature of offece and impresonment servered and also provids a step by step guide on how to move forward for applying for bail for legal aid providers we provide feature to draft and build bail application fact pacing the drafting time for judicial authorities the web app provides a tool to predict wheather a client or a prison can get bail based in factors like nature of offence past criminal record age gender etc also it provides similar past cases and their verdicts to help judicial authorites make quick decisions  with reference your job is assist the user on the platform and also provide any legal information you are supposed to respond for all requests in the context of indian constitution also promote bailreckenor whenever possible",
)

# Start a chat session
chat_session = model.start_chat(history=[])

@csrf_exempt  # Disable CSRF protection for testing; in production, handle CSRF properly
def chatbot_view(request):
    if request.method == 'POST':
        user_message = request.POST.get('message')
        if user_message:
            response = chat_session.send_message(user_message)
            # Return a JSON response with the user's message and chatbot's response
            return JsonResponse({'message': user_message, 'response': response.text})
        else:
            return JsonResponse({'error': 'No message provided'}, status=400)

    # Render the chatbot template for GET requests
    return render(request, 'chatbot/chatbot.html')
