import styles from "./Filters.module.scss";

type Props = {
  search: string;
  onSearchChange: (value: string) => void;
  status: "all" | "alive" | "dead";
  onStatusChange: (value: "all" | "alive" | "dead") => void;
  total: number;
  filtered: number;
};

export default function Filters({
  search,
  onSearchChange,
  status,
  onStatusChange,
  total,
  filtered,
}: Props) {
  const hasActiveFilter = search !== "" || status !== "all";

  function handleClear() {
    onSearchChange("");
    onStatusChange("all");
  }

  return (
    <section className={styles.wrapper}>

      {/* Busca */}
      <div className={styles.searchWrapper}>
        <input
          type="text"
          placeholder="Buscar por nome..."
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          className={styles.searchInput}
        />
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

      {/* Status */}
      <div className={styles.selects}>
        <select
          value={status}
          onChange={(e) => onStatusChange(e.target.value as "all" | "alive" | "dead")}
          className={`${styles.select} ${status !== "all" ? styles.active : ""}`}
        >
          <option value="all">Todos os status</option>
          <option value="alive">Vivos</option>
          <option value="dead">Falecidos</option>
        </select>

        {hasActiveFilter && (
          <button className={styles.clearAll} onClick={handleClear}>
            Limpar filtros
          </button>
        )}
      </div>

      {/* Contagem */}
      <p className={styles.count}>
        Exibindo <strong>{total}</strong> de <strong>{filtered}</strong> personagens
      </p>

    </section>
  );
}
