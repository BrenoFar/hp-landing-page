import styles from "./Filters.module.scss";

// Tipagem das props recebidas da page.tsx
type Props = {
  search: string;
  onSearchChange: (value: string) => void;
  house: string;
  onHouseChange: (value: string) => void;
  status: "all" | "alive" | "dead";
  onStatusChange: (value: "all" | "alive" | "dead") => void;
  total: number;       // total de personagens após filtro
  filtered: number;   // total sem filtro (para mostrar contagem)
};

export default function Filters({
  search,
  onSearchChange,
  house,
  onHouseChange,
  status,
  onStatusChange,
  total,
  filtered,
}: Props) {
  // Limpa todos os filtros de uma vez
  function handleClear() {
    onSearchChange("");
    onHouseChange("all");
    onStatusChange("all");
  }

  const hasActiveFilter = search !== "" || house !== "all" || status !== "all";

  return (
    <section className={styles.wrapper}>

      {/* Barra de busca */}
      <div className={styles.searchWrapper}>
        <span className={styles.searchIcon}></span>
        <input
          type="text"
          placeholder="Buscar por nome..."
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          className={styles.searchInput}
        />
        {/* Botão de limpar busca */}
        {search && (
          <button
            className={styles.clearInput}
            onClick={() => onSearchChange("")}
            aria-label="Limpar busca"
          >
            ✕
          </button>
        )}
      </div>

      {/* Filtros de casa e status */}
      <div className={styles.selects}>
        <select
          value={house}
          onChange={(e) => onHouseChange(e.target.value)}
          className={styles.select}
        >
          <option value="all">Todas as casas</option>
          <option value="Gryffindor"> Gryffindor</option>
          <option value="Slytherin"> Slytherin</option>
          <option value="Hufflepuff"> Hufflepuff</option>
          <option value="Ravenclaw"> Ravenclaw</option>
        </select>

        <select
          value={status}
          onChange={(e) => onStatusChange(e.target.value as "all" | "alive" | "dead")}
          className={styles.select}
        >
          <option value="all">Todos os status</option>
          <option value="alive">Vivos</option>
          <option value="dead">Falecidos</option>
        </select>

        {/* Botão limpar todos os filtros — só aparece se houver filtro ativo */}
        {hasActiveFilter && (
          <button className={styles.clearAll} onClick={handleClear}>
            Limpar filtros
          </button>
        )}
      </div>

      {/* Contagem de resultados */}
      <p className={styles.count}>
        Exibindo <strong>{total}</strong> de <strong>{filtered}</strong> personagens
      </p>

    </section>
  );
}
