"use client";

import styles from "./ConfirmModal.module.scss";

type Props = {
  visible: boolean;
  onConfirm: () => void;
  onCancel: () => void;
};

export default function ConfirmModal({ visible, onConfirm, onCancel }: Props) {
  if (!visible) return null;

  return (
    <div className={styles.overlay} onClick={onCancel}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>

        <h3 className={styles.title}>Atenção — Spoiler</h3>
        <p className={styles.description}>
          Este filtro pode revelar o destino de personagens do universo mágico.
          <br />
          Deseja continuar?
        </p>

        <div className={styles.actions}>
          <button className={styles.cancelBtn} onClick={onCancel}>
            Cancelar
          </button>
          <button className={styles.confirmBtn} onClick={onConfirm}>
            Confirmar
          </button>
        </div>

      </div>
    </div>
  );
}
