from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List

from app.db.session import get_db
from app.db.models import Peticion
from app.schemas.recipe import RecetaCreate, RecetaResponse
from app.services.gemini_service import generar_receta_ia

router = APIRouter()


@router.post("/generar", response_model=RecetaResponse)
def crear_receta(datos: RecetaCreate, db: Session = Depends(get_db)):
    # 1. Llamar a la IA
    texto_receta = generar_receta_ia(datos.ingredientes)

    # 2. Guardar en BD
    nueva_peticion = Peticion(
        ingredientes=datos.ingredientes,
        receta_generada=texto_receta
    )
    db.add(nueva_peticion)
    db.commit()
    db.refresh(nueva_peticion)

    return nueva_peticion


@router.get("/historial", response_model=List[RecetaResponse])
def leer_historial(skip: int = 0, limit: int = 10, db: Session = Depends(get_db)):
    return db.query(Peticion).order_by(Peticion.fecha.desc()).offset(skip).limit(limit).all()
