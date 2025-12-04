<div align="center">

# 👨‍🍳 Chef IA: Generador de Recetas Inteligente

![Python](https://img.shields.io/badge/Python-3.11-blue?logo=python&logoColor=white)
![FastAPI](https://img.shields.io/badge/Backend-FastAPI-009688?logo=fastapi&logoColor=white)
![Next.js](https://img.shields.io/badge/Frontend-Next.js-black?logo=next.js&logoColor=white)
![Docker](https://img.shields.io/badge/Deploy-Docker-2496ED?logo=docker&logoColor=white)
![Gemini](https://img.shields.io/badge/AI-Google%20Gemini-8E75B2?logo=google&logoColor=white)
![License](https://img.shields.io/badge/License-MIT-yellow)

**Sistema Full Stack para la generación de recetas mediante Inteligencia Artificial Generativa.**
**Arquitectura de microservicios contenerizada.**

[Ver Documentación](http://localhost:8000/docs) • [Reportar Bug](https://github.com/meferal/proyecto_data_engineering/issues/new?labels=bug) • [Solicitar Feature](https://github.com/meferal/proyecto_data_engineering/issues/new?labels=enhancement)

</div>

---

## 📖 Descripción

Este proyecto consiste en una aplicación completa (**Data Engineer**) que operacionaliza un Modelo de Lenguaje Grande (LLM) para generar recetas de cocina creativas basadas en ingredientes limitados.

El sistema implementa una arquitectura de microservicios contenerizada, con persistencia de datos y una interfaz de usuario moderna, diseñada para ser escalable y desplegable en la nube.

## 🚀 Características Principales

* **Generación con GenAI:** Integración con **Google Gemini 1.5 Pro** para la generación de texto creativo.
* **Arquitectura Desacoplada:** Backend (FastAPI) y Frontend (Next.js) separados.
* **Persistencia de Datos:** Historial de peticiones guardado automáticamente en base de datos SQL mediante **SQLAlchemy**.
* **API REST Documentada:** Endpoints accesibles y documentados automáticamente con Swagger UI.
* **Interfaz Moderna:** Frontend desarrollado con Next.js, Tailwind CSS y renderizado de Markdown.
* **Contenerización:** Imágenes de Docker optimizadas (Multi-stage builds) y orquestación con Docker Compose.

---

## 🛠️ Tech Stack

### Backend
* **Lenguaje:** Python 3.11
* **Framework:** FastAPI
* **ORM:** SQLAlchemy
* **Base de Datos:** SQLite (Entorno Local) / PostgreSQL (Producción)
* **LLM Provider:** Google Generative AI (Gemini)
* **Validación:** Pydantic

### Frontend
* **Framework:** Next.js 14 (App Router)
* **Estilos:** Tailwind CSS v3
* **Lenguaje:** TypeScript
* **Componentes:** React Markdown

### DevOps & Infraestructura
* **Contenedores:** Docker & Docker Compose
* **Nube:** Render

---

## 📂 Estructura del Proyecto

```text
proyecto_data_engineering/
├── app/                        # Lógica del Backend (Python)
│   ├── api/                    # Rutas y controladores
│   ├── core/                   # Configuración y variables de entorno
│   ├── db/                     # Modelos y conexión a Base de Datos
│   ├── services/               # Lógica de conexión con LLMs (Factory Pattern)
│   └── main.py                 # Punto de entrada de la API
├── frontend/                   # Aplicación Web (Next.js)
│   ├── app/                    # Páginas y layout
│   ├── public/                 # Assets estáticos
│   ├── Dockerfile              # Construcción multi-etapa del Frontend
│   └── tailwind.config.ts      # Configuración de estilos
├── Dockerfile                  # Construcción del Backend
├── docker-compose.yml          # Orquestación de servicios
├── requirements.txt            # Dependencias de Python
├── historial.db                # Base de datos donde se almacena el historial de conversación
├── LICENSE                     # Licencia MIT
└── README.md                   # Documentación
```

## ⚡ Guía de Inicio Rápido (Local)  

Prerrequisitos
Docker Desktop instalado y corriendo.

Una API Key de Google Gemini (Gratuita en Google AI Studio).

1. Clonar el repositorio  

```Bash
git clone [https://github.com/Meferal/Proyecto_Data_Engineering.git](https://github.com/Meferal/Proyecto_Data_Engineering.git)
cd proyecto-chef-ia
```

2. Configurar Variables de Entorno
Crea un archivo .env en la raíz del proyecto y añade tu clave:

```Bash
GEMINI_API_KEY=tu_clave_secreta_aqui
LLM_PROVIDER=gemini
```

3. Desplegar con Docker
Ejecuta el siguiente comando para construir y levantar los servicios:

```Bash
docker-compose up --build
```

4. Acceder a la Aplicación

* Frontend (Web): http://localhost:3000

* Backend (Documentación API): http://localhost:8000/docs


## 📡 Documentación de la API  

La API cuenta con los siguientes endpoints principales:

POST /api/generar  
Envía ingredientes y recibe una receta completa.

Body: {"ingredientes": "pollo, arroz, limón"}

Respuesta: JSON con la receta formateada en Markdown.

GET /api/historial
Devuelve el listado de las últimas recetas generadas y guardadas en la base de datos.

## ☁️ Despliegue en Cloud (Render)

Este proyecto está configurado para desplegarse automáticamente en Render.

Backend: Se despliega como un Web Service usando el Dockerfile de la raíz.

Variable de entorno requerida: GEMINI_API_KEY.

Frontend: Se despliega como un Web Service usando el Dockerfile dentro de la carpeta /frontend.

Variable de entorno requerida: NEXT_PUBLIC_API_URL (La URL que Render asigna a tu backend).

## 🧑‍💻 Autores

Proyecto realizado por:

-**Álvaro Medina Fernández [LinkedIn](http://www.linkedin.com/in/álvaro-medinafernández) | [GitHub](https://github.com/Meferal)**  

Bajo la supervisión de **Borja Barber [GitHub](https://github.com/borjabarber)** , *Lead Instructor en The Bridge*.

---

📜 Licencia
Este proyecto se distribuye bajo la licencia MIT. Consulta el archivo LICENSE para más detalles.
