import struct
import os
import requests
import numpy as np
from django.conf import settings


class EmbeddingService:
    def __init__(self):
        self.base_url = settings.OLLAMA_URL
        self.model = settings.OLLAMA_EMBEDDING_MODEL

    def create_embedding(self, text):
        try:
            response = requests.post(
                f"{self.base_url}/api/embed",
                json={"model": self.model, "prompt": text},
                timeout=30,
            )
            response.raise_for_status()
            data = response.json()
            return np.array(data.get("embedding", []), dtype=np.float32)
        except Exception as e:
            raise RuntimeError(f"Failed to generate embedding: {e}")

    def serialize(self, embedding):
        return embedding.tobytes()

    def deserialize(self, data):
        return np.frombuffer(data, dtype=np.float32)

    def cosine_similarity(self, a, b):
        if len(a) == 0 or len(b) == 0:
            return 0.0
        dot = float(np.dot(a, b))
        norm_a = float(np.linalg.norm(a))
        norm_b = float(np.linalg.norm(b))
        if norm_a == 0 or norm_b == 0:
            return 0.0
        return dot / (norm_a * norm_b)
