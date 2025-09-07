import os
from dotenv import load_dotenv
from rest_framework.views import APIView
from rest_framework.response import Response
from openai import OpenAI

load_dotenv()
client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))

class ChatbotView(APIView):
    def post(self, request):
        user_message = request.data.get("message", "")

        response = client.chat.completions.create(
            model="gpt-4o-mini",
            messages=[
                {"role": "system", "content": "You are a helpful AI assistant like ChatGPT."},
                {"role": "user", "content": user_message}
            ],
            max_tokens=200
        )

        reply = response.choices[0].message.content.strip()
        return Response({"reply": reply})
