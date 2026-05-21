import { useEffect, useState } from "react";

import styles from "./JourneyTrailModal.module.css";
import Select from "./UI/Select";
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
  const emptyLink = {
    title: "",
    url: "",
    variant: "secondary",
  };

  const [form, setForm] = useState({
    title: "",
    description: "",
    duration_minutes: "",
    order_number: "",
    date: "",
    hour: "",
    links: [emptyLink],
    attachments: [],
  });

  const [loading, setLoading] = useState(false);

  const [errorMessage, setErrorMessage] =
    useState("");

  useEffect(() => {
    setErrorMessage("");

    if (trail) {
      setForm({
        title: trail.title || "",
        description:
          trail.description || "",
        attachments:
          trail.attachments || [],

        duration_minutes:
          trail.duration_minutes || "",

        order_number:
          trail.order_number || "",

        date: trail.date || "",

        hour: trail.hour || "",

        links:
          trail.links?.length > 0
            ? trail.links
            : [emptyLink],
      });
    } else {
      setForm({
        title: "",
        description: "",
        duration_minutes: "",
        order_number: "",
        date: "",
        hour: "",
        links: [emptyLink],
        attachments: [],
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

  function handleLinkChange(
    index,
    field,
    value
  ) {
    setForm((current) => ({
      ...current,

      links: current.links.map(
        (link, i) =>
          i === index
            ? {
              ...link,
              [field]: value,
            }
            : link
      ),
    }));
  }

  function addNewLink() {
    setForm((current) => ({
      ...current,

      links: [
        ...current.links,
        emptyLink,
      ],
    }));
  }

  function removeLink(index) {
    setForm((current) => ({
      ...current,

      links:
        current.links.length === 1
          ? [emptyLink]
          : current.links.filter(
            (_, i) => i !== index
          ),
    }));
  }

  async function handleFileUpload(event) {

    const files =
      Array.from(event.target.files);

    if (
      form.attachments.length +
      files.length > 3
    ) {

      setErrorMessage(
        "Você pode anexar no máximo 3 arquivos."
      );

      return;
    }

    setLoading(true);

    const uploadedFiles = [];

    for (const file of files) {

      const filePath =
        `${journeyId}/${Date.now()}-${file.name}`;

      const { error } =
        await supabase.storage

          .from("trail-files")

          .upload(filePath, file);

      if (error) {

        setErrorMessage(
          "Erro ao enviar arquivo."
        );

        setLoading(false);

        return;
      }

      const { data } =
        supabase.storage

          .from("trail-files")

          .getPublicUrl(filePath);

      uploadedFiles.push({
        name: file.name,
        url: data.publicUrl,
      });
    }

    setForm((current) => ({
      ...current,

      attachments: [
        ...current.attachments,
        ...uploadedFiles,
      ],
    }));

    setLoading(false);
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

    const invalidLink =
      form.links.find(
        (link) =>
          (link.title.trim() &&
            !link.url.trim()) ||
          (!link.title.trim() &&
            link.url.trim())
      );

    if (invalidLink) {
      return "Preencha o título e a URL do link.";
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

    const orderNumber =
      Number(form.order_number);

    const payload = {
      title: form.title.trim(),

      description:
        form.description.trim(),

      duration_minutes:
        Number(form.duration_minutes),

      order_number: orderNumber,

      date: form.date,

      hour: form.hour,

      links: form.links.filter(
        (link) =>
          link.title.trim() &&
          link.url.trim()
      ),

      attachments: form.attachments,
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
              {mode === "edit"
                ? "Editar trilha"
                : "Nova trilha"}
            </span>

            <h2>
              {mode === "edit"
                ? "Atualizar trilha"
                : "Cadastrar trilha"}
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
              value={
                form.duration_minutes
              }
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

          <div className={styles.linksSection}>
            <div
              className={
                styles.linksHeader
              }
            >
              <Subtitle size="bg" variant="light" weight="bold">
                Botões da trilha
              </Subtitle>
              <Subtitle size="sm" variant="light" >
                Adicione links e materiais para a sua trilha
              </Subtitle>
              <Button
                type="button"
                size="sm"
                variant="ghost"
                onClick={addNewLink}
                disabled={form.links.length >= 6}
              >
                {form.links.length >= 6
                  ? "Limite atingido"
                  : "+ Adicionar botão"}
              </Button>
            </div>

            {form.links.map(
              (link, index) => (
                <div
                  key={index}
                  className={
                    styles.linkCard
                  }
                >
                  <Input
                    label="Título do botão"
                    placeholder="Ex: Acessar aula"
                    value={link.title}
                    onChange={(
                      event
                    ) =>
                      handleLinkChange(
                        index,
                        "title",
                        event.target.value
                      )
                    }
                  />

                  <Input
                    label="URL"
                    placeholder="https://..."
                    value={link.url}
                    onChange={(
                      event
                    ) =>
                      handleLinkChange(
                        index,
                        "url",
                        event.target.value
                      )
                    }
                  />

                  <Select
                    label="Estilo do botão"
                    name="variant"
                    value={link.variant}
                    onChange={(event) =>
                      handleLinkChange(
                        index,
                        "variant",
                        event.target.value
                      )
                    }
                    options={[
                      {
                        value: "primary",
                        label: "Dourado",
                      },
                      {
                        value: "dark",
                        label: "Azul",
                      },

                      {
                        value: "secondary",
                        label: "Transparente",
                      },

                      {
                        value: "ghost",
                        label: "Branco",
                      },

                      {
                        value: "success",
                        label: "Verde",
                      },

                      {
                        value: "error",
                        label: "Vermelho",
                      },
                    ]}
                  />
                  <Button
                    type="button"
                    size="sm"
                    variant="ghost"
                    onClick={() =>
                      removeLink(index)
                    }
                  >
                    Remover
                  </Button>
                </div>
              )
            )}
          </div>

          {errorMessage && (
            <Subtitle
              size="sm"
              variant="error"
            >
              {errorMessage}
            </Subtitle>
          )}
          <div className={styles.attachmentsSection}>

            <div className={styles.linksHeader}>

              <div>

                <Subtitle
                  size="bg"
                  variant="light"
                  weight="bold"
                >
                  Anexos
                </Subtitle>

                <Subtitle
                  size="sm"
                  variant="light"
                >
                  Máximo de 3 arquivos
                </Subtitle>

              </div>

              <Input
                type="file"
                multiple
                onChange={handleFileUpload}
                disabled={
                  form.attachments.length >= 3
                }
              />

            </div>

            {
              form.attachments.length > 0 && (
                <div className={styles.attachmentsList}>

                  {
                    form.attachments.map(
                      (file, index) => (
                        <div
                          key={index}
                          className={styles.attachmentItem}
                        >

                          <span>
                            {file.name}
                          </span>

                          <Button
                            type="button"
                            size="sm"
                            variant="ghost"
                            onClick={() => {

                              setForm((current) => ({
                                ...current,

                                attachments:
                                  current.attachments.filter(
                                    (_, i) =>
                                      i !== index
                                  ),
                              }));

                            }}
                          >
                            Remover
                          </Button>

                        </div>
                      )
                    )
                  }

                </div>
              )
            }

          </div>

          <footer
            className={styles.actions}
          >
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
              {loading
                ? "Salvando..."
                : mode === "edit"
                  ? "Salvar alterações"
                  : "Adicionar trilha"}
            </Button>
          </footer>
        </form>
      </div>
    </div>
  );
}