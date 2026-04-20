type Props = {
  busqueda: string;
  setBusqueda: (valor: string) => void;
  filtroModalidad: string;
  setFiltroModalidad: (valor: string) => void;
  filtroNivel: string;
  setFiltroNivel: (valor: string) => void;
  limpiarFiltros: () => void;
};

function Filtros({
  busqueda,
  setBusqueda,
  filtroModalidad,
  setFiltroModalidad,
  filtroNivel,
  setFiltroNivel,
  limpiarFiltros,
}: Props) {
  return (
    <div className="bg-white shadow rounded p-4 mb-6">
      <h2 className="text-xl font-semibold mb-4">
        Filtros de búsqueda
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">  
        
        <input
          type="text"
          placeholder="Buscar por nombre"
          className="border p-2 rounded"
          value={busqueda}
          onChange={(e) => setBusqueda(e.target.value)}
        />

        <select
          className="border p-2 rounded"
          value={filtroModalidad}
          onChange={(e) => setFiltroModalidad(e.target.value)}
        >
          <option>Todas</option>
          <option>Presencial</option>
          <option>Virtual</option>
          <option>Híbrido</option>
        </select>

        <select
          className="border p-2 rounded"
          value={filtroNivel}
          onChange={(e) => setFiltroNivel(e.target.value)}
        >
          <option>Todos</option>
          <option>Principiante</option>
          <option>Intermedio</option>
          <option>Avanzado</option>
        </select>

      </div>
      <div className="mt-4">
      <button
        onClick={limpiarFiltros}
        className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
      >
        Limpiar filtros
      </button>
      </div>
    </div>
  );
}

export default Filtros;