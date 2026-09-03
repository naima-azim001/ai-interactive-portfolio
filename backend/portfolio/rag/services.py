import requests
from django.conf import settings


class LLMService:
    def __init__(self):
        self.base_url = settings.OLLAMA_URL
        self.model = settings.OLLAMA_MODEL

    def generate(self, system_prompt, user_prompt):
        try:
            response = requests.post(
                f"{self.base_url}/api/generate",
                json={
                    "model": self.model,
                    "system": system_prompt,
                    "prompt": user_prompt,
                    "stream": False,
                },
                timeout=60,
            )
            response.raise_for_status()
            data = response.json()
            return data.get("response", "").strip()
        except requests.exceptions.ConnectionError:
            raise RuntimeError("Ollama is not running. Please start Ollama with 'ollama serve'.")
        except Exception as e:
            raise RuntimeError(f"LLM generation failed: {e}")
