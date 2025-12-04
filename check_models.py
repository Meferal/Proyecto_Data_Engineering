import google.generativeai as genai
import os
from dotenv import load_dotenv

# Cargar variables de entorno
load_dotenv()

api_key = os.getenv("GEMINI_API_KEY")

if not api_key:
    print("❌ Error: No se encontró la GEMINI_API_KEY en el archivo .env")
else:
    print(f"✅ API Key encontrada: {api_key[:5]}...*****")

    try:
        genai.configure(api_key=api_key)

        print("\n🔍 Consultando a Google los modelos disponibles para tu clave...")
        print("-" * 50)

        # Listar modelos
        found = False
        for m in genai.list_models():
            # Filtramos solo los que sirven para generar texto (generateContent)
            if 'generateContent' in m.supported_generation_methods:
                print(f"👉 Nombre válido: {m.name}")
                found = True

        if not found:
            print("⚠️ No se encontraron modelos de generación. Revisa si tu API Key es válida.")

    except Exception as e:
        print(f"❌ Error de conexión: {e}")
