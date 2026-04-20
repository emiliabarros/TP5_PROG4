import { useState } from "react";
import ListaParticipantes from "./Componentes/ListaParticipantes";
import Filtros from "./Componentes/Filtros";
import Formulario from "./Componentes/Formulario";
import { useParticipantes, type Participante } from "./context/ParticipantesContext";

function App() {
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [edad, setEdad] = useState("");
  const [pais, setPais] = useState("Argentina");
  const [modalidad, setModalidad] = useState("");
  const [tecnologias, setTecnologias] = useState<string[]>([]);
  const [nivel, setNivel] = useState("");
  const [aceptaTerminos, setAceptaTerminos] = useState(false);
  const [busqueda, setBusqueda] = useState("");
  const [filtroModalidad, setFiltroModalidad] = useState("Todas");
  const [filtroNivel, setFiltroNivel] = useState("Todos");

  // Nuevo: participante siendo editado
  const [participanteEditando, setParticipanteEditando] = useState<Participante | null>(null);

  const { participantes, agregar, eliminar, editar } = useParticipantes();

  // Carga datos en el formulario al presionar Editar
  const cargarParaEditar = (p: Participante) => {
    setParticipanteEditando(p);
    setNombre(p.nombre);
    setEmail(p.email);
    setEdad(String(p.edad));
    setPais(p.pais);
    setModalidad(p.modalidad);
    setTecnologias(p.tecnologias);
    setNivel(p.nivel);
    setAceptaTerminos(false);
  };

  const limpiarFormulario = () => {
    setParticipanteEditando(null);
    setNombre("");
    setEmail("");
    setEdad("");
    setPais("Argentina");
    setModalidad("");
    setTecnologias([]);
    setNivel("");
    setAceptaTerminos(false);
  };

  const registrarParticipante = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!aceptaTerminos) {
      alert("Debes aceptar los términos");
      return;
    }

    if (participanteEditando) {
      // Modo edición: llama a editar con el id original
      await editar({
        ...participanteEditando,
        nombre,
        email,
        edad: Number(edad),
        pais,
        modalidad,
        tecnologias,
        nivel,
      });
    } else {
      // Modo creación
      await agregar({ nombre, email, edad: Number(edad), pais, modalidad, tecnologias, nivel });
    }

    limpiarFormulario();
  };

  const eliminarParticipante = (id: number) => {
    const confirmar = window.confirm("¿Seguro que querés eliminar este participante?");
    if (!confirmar) return;
    eliminar(id);
  };

  const participantesFiltrados = participantes.filter((p) => {
    return (
      p.nombre.toLowerCase().includes(busqueda.toLowerCase()) &&
      (filtroModalidad === "Todas" || p.modalidad === filtroModalidad) &&
      (filtroNivel === "Todos" || p.nivel === filtroNivel)
    );
  });

  const limpiarFiltros = () => {
    setBusqueda("");
    setFiltroModalidad("Todas");
    setFiltroNivel("Todos");
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-center mb-6">
        Registro de Participantes
      </h1>

      <Formulario
        nombre={nombre} setNombre={setNombre}
        email={email} setEmail={setEmail}
        edad={edad} setEdad={setEdad}
        pais={pais} setPais={setPais}
        modalidad={modalidad} setModalidad={setModalidad}
        tecnologias={tecnologias} setTecnologias={setTecnologias}
        nivel={nivel} setNivel={setNivel}
        aceptaTerminos={aceptaTerminos} setAceptaTerminos={setAceptaTerminos}
        registrarParticipante={registrarParticipante}
        modoEdicion={!!participanteEditando}
        cancelarEdicion={limpiarFormulario}
      />

      <Filtros
        busqueda={busqueda} setBusqueda={setBusqueda}
        filtroModalidad={filtroModalidad} setFiltroModalidad={setFiltroModalidad}
        filtroNivel={filtroNivel} setFiltroNivel={setFiltroNivel}
        limpiarFiltros={limpiarFiltros}
      />

      <div>
        <h2 className="text-xl font-semibold mb-4">Lista de participantes</h2>
        <ListaParticipantes
          participantes={participantesFiltrados}
          eliminarParticipante={eliminarParticipante}
          cargarParaEditar={cargarParaEditar}
        />
      </div>
    </div>
  );
}

export default App;