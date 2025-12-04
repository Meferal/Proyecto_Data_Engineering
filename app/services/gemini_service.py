import google.generativeai as genai
from app.core.config import settings
import textwrap

# Configuramos una sola vez al cargar el módulo
genai.configure(api_key=settings.GEMINI_API_KEY)
model = genai.GenerativeModel('models/gemini-2.5-pro')


def generar_receta_ia(ingredientes: str) -> str:
    """
    Envía el prompt a Gemini y devuelve solo el texto.
    """
    try:
        prompt = textwrap.dedent(f"""
        Quiero que actúes como un generador experto de recetas domésticas.
        Te daré una lista de ingredientes {ingredientes} disponibles y
        tú debes crear la mejor receta viable para una cocina doméstica,
        optimizada para sabor, facilidad y realismo.

        Instrucciones obligatorias:
        La receta debe ser realista y ejecutable en casa.
        No des información de más, aporta solo el nombre de la receta,
        los ingredientes y los pasos de elaboración.
        Antes de empezar con los pasos indica los utensilios necesarios
        y el nivel de dificultad de la receta.
        No hace falta que la receta incluya todos los ingredientes,
        se pueden dejar ingredientes sin usar.
        Incluye únicamente ingredientes que te proporcionaré, pero puedes
        añadir ingredientes extra básicos
        (ej.: sal, aceite, especias comunes).
        """).strip()
        response = model.generate_content(prompt)
        return response.text
    except Exception as e:
        return f"Error al contactar con la IA: {str(e)}"
