import { useState } from "react";

export default function BuscadorPokemon() {
  const [busqueda, setBusqueda] = useState("");
  const [pokemon, setPokemon] = useState(null);
  const [cargando, setCargando] = useState(false);
  const [error, setError] = useState("");

  const buscarPokemon = async (e) => {
    e.preventDefault();
    const nombre = busqueda.trim().toLowerCase();
    if (!nombre) {
      setError("Escribe un nombre o número de Pokémon.");
      setPokemon(null);
      return;
    }

    setCargando(true);
    setError("");
    setPokemon(null);
    try {
      const respuesta = await fetch(`https://pokeapi.co/api/v2/pokemon/${encodeURIComponent(nombre)}`);
      if (!respuesta.ok) throw new Error("Pokémon no encontrado. Revisa el nombre o número e inténtalo otra vez.");
      const datos = await respuesta.json();
      setPokemon(datos);
    } catch (err) {
      setError(err instanceof TypeError ? "No fue posible conectar con PokéAPI. Revisa tu conexión e inténtalo de nuevo." : err.message);
    } finally {
      setCargando(false);
    }
  };

  return (
    <section className="panel pokemon-panel">
      <div className="section-heading">
        <div><span className="eyebrow">CONSULTA A API EXTERNA</span><h2>Mini PokéAPI</h2><p className="section-description">Busca un Pokémon por nombre o número. Esta consulta usa internet y no modifica el inventario.</p></div>
        <div className="pokemon-ball" aria-hidden="true">◉</div>
      </div>
      <form className="pokemon-search" onSubmit={buscarPokemon}>
        <input value={busqueda} onChange={(e) => setBusqueda(e.target.value)} placeholder="Ej. pikachu o 25" aria-label="Nombre o número de Pokémon" />
        <button className="button button-primary" type="submit" disabled={cargando}>{cargando ? "Buscando..." : "Buscar Pokémon"}</button>
      </form>
      {error && <p className="notice notice-error" role="alert">{error}</p>}
      {pokemon && (
        <article className="pokemon-result">
          <div className="pokemon-art">
            {pokemon.sprites?.other?.["official-artwork"]?.front_default || pokemon.sprites?.front_default ? (
              <img src={pokemon.sprites?.other?.["official-artwork"]?.front_default || pokemon.sprites?.front_default} alt={`Ilustración de ${pokemon.name}`} />
            ) : <span>Sin imagen</span>}
          </div>
          <div className="pokemon-details">
            <span className="eyebrow">POKÉMON #{String(pokemon.id).padStart(3, "0")}</span>
            <h3>{pokemon.name.replace(/-/g, " ").replace(/\b\w/g, (letra) => letra.toUpperCase())}</h3>
            <p>Altura: {(pokemon.height / 10).toFixed(1)} m · Peso: {(pokemon.weight / 10).toFixed(1)} kg</p>
            <div className="type-list">{pokemon.types.map(({ type }) => <span key={type.name} className="type-pill">{type.name}</span>)}</div>
          </div>
        </article>
      )}
    </section>
  );
}
