from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.core.config import settings
from app.db.session import engine
from app.db.models import Base
from app.api.routes import router

# Crear las tablas en la DB al iniciar
Base.metadata.create_all(bind=engine)

app = FastAPI(
    title=settings.PROJECT_NAME,
    version=settings.PROJECT_VERSION
)

origins = [
    "http://localhost:3000",    # Puerto por defecto de React/Next.js
    "http://localhost:8000",
    "*"                      # En producción se debe restringir, pero para dev/demo déjalo en *
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Incluir las rutas
app.include_router(router, prefix="/api")


@app.get("/")
def root():
    return {"message": "Bienvenido a Chef IA. Visita /docs para usar la API."}
