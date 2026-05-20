import { useState } from "react";

import styles from "./Card.module.css";

import Title from "./UI/Title";
import Button from "./UI/Button";
import Badge from "./UI/Badge";
import Subtitle from "./UI/Subtitle";

export default function Card({
  journey,
  onEdit,
  onPreview,
  onDelete,
}) {
  const [copied, setCopied] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(false);

  const journeyLink = `${window.location.origin}/jornada/${journey.slug}`;

  async function handleCopyLink() {
    await navigator.clipboard.writeText(journeyLink);

    setCopied(true);

    setTimeout(() => {
      setCopied(false);
    }, 2000);
  }

  function handleDeleteClick() {
    setConfirmDelete(true);
  }

  function handleConfirmDelete() {
    setConfirmDelete(false);
    onDelete();
  }

  function handleCancelDelete() {
    setConfirmDelete(false);
  }

  return (
    <article className={styles.card}>
      <div className={styles.cardHeader}>
        <div>
          <Badge>{journey.company}</Badge>

          <Title size="sm">
            {journey.title}
          </Title>
        </div>

        <Badge variant="ghost">
          {journey.count} trilhas
        </Badge>
      </div>

      <div className={styles.linkBox}>
        <div>
          <span className={styles.linkLabel}>
            Link da jornada
          </span><br />
          <span className={styles.slug}>
            {journeyLink}
          </span>
        </div>

        <Button
          type="button"
          size="sm"
          variant="secondary"
          onClick={handleCopyLink}
        >
          {copied ? "Copiado!" : "Copiar link"}
        </Button>
      </div>

      <div className={styles.actions}>
        <Button
          type="button"
          size="sm"
          onClick={onEdit}
        >
          Editar
        </Button>

        <Button
          type="button"
          size="sm"
          variant="secondary"
          onClick={onPreview}
        >
          Visualizar
        </Button>

        <Button
          type="button"
          size="sm"
          variant="ghost"
          onClick={handleDeleteClick}
        >
          Excluir
        </Button>
      </div>

      {confirmDelete && (
        <div className={styles.confirmOverlay}>
          <div className={styles.confirmBox}>
            <h3 className={styles.confirmTitle}>
              Excluir jornada
            </h3>

            <p className={styles.confirmText}>
              Tem certeza que deseja excluir esta jornada? Esta ação não poderá
              ser desfeita.
            </p>

            <div className={styles.confirmActions}>
              <Button
                type="button"
                size="sm"
                variant="success"
                onClick={handleCancelDelete}
              >
                Cancelar
              </Button>

              <Button
                type="button"
                size="sm"
                variant="error"
                onClick={handleConfirmDelete}
              >
                Confirmar excluir
              </Button>
            </div>
          </div>
        </div>
      )}
    </article>
  );
}