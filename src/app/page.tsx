import { fetchAllCharacters } from "@/services/characters";
import { GROUPS, groupCharacters } from "@/services/groups";
import Hero from "@/components/Hero/Hero";
import HouseCard from "@/components/HouseCard/HouseCard";
import styles from "./page.module.scss";

export default async function HomePage() {
  const characters = await fetchAllCharacters();
  const groups = groupCharacters(characters);

  return (
    <>
      <Hero />

      <main className={styles.main}>
        <div className={styles.housesGrid}>
          {GROUPS.map((group) => {
            const count = groups[group.key]?.length ?? 0;
            if (count === 0) return null;

            return (
              <HouseCard
                key={group.key}
                group={group}
                count={count}
              />
            );
          })}
        </div>
      </main>
    </>
  );
}
