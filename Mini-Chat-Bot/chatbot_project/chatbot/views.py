import os
from dotenv import load_dotenv
from openai import OpenAI, OpenAIError
from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView

load_dotenv()

OLLAMA_URL = os.getenv("OLLAMA_URL")
OLLAMA_API_KEY = os.getenv("OLLAMA_API_KEY")
MODEL = os.getenv("OLLAMA_MODEL")

client = OpenAI(base_url=OLLAMA_URL, api_key=OLLAMA_API_KEY, timeout=120)

SYSTEM_PROMPT = "You are Deepak-GPT, a helpful coding assistant. Use markdown and fenced code blocks."
MAX_HISTORY = 10


class ChatbotView(APIView):
    def post(self, request):
        user_message = (request.data.get("message") or "").strip()
        if not user_message:
            return Response({"error": "Message is required."},
                            status=status.HTTP_400_BAD_REQUEST)

        messages = [{"role": "system", "content": SYSTEM_PROMPT}]

        history = request.data.get("history") or []
        if isinstance(history, list):
            for m in history[-MAX_HISTORY:]:
                if (
                    isinstance(m, dict)
                    and m.get("role") in ("user", "assistant")
                    and isinstance(m.get("content"), str)
                ):
                    messages.append({"role": m["role"], "content": m["content"]})

        messages.append({"role": "user", "content": user_message})

        try:
            response = client.chat.completions.create(
                model=MODEL,
                messages=messages,
                max_tokens=800,
            )
        except OpenAIError as e:
            return Response(
                {"error": f"Ollama error: {e}. Is Ollama running and is the model pulled?"},
                status=status.HTTP_502_BAD_GATEWAY,
            )

        reply = (response.choices[0].message.content or "").strip()
        return Response({"reply": reply})