"use client"; // ← necessário para usar useState e useEffect

import { useEffect, useState } from "react";
import styles from "./Hero.module.scss";

type Star = {
  top: string;
  left: string;
};

export default function Hero() {
  const [stars, setStars] = useState<Star[]>([]);

  useEffect(() => {
    // Gera as posições só no cliente, evitando conflito de hidratação
    const generated = Array.from({ length: 80 }, () => ({
      top: `${Math.random() * 100}%`,
      left: `${Math.random() * 100}%`,
    }));
    setStars(generated);
  }, []);

  return (
    <section className={styles.hero}>

      {/* Estrelas animadas no fundo */}
      <div className={styles.stars} aria-hidden="true">
        {stars.map((star, i) => (
          <span
            key={i}
            className={styles.star}
            style={{ top: star.top, left: star.left }}
          />
        ))}
      </div>

      {/* Símbolo decorativo */}
      <div className={styles.symbol} aria-hidden="true">
        ⚡
      </div>

      <div className={styles.content}>
        <p className={styles.eyebrow}>Bem-vindo ao universo mágico</p>

        <h1 className={styles.title}>
          The Wizarding
          <span className={styles.highlight}> World</span>
        </h1>

        <p className={styles.description}>
          Explore centenas de personagens do universo de Harry Potter.
          Descubra suas casas, patronos, atores e muito mais.
        </p>

        {/* Estatísticas */}
        <div className={styles.stats}>
          <div className={styles.stat}>
            <strong>400+</strong>
            <span>Personagens</span>
          </div>
          <div className={styles.divider} />
          <div className={styles.stat}>
            <strong>4</strong>
            <span>Casas</span>
          </div>
          <div className={styles.divider} />
          <div className={styles.stat}>
            <strong>7</strong>
            <span>Livros</span>
          </div>
        </div>
      </div>

    </section>
  );
}
