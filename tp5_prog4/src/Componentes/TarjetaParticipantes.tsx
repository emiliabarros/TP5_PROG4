import type { Participante } from "../context/ParticipantesContext";

type Props = {
  participante: Participante;
  eliminarParticipante: (id: number) => void;
  cargarParaEditar: (p: Participante) => void;
};

function TarjetaParticipante({ participante: p, eliminarParticipante, cargarParaEditar }: Props) {
  const colorFondo =
    p.nivel === "Principiante" ? "bg-blue-50" :
    p.nivel === "Intermedio" ? "bg-yellow-50" :
    "bg-red-50";

  return (
    <div className={`${colorFondo} shadow rounded p-4 hover:shadow-lg transition`}>
      <h3 className="font-bold text-lg mb-1">{p.nombre}</h3>
      <p className="text-sm text-gray-600">{p.pais}</p>

      <p className="mt-2 text-sm">
        <span className="font-semibold">Modalidad:</span> {p.modalidad}
      </p>

      <p className="text-sm">
        <span className="font-semibold">Nivel:</span>{" "}
        <span className={
          p.nivel === "Principiante" ? "text-green-600" :
          p.nivel === "Intermedio" ? "text-yellow-600" : "text-red-600 font-semibold"
        }>
          {p.nivel}
        </span>
      </p>

      <div className="mt-2 text-sm">
        <div className="flex flex-wrap gap-1">
          {p.tecnologias.map((tech, i) => (
            <span key={i} className="text-gray-700">{tech}</span>
          ))}
        </div>
      </div>

      <div className="mt-4 flex gap-2">
        <button
          onClick={() => cargarParaEditar(p)}
          className="bg-blue-400 hover:bg-blue-500 text-white px-3 py-1 rounded text-sm"
        >
          Editar
        </button>
        <button
          onClick={() => eliminarParticipante(p.id)}
          className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-sm"
        >
          Eliminar
        </button>
      </div>
    </div>
  );
}

export default TarjetaParticipante;