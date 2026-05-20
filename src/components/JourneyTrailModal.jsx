import { useEffect, useState } from "react";

import styles from "./JourneyTrailModal.module.css";

import Input from "./UI/Input";
import Button from "./UI/Button";
import Subtitle from "./UI/Subtitle";

import { supabase } from "../services/supabase";

export default function JourneyTrailModal({
  isOpen,
  onClose,
  mode = "create",
  trail = null,
  journeyId,
  onSave,
}) {

  const [form, setForm] = useState({
    title: "",
    description: "",
    duration_minutes: "",
    order_number: "",
    date: "",
    hour: "",
    link: "",
  });

  const [loading, setLoading] =
    useState(false);

  const [errorMessage, setErrorMessage] =
    useState("");

  useEffect(() => {

    setErrorMessage("");

    if (trail) {

      setForm({
        title: trail.title || "",
        description: trail.description || "",
        duration_minutes:
          trail.duration_minutes || "",
        order_number:
          trail.order_number || "",
        date: trail.date || "",
        hour: trail.hour || "",
        link: trail.link || "",
      });

    } else {

      setForm({
        title: "",
        description: "",
        duration_minutes: "",
        order_number: "",
        date: "",
        hour: "",
        link: "",
      });

    }

  }, [trail, isOpen]);

  if (!isOpen) return null;

  function handleChange(event) {

    const { name, value } =
      event.target;

    setForm((current) => ({
      ...current,
      [name]: value,
    }));
  }

  function validateForm() {

    if (!form.title.trim()) {
      return "Informe o título da trilha.";
    }

    if (!form.description.trim()) {
      return "Informe a descrição da trilha.";
    }

    if (!form.duration_minutes) {
      return "Informe a duração da trilha.";
    }

    if (
      Number(form.duration_minutes) <= 0
    ) {
      return "A duração deve ser maior que zero.";
    }

    if (!form.order_number) {
      return "Informe a ordem da trilha.";
    }

    if (
      Number(form.order_number) <= 0
    ) {
      return "A ordem deve ser maior que zero.";
    }

    if (!form.date) {
      return "Informe a data.";
    }

    if (!form.hour) {
      return "Informe o horário.";
    }

    if (
      mode === "create" &&
      !journeyId
    ) {
      return "Jornada não encontrada.";
    }

    return "";
  }

  async function handleSubmit(event) {

    event.preventDefault();

    const validationError =
      validateForm();

    if (validationError) {

      setErrorMessage(
        validationError
      );

      return;
    }

    setLoading(true);

    setErrorMessage("");

    const payload = {

      title: form.title,

      description:
        form.description,

      duration_minutes:
        Number(form.duration_minutes),

      order_number:
        Number(form.order_number),

      date: form.date,

      hour: form.hour,

      link: form.link,

    };

    let response;

    if (
      mode === "edit" &&
      trail?.id
    ) {

      response =
        await supabase

          .from("trails")

          .update(payload)

          .eq("id", trail.id)

          .select()

          .single();

    } else {

      response =
        await supabase

          .from("trails")

          .insert([
            {
              ...payload,
              journey_id: journeyId,
            },
          ])

          .select()

          .single();
    }

    setLoading(false);

    if (response.error) {

      setErrorMessage(
        response.error.message
      );

      return;
    }

    onSave(response.data);
  }

  return (
    <div className={styles.overlay}>

      <div className={styles.modal}>

        <header className={styles.header}>

          <div>

            <span className={styles.badge}>
              {
                mode === "edit"
                  ? "Editar trilha"
                  : "Nova trilha"
              }
            </span>

            <h2>
              {
                mode === "edit"
                  ? "Atualizar trilha"
                  : "Cadastrar trilha"
              }
            </h2>

          </div>

          <button
            type="button"
            className={styles.close}
            onClick={onClose}
          >
            ×
          </button>

        </header>

        <form
          className={styles.form}
          onSubmit={handleSubmit}
        >

          <Input
            label="Título"
            name="title"
            placeholder="Ex: Introdução"
            value={form.title}
            onChange={handleChange}
          />

          <Input
            textarea
            label="Descrição"
            name="description"
            placeholder="Resumo da trilha"
            value={form.description}
            onChange={handleChange}
          />

          <div className={styles.grid}>

            <Input
              label="Duração (em minutos)"
              name="duration_minutes"
              type="number"
              placeholder="Ex: 45"
              value={form.duration_minutes}
              onChange={handleChange}
            />

            <Input
              label="Ordem"
              name="order_number"
              type="number"
              placeholder="Ex: 1"
              value={form.order_number}
              onChange={handleChange}
            />

          </div>

          <div className={styles.grid}>

            <Input
              label="Data"
              name="date"
              type="date"
              value={form.date}
              onChange={handleChange}
            />

            <Input
              label="Hora"
              name="hour"
              type="time"
              value={form.hour}
              onChange={handleChange}
            />

          </div>

          <Input
            label="Link da trilha"
            name="link"
            placeholder="https://..."
            value={form.link}
            onChange={handleChange}
          />

          {
            errorMessage && (
              <Subtitle
                size="sm"
                variant="error"
              >
                {errorMessage}
              </Subtitle>
            )
          }

          <footer className={styles.actions}>

            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={onClose}
            >
              Cancelar
            </Button>

            <Button
              type="submit"
              size="sm"
              disabled={loading}
            >

              {
                loading
                  ? "Salvando..."
                  : mode === "edit"
                  ? "Salvar alterações"
                  : "Adicionar trilha"
              }

            </Button>

          </footer>

        </form>

      </div>

    </div>
  );
}