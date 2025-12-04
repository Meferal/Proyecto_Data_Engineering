import os
from dotenv import load_dotenv

load_dotenv()


class Settings:
    PROJECT_NAME: str = "Chef IA API"
    PROJECT_VERSION: str = "1.0.0"
    GEMINI_API_KEY: str = os.getenv("GEMINI_API_KEY")
    DATABASE_URL: str = "sqlite:///./historial.db"

    def __init__(self):
        if not self.GEMINI_API_KEY:
            # Advertencia: Esto lanzará error si no tienes el .env
            print("⚠️ ADVERTENCIA: No se encontró GEMINI_API_KEY en variables de entorno")


settings = Settings()
