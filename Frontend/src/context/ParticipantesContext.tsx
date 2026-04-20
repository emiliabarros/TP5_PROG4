import { createContext, useContext, useEffect, useReducer } from "react";
import { participantesReducer } from "../reducers/participantesReducer";

export type Participante = {
  id: number;
  nombre: string;
  email: string;
  edad: number;
  pais: string;
  modalidad: string;
  tecnologias: string[];
  nivel: string;
};

type ContextType = {
  participantes: Participante[];
  agregar: (nuevo: Omit<Participante, "id">) => Promise<void>;
  eliminar: (id: number) => Promise<void>;
  editar: (participante: Participante) => Promise<void>;
};

const ParticipantesContext = createContext<ContextType | null>(null);

const API_URL = "http://localhost:8000/participantes";

export const ParticipantesProvider = ({ children }: { children: React.ReactNode }) => {
  const [participantes, dispatch] = useReducer(participantesReducer, []);

  useEffect(() => {
    fetch(API_URL)
      .then((res) => res.json())
      .then((data) => dispatch({ type: "GET_PARTICIPANTES", payload: data }))
      .catch((err) => console.error(err));
  }, []);

  const agregar = async (nuevo: Omit<Participante, "id">) => {
    const res = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(nuevo),
    });
    const data = await res.json();
    dispatch({ type: "AGREGAR", payload: data });
  };

  const eliminar = async (id: number) => {
    await fetch(`${API_URL}/${id}`, { method: "DELETE" });
    dispatch({ type: "ELIMINAR", payload: id });
  };

  const editar = async (participante: Participante) => {
    const res = await fetch(`${API_URL}/${participante.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(participante),
    });
    const data = await res.json();
    dispatch({ type: "EDITAR", payload: data });
  };

  return (
    <ParticipantesContext.Provider value={{ participantes, agregar, eliminar, editar }}>
      {children}
    </ParticipantesContext.Provider>
  );
};

export const useParticipantes = () => {
  const context = useContext(ParticipantesContext);
  if (!context) throw new Error("useParticipantes debe usarse dentro del Provider");
  return context;
};