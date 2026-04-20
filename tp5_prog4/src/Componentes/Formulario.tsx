type Props = {
  nombre: string; setNombre: (v: string) => void;
  email: string; setEmail: (v: string) => void;
  edad: string; setEdad: (v: string) => void;
  pais: string; setPais: (v: string) => void;
  modalidad: string; setModalidad: (v: string) => void;
  tecnologias: string[]; setTecnologias: (v: string[]) => void;
  nivel: string; setNivel: (v: string) => void;
  aceptaTerminos: boolean; setAceptaTerminos: (v: boolean) => void;
  registrarParticipante: (e: React.FormEvent) => void;
  modoEdicion: boolean;
  cancelarEdicion: () => void;
};

function Formulario({ nombre, setNombre, email, setEmail, edad, setEdad,
  pais, setPais, modalidad, setModalidad, tecnologias, setTecnologias,
  nivel, setNivel, aceptaTerminos, setAceptaTerminos,
  registrarParticipante, modoEdicion, cancelarEdicion }: Props) {
  return (
    <div className="bg-white shadow rounded p-4 mb-6">
      <h2 className="text-xl font-semibold mb-4">
        {modoEdicion ? "✏️ Editando participante" : "Formulario de inscripción"}
      </h2>

      <form onSubmit={registrarParticipante} className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <input type="text" placeholder="Nombre" className="border p-2 rounded"
          value={nombre} onChange={(e) => setNombre(e.target.value)} />

        <input type="email" placeholder="Email" className="border p-2 rounded"
          value={email} onChange={(e) => setEmail(e.target.value)} />

        <input type="number" placeholder="Edad" className="border p-2 rounded"
          value={edad} onChange={(e) => setEdad(e.target.value)} />

        <select className="border p-2 rounded" value={pais} onChange={(e) => setPais(e.target.value)}>
          <option>Argentina</option>
          <option>Chile</option>
          <option>Uruguay</option>
          <option>México</option>
          <option>España</option>
        </select>

        <div className="md:col-span-2">
          <p className="mb-2 font-semibold">Modalidad</p>
          <div className="flex gap-4">
            {["Presencial", "Virtual", "Híbrido"].map((m) => (
              <label key={m}>
                <input type="radio" value={m} checked={modalidad === m}
                  onChange={(e) => setModalidad(e.target.value)} /> {m}
              </label>
            ))}
          </div>
        </div>

        <div className="md:col-span-2">
          <p className="mb-2 font-semibold">Tecnologías</p>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
            {["React", "Angular", "Vue", "Node", "Python", "Java"].map((tech) => (
              <label key={tech} className="flex gap-2 items-center">
                <input type="checkbox" value={tech} checked={tecnologias.includes(tech)}
                  onChange={(e) => {
                    if (e.target.checked) setTecnologias([...tecnologias, tech]);
                    else setTecnologias(tecnologias.filter((t) => t !== tech));
                  }} />
                {tech}
              </label>
            ))}
          </div>
        </div>

        <select className="border p-2 rounded md:col-span-2" value={nivel}
          onChange={(e) => setNivel(e.target.value)}>
          <option value="">Seleccionar nivel</option>
          <option>Principiante</option>
          <option>Intermedio</option>
          <option>Avanzado</option>
        </select>

        <div className="md:col-span-2">
          <label className="flex gap-2 items-center">
            <input type="checkbox" checked={aceptaTerminos}
              onChange={(e) => setAceptaTerminos(e.target.checked)} />
            Acepto los términos y condiciones
          </label>
        </div>

        <div className="md:col-span-2 flex gap-3">
          <button type="submit"
            className={`text-white px-4 py-2 rounded ${modoEdicion ? "bg-yellow-500 hover:bg-yellow-600" : "bg-blue-600 hover:bg-blue-700"}`}>
            {modoEdicion ? "Actualizar Participante" : "Registrar Participante"}
          </button>

          {modoEdicion && (
            <button type="button" onClick={cancelarEdicion}
              className="bg-gray-400 hover:bg-gray-500 text-white px-4 py-2 rounded">
              Cancelar
            </button>
          )}
        </div>
      </form>
    </div>
  );
}

export default Formulario;