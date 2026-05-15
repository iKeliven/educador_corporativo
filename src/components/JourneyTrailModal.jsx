import styles from "./JourneyTrailModal.module.css";

import Input from "./UI/Input";
import Button from "./UI/Button";

export default function JourneyTrailModal({
  isOpen,
  onClose,
  mode = "create",
  trail = null,
}) {
  if (!isOpen) return null;

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <header className={styles.header}>
          <div>
            <span className={styles.badge}>
              {mode === "edit" ? "Editar trilha" : "Nova trilha"}
            </span>
            <h2>
              {mode === "edit" ? "Atualizar trilha" : "Cadastrar trilha"}
            </h2>
          </div>
          <button type="button" className={styles.close} onClick={onClose}>
            ×
          </button>
        </header>
        <form className={styles.form}>
          <Input
            label="Título"
            placeholder="Ex: Introdução"
            defaultValue={trail?.title}
          />
          <Input
            label="Descrição"
            placeholder="Resumo da trilha"
            defaultValue={trail?.description}
          />
          <div className={styles.grid}>
            <Input
              label="Carga horária"
              placeholder="Ex: 45 min"
              defaultValue={trail?.workload}
            />
            <Input
              label="Ordem"
              placeholder="Ex: 1"
              defaultValue={trail?.order}
            />
          </div>
          <Input
            label="Link da trilha"
            placeholder="https://..."
            defaultValue={trail?.link}
          />
          <footer className={styles.actions}>
            <Button type="button" variant="ghost" size="sm" onClick={onClose}>
              Cancelar
            </Button>
            <Button size="sm">
              {mode === "edit" ? "Salvar alterações" : "Adicionar trilha"}
            </Button>
          </footer>
        </form>
      </div>
    </div>
  );
}