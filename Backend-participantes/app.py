from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import mysql.connector
from typing import List

app = FastAPI()

# CORS (para React)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Modelo
class Participante(BaseModel):
    nombre: str
    email: str
    edad: int
    pais: str
    modalidad: str
    tecnologias: List[str]
    nivel: str

# Conexión DB
def get_db():
    return mysql.connector.connect(
        host="localhost",
        user="root",
        password="1234",  
        database="participantes_db"
    )

# GET
@app.get("/participantes")
def obtener_participantes():
    conn = get_db()
    cursor = conn.cursor(dictionary=True)

    cursor.execute("SELECT * FROM participantes")
    data = cursor.fetchall()
    conn.close()

    # convertir tecnologias a array
    for p in data:
        p["tecnologias"] = p["tecnologias"].split(",") if p["tecnologias"] else []

    return data

# POST
@app.post("/participantes")
def crear_participante(p: Participante):
    conn = get_db()
    cursor = conn.cursor()

    tecnologias_str = ",".join(p.tecnologias)

    cursor.execute("""
        INSERT INTO participantes (nombre, email, edad, pais, modalidad, tecnologias, nivel)
        VALUES (%s, %s, %s, %s, %s, %s, %s)
    """, (
        p.nombre,
        p.email,
        p.edad,
        p.pais,
        p.modalidad,
        tecnologias_str,
        p.nivel
    ))

    conn.commit()
    nuevo_id = cursor.lastrowid
    conn.close()

    return {"id": nuevo_id, **p.dict()}

# DELETE
@app.delete("/participantes/{id}")
def eliminar_participante(id: int):
    conn = get_db()
    cursor = conn.cursor()

    cursor.execute("DELETE FROM participantes WHERE id = %s", (id,))
    conn.commit()

    if cursor.rowcount == 0:
        raise HTTPException(status_code=404, detail="No encontrado")

    conn.close()
    return {"mensaje": "Eliminado"}

# PUT
@app.put("/participantes/{id}")
def actualizar_participante(id: int, p: Participante):
    conn = get_db()
    cursor = conn.cursor()

    tecnologias_str = ",".join(p.tecnologias)

    cursor.execute("""
        UPDATE participantes
        SET nombre = %s, email = %s, edad = %s, pais = %s,
            modalidad = %s, tecnologias = %s, nivel = %s
        WHERE id = %s
    """, (
        p.nombre,
        p.email,
        p.edad,
        p.pais,
        p.modalidad,
        tecnologias_str,
        p.nivel,
        id
    ))

    conn.commit()

    if cursor.rowcount == 0:
        raise HTTPException(status_code=404, detail="No encontrado")

    conn.close()

    return {"id": id, **p.dict()}