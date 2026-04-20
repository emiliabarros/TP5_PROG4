import TarjetaParticipante from "./TarjetaParticipantes";
import type { Participante } from "../context/ParticipantesContext";

type Props = {
  participantes: Participante[];
  eliminarParticipante: (id: number) => void;
  cargarParaEditar: (p: Participante) => void; // nuevo
};

function ListaParticipantes({ participantes, eliminarParticipante, cargarParaEditar }: Props) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {participantes.map((p) => (
        <TarjetaParticipante
          key={p.id}
          participante={p}
          eliminarParticipante={eliminarParticipante}
          cargarParaEditar={cargarParaEditar} // nuevo
        />
      ))}
    </div>
  );
}

export default ListaParticipantes;