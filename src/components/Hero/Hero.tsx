"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import styles from "./Hero.module.scss";

type Star = {
  top: string;
  left: string;
};

export default function Hero() {
  const [stars, setStars] = useState<Star[]>([]);

  useEffect(() => {
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

      <div className={styles.content}>
        <p className={styles.eyebrow}>Bem-vindo ao universo mágico de</p>

        {/* Logo Harry Potter no lugar do título */}
        <div className={styles.logoWrapper}>
          <Image
            src="/images/harrypotterlogo.png"
            alt="Harry Potter"
            width={420}
            height={160}
            className={styles.logo}
            priority
          />
        </div>

        <p className={styles.description}>
          Explore centenas de personagens do universo de Harry Potter.
          Navegue pelas casas de Hogwarts, conheça professores, trouxas e muito mais.
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
