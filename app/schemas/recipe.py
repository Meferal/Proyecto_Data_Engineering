from pydantic import BaseModel
from datetime import datetime


# Input del usuario
class RecetaCreate(BaseModel):
    ingredientes: str


# Output hacia el usuario (Data Transfer Object)
class RecetaResponse(BaseModel):
    id: int
    fecha: datetime
    ingredientes: str
    receta_generada: str

    class Config:
        from_attributes = True  # Antes conocido como orm_mode
