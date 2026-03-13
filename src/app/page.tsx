"use client";

import { useState, useEffect } from "react";
import { GiCastle, GiWizardStaff } from "react-icons/gi";
import { fetchAllCharacters } from "@/services/characters";
import { GROUPS, groupCharacters } from "@/services/groups";
import Hero from "@/components/Hero/Hero";
import HouseCard from "@/components/HouseCard/HouseCard";
import styles from "./page.module.scss";

const HOUSE_KEYS = ["gryffindor", "slytherin", "hufflepuff", "ravenclaw"];

export default function HomePage() {
  const [groups, setGroups] = useState<Record<string, number>>({});
  const [activeTab, setActiveTab] = useState<"houses" | "others">("houses");

  useEffect(() => {
    async function load() {
      const characters = await fetchAllCharacters();
      const grouped = groupCharacters(characters);
      const counts: Record<string, number> = {};
      Object.keys(grouped).forEach((key) => {
        counts[key] = grouped[key].length;
      });
      setGroups(counts);
    }
    load();
  }, []);

  const houseGroups  = GROUPS.filter((g) => HOUSE_KEYS.includes(g.key));
  const othersGroups = GROUPS.filter((g) => !HOUSE_KEYS.includes(g.key));
  const activeGroups = activeTab === "houses" ? houseGroups : othersGroups;

  return (
    <>
      <Hero />

      <main className={styles.main}>

        {/* Tabs */}
        <div className={styles.tabs}>
          <button
            className={`${styles.tab} ${activeTab === "houses" ? styles.tabActive : ""}`}
            onClick={() => setActiveTab("houses")}
          >
            <GiCastle className={styles.tabIcon} />
            Casas
          </button>
          <button
            className={`${styles.tab} ${activeTab === "others" ? styles.tabActive : ""}`}
            onClick={() => setActiveTab("others")}
          >
            <GiWizardStaff className={styles.tabIcon} />
            Outros
          </button>
        </div>

        {/* Grid */}
        <div className={styles.housesGrid}>
          {activeGroups.map((group) => {
            const count = groups[group.key] ?? 0;
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

      {/* Footer */}
      <footer className={styles.footer}>
        <p className={styles.footerDev}>
          Desenvolvido por <strong>Breno Farias</strong>
        </p>
        <p className={styles.footerLegal}>
          Harry Potter © J.K. Rowling, Warner Bros. e seus respectivos detentores de direitos.
          <br />
          Este projeto é fan-made, sem fins comerciais.
        </p>
      </footer>
    </>
  );
}
