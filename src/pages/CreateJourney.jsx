import { useState } from "react";
import { useNavigate } from "react-router-dom";

import styles from "./JourneyForm.module.css";

import MainLayout from "../layouts/MainLayout";
import Header from "../components/Header";

import Input from "../components/UI/Input";
import Button from "../components/UI/Button";
import Badge from "../components/UI/Badge";
import Title from "../components/UI/Title";
import Subtitle from "../components/UI/Subtitle";
import Select from "../components/UI/Select";

import { supabase } from "../services/supabase";

export default function CreateJourney() {
  const navigate = useNavigate();

  const [errorMessage, setErrorMessage] = useState("");

  const [form, setForm] = useState({
    company: "",
    slug: "",
    title: "",
    type: "",
    customType: "",
    description: "",
  });

  function handleChange(event) {
    const { name, value } = event.target;

    setForm((current) => ({
      ...current,
      [name]: value,
    }));
  }

  async function handleSubmit(event) {
    event.preventDefault();

    setErrorMessage("");

    if (!form.company.trim()) {
      setErrorMessage("Informe o nome da empresa.");
      return;
    }

    if (!form.slug.trim()) {
      setErrorMessage("Informe o slug da jornada.");
      return;
    }

    if (!form.title.trim()) {
      setErrorMessage("Informe o título da jornada.");
      return;
    }

    if (!form.type.trim()) {
      setErrorMessage("Selecione o tipo da jornada.");
      return;
    }

    if (form.type === "Outro" && !form.customType.trim()) {
      setErrorMessage("Informe o tipo personalizado.");
      return;
    }

    if (!form.description.trim()) {
      setErrorMessage("Informe a descrição da jornada.");
      return;
    }

    const finalType =
      form.type === "Outro"
        ? form.customType.trim()
        : form.type;

    const payload = {
      company: form.company.trim(),
      slug: form.slug
        .trim()
        .toLowerCase()
        .replaceAll(" ", "-"),
      title: form.title.trim(),
      description: form.description.trim(),
      type: finalType,
    };

    const { data, error } = await supabase
      .from("journeys")
      .insert([payload])
      .select()
      .single();

    if (error) {
      console.log(error.message);

      setErrorMessage(
        "Erro ao criar jornada. Verifique se o slug já existe."
      );

      return;
    }

    navigate(`/dashboard/journeys/${data.id}/edit`);
  }

  return (
    <MainLayout>
      <Header isAuthenticated />

      <section className={styles.page}>
        <div className={styles.container}>
          <div className={styles.header}>
            <Badge>NOVA JORNADA</Badge>

            <Title size="bg">
              Criar trilha corporativa
            </Title>

            <Subtitle>
              Cadastre uma nova jornada personalizada para treinamentos e
              eventos.
            </Subtitle>
          </div>

          <form className={styles.form} onSubmit={handleSubmit}>
            <div className={styles.grid}>
              <Input
                label="Empresa"
                name="company"
                placeholder="Nome da empresa"
                value={form.company}
                onChange={handleChange}
              />

              <Input
                label="Slug"
                name="slug"
                placeholder="empresa-lideranca"
                value={form.slug}
                onChange={handleChange}
              />
            </div>

            <div className={styles.grid}>
              <Select
                label="Tipo da jornada"
                name="type"
                value={form.type}
                onChange={handleChange}
                options={[
                  "Workshop",
                  "Treinamento",
                  "Certificação",
                  "Mentoria",
                  "Onboarding",
                  "Capacitação",
                  "Imersão",
                  "Bootcamp",
                  "Outro",
                ]}
              />

              {form.type === "Outro" && (
                <Input
                  label="Tipo personalizado"
                  name="customType"
                  placeholder="Ex: Residência"
                  value={form.customType}
                  onChange={handleChange}
                />
              )}
            </div>

            <Input
              label="Título da Jornada"
              name="title"
              placeholder="Jornada de Liderança"
              value={form.title}
              onChange={handleChange}
            />

            <Input
              textarea
              label="Descrição"
              name="description"
              placeholder="Descrição da jornada..."
              value={form.description}
              onChange={handleChange}
            />

            {errorMessage && (
              <Subtitle size="sm" variant="error">
                {errorMessage}
              </Subtitle>
            )}

            <div className={styles.actions}>
              <Button
                type="button"
                variant="ghost"
                size="lg"
                onClick={() => navigate("/dashboard")}
              >
                Cancelar
              </Button>

              <Button type="submit" size="lg">
                Criar Jornada
              </Button>
            </div>
          </form>
        </div>
      </section>
    </MainLayout>
  );
}