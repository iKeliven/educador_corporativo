import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

import styles from "./EditJourney.module.css";

import MainLayout from "../layouts/MainLayout";
import Header from "../components/Header";

import Button from "../components/UI/Button";
import Badge from "../components/UI/Badge";
import Title from "../components/UI/Title";
import Subtitle from "../components/UI/Subtitle";
import Input from "../components/UI/Input";
import Select from "../components/UI/Select";
import Loading from "../components/UI/Loading";

import JourneyTrailModal from "../components/JourneyTrailModal";

import { supabase } from "../services/supabase";

export default function EditJourney() {
  const { id } = useParams();

  const [journey, setJourney] = useState(null);
  const [trails, setTrails] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTrail, setSelectedTrail] = useState(null);
  const [copied, setCopied] = useState(false);
  const [confirmDeleteTrail, setConfirmDeleteTrail] = useState(null);

  const typeOptions = [
    "Workshop",
    "Treinamento",
    "Certificação",
    "Mentoria",
    "Onboarding",
    "Capacitação",
    "Imersão",
    "Bootcamp",
    "Outro",
  ];

  useEffect(() => {
    async function loadJourney() {
      const { data, error } = await supabase
        .from("journeys")
        .select(`
          *,
          trails (*)
        `)
        .eq("id", id)
        .order("order_number", {
          foreignTable: "trails",
          ascending: true,
        })
        .single();

      if (error) {
        console.log(error.message);
        return;
      }

      setJourney({
        ...data,
        count: data.trails?.length || 0,
        customType: "",
      });

      setTrails(data.trails || []);
    }

    loadJourney();
  }, [id]);

  function formatDuration(minutes = 0) {
    const total = Number(minutes) || 0;
    const hours = Math.floor(total / 60);
    const remaining = total % 60;

    if (hours && remaining) return `${hours}h ${remaining}min`;
    if (hours) return `${hours}h`;

    return `${remaining}min`;
  }

  function calculateWorkload() {
    const totalMinutes = trails.reduce(
      (acc, trail) => acc + (Number(trail.duration_minutes) || 0),
      0
    );

    return formatDuration(totalMinutes);
  }

  function handleJourneyChange(event) {
    const { name, value } = event.target;

    setJourney((current) => ({
      ...current,
      [name]: value,
    }));
  }

  async function handleUpdateJourney(event) {
    event.preventDefault();

    const isCustomType =
      journey.type && !typeOptions.includes(journey.type);

    const finalType =
      journey.type === "Outro"
        ? journey.customType
        : isCustomType
        ? journey.customType || journey.type
        : journey.type;

    const { error } = await supabase
      .from("journeys")
      .update({
        company: journey.company,
        title: journey.title,
        slug: journey.slug,
        description: journey.description,
        type: finalType,
      })
      .eq("id", id);

    if (error) {
      console.log(error.message);
      return;
    }

    alert("Jornada atualizada com sucesso!");
  }

  function openCreateTrail() {
    setSelectedTrail(null);
    setIsModalOpen(true);
  }

  function openEditTrail(trail) {
    setSelectedTrail(trail);
    setIsModalOpen(true);
  }

  function closeModal() {
    setSelectedTrail(null);
    setIsModalOpen(false);
  }

  async function deleteTrail(trailId) {
    const { error } = await supabase
      .from("trails")
      .delete()
      .eq("id", trailId);

    if (error) {
      console.log(error.message);
      return;
    }

    setTrails((current) =>
      current.filter((trail) => trail.id !== trailId)
    );

    setJourney((current) => ({
      ...current,
      count: Math.max((current.count || 1) - 1, 0),
    }));

    setConfirmDeleteTrail(null);
  }

  function handleTrailSaved(savedTrail) {
    if (selectedTrail) {
      setTrails((current) =>
        current
          .map((trail) =>
            trail.id === savedTrail.id ? savedTrail : trail
          )
          .sort((a, b) => a.order_number - b.order_number)
      );
    } else {
      setTrails((current) =>
        [...current, savedTrail].sort(
          (a, b) => a.order_number - b.order_number
        )
      );

      setJourney((current) => ({
        ...current,
        count: (current.count || 0) + 1,
      }));
    }

    closeModal();
  }

  async function copyJourneyLink() {
    const link = `${window.location.origin}/jornada/${journey.slug}`;

    await navigator.clipboard.writeText(link);

    setCopied(true);

    setTimeout(() => {
      setCopied(false);
    }, 2000);
  }

  if (!journey) {
    return (
      <MainLayout>
        <Header isAuthenticated />
        <Loading />
      </MainLayout>
    );
  }

  const calculatedWorkload = calculateWorkload();
  const publicJourneyLink = `/jornada/${journey.slug}`;

  const isCustomType =
    journey.type && !typeOptions.includes(journey.type);

  const selectTypeValue =
    isCustomType ? "Outro" : journey.type || "";

  const customTypeValue =
    journey.customType || (isCustomType ? journey.type : "");

  return (
    <MainLayout>
      <Header isAuthenticated />

      <motion.section
        className={styles.page}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4 }}
      >
        <div className={styles.container}>
          <motion.div
            className={styles.header}
            initial={{ opacity: 0, y: -24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <div>
              <Badge>EDITOR DA JORNADA</Badge>

              <Title size="bg">Editar jornada</Title>

              <Subtitle variant="light">
                Atualize as informações principais e organize as trilhas que
                aparecem no infográfico.
              </Subtitle>
            </div>

            <Link to={publicJourneyLink} target="_blank">
              <Button type="button" size="sm" variant="secondary">
                Visualizar jornada
              </Button>
            </Link>
          </motion.div>

          <div className={styles.contentGrid}>
            <div>
              <motion.div
                className={styles.shareBox}
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1, duration: 0.4 }}
              >
                <div>
                  <Title size="md" highlight={journey.title}>
                    Jornada:
                  </Title>

                  <Subtitle size="sm" variant="light">
                    Copie e compartilhe este link com os participantes da
                    jornada.
                  </Subtitle>

                  <div className={styles.shareLink}>
                    {window.location.origin}/jornada/{journey.slug}
                  </div>

                  {copied && (
                    <Subtitle size="sm" variant="success">
                      Link copiado com sucesso!
                    </Subtitle>
                  )}
                </div>

                <div className={styles.shareActions}>
                  <Link to={publicJourneyLink} target="_blank">
                    <Button type="button" size="sm" variant="secondary">
                      Visualizar
                    </Button>
                  </Link>

                  <Button type="button" size="sm" onClick={copyJourneyLink}>
                    Copiar link
                  </Button>
                </div>
              </motion.div>

              <motion.form
                className={styles.form}
                onSubmit={handleUpdateJourney}
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.4 }}
              >
                <div className={styles.formHeader}>
                  <Title size="md">Informações da jornada</Title>

                  <Subtitle size="md" variant="light">
                    Esses dados aparecem no cabeçalho do infográfico.
                  </Subtitle>
                </div>

                <div className={styles.grid}>
                  <Input
                    label="Empresa"
                    name="company"
                    value={journey.company || ""}
                    onChange={handleJourneyChange}
                  />

                  <Input
                    label="Slug"
                    name="slug"
                    value={journey.slug || ""}
                    onChange={handleJourneyChange}
                  />
                </div>

                <div className={styles.grid}>
                  <Select
                    label="Tipo da jornada"
                    name="type"
                    value={selectTypeValue}
                    onChange={(event) => {
                      const value = event.target.value;

                      setJourney((current) => ({
                        ...current,
                        type: value,
                        customType:
                          value === "Outro" ? customTypeValue : "",
                      }));
                    }}
                    options={typeOptions}
                  />

                  <Input
                    label="Carga horária total"
                    value={calculatedWorkload}
                    disabled
                  />
                </div>

                {(selectTypeValue === "Outro" || isCustomType) && (
                  <Input
                    label="Tipo personalizado"
                    name="customType"
                    placeholder="Ex: Residência"
                    value={customTypeValue}
                    onChange={(event) =>
                      setJourney((current) => ({
                        ...current,
                        customType: event.target.value,
                      }))
                    }
                  />
                )}

                <Input
                  label="Título"
                  name="title"
                  value={journey.title || ""}
                  onChange={handleJourneyChange}
                />

                <Input
                  textarea
                  label="Descrição"
                  name="description"
                  value={journey.description || ""}
                  onChange={handleJourneyChange}
                />

                <div className={styles.actions}>
                  <Button type="button" size="sm" variant="ghost">
                    Cancelar
                  </Button>

                  <Button type="submit" size="sm">
                    Salvar alterações
                  </Button>
                </div>
              </motion.form>
            </div>

            <motion.aside
              className={styles.trailsPanel}
              initial={{ opacity: 0, x: 32 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3, duration: 0.4 }}
            >
              <div className={styles.trailsHeader}>
                <div>
                  <Title size="md">Trilhas cadastradas</Title>

                  <Subtitle size="sm" variant="light">
                    {trails.length} trilhas no infográfico
                  </Subtitle>
                </div>

                <Button type="button" size="sm" onClick={openCreateTrail}>
                  + Add trilha
                </Button>
              </div>

              <div className={styles.trailsList}>
                {trails.length === 0 && (
                  <div className={styles.empty}>
                    <Subtitle size="sm" variant="light">
                      Nenhuma trilha cadastrada ainda.
                    </Subtitle>
                  </div>
                )}

                <AnimatePresence>
                  {trails.map((trail, index) => (
                    <motion.article
                      key={trail.id}
                      className={styles.trailItem}
                      initial={{ opacity: 0, y: 24 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      whileHover={{ y: -4 }}
                      transition={{
                        duration: 0.25,
                        delay: index * 0.04,
                      }}
                    >
                      <div className={styles.trailNumber}>
                        {trail.order_number}
                      </div>

                      <div className={styles.trailBody}>
                        <div>
                          <Title size="sm">{trail.title}</Title>

                          <Subtitle size="sm" variant="light">
                            {trail.description}
                          </Subtitle>
                        </div>

                        <Badge>
                          {formatDuration(trail.duration_minutes)}
                        </Badge>
                      </div>

                      <div className={styles.footer}>
                        {(trail.date || trail.hour) && (
                          <div className={styles.trailMeta}>
                            {trail.date && <span>{trail.date}</span>}
                            {trail.date && trail.hour && <span>às</span>}
                            {trail.hour && <span>{trail.hour}</span>}
                          </div>
                        )}

                        <div className={styles.trailActions}>
                          <Button
                            type="button"
                            size="sm"
                            variant="secondary"
                            onClick={() => openEditTrail(trail)}
                          >
                            Editar
                          </Button>

                          <Button
                            type="button"
                            size="sm"
                            variant="ghost"
                            onClick={() => setConfirmDeleteTrail(trail.id)}
                          >
                            Excluir
                          </Button>
                        </div>
                      </div>

                      <AnimatePresence>
                        {confirmDeleteTrail === trail.id && (
                          <motion.div
                            className={styles.confirmOverlay}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                          >
                            <motion.div
                              className={styles.confirmBox}
                              initial={{ scale: 0.9, opacity: 0 }}
                              animate={{ scale: 1, opacity: 1 }}
                              exit={{ scale: 0.9, opacity: 0 }}
                              transition={{ duration: 0.2 }}
                            >
                              <h3 className={styles.confirmTitle}>
                                Excluir trilha
                              </h3>

                              <p className={styles.confirmText}>
                                Tem certeza que deseja excluir esta trilha? Esta
                                ação não poderá ser desfeita.
                              </p>

                              <div className={styles.confirmActions}>
                                <Button
                                  type="button"
                                  size="sm"
                                  variant="success"
                                  onClick={() => setConfirmDeleteTrail(null)}
                                >
                                  Cancelar
                                </Button>

                                <Button
                                  type="button"
                                  size="sm"
                                  variant="error"
                                  onClick={() => deleteTrail(trail.id)}
                                >
                                  Confirmar excluir
                                </Button>
                              </div>
                            </motion.div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </motion.article>
                  ))}
                </AnimatePresence>
              </div>
            </motion.aside>
          </div>
        </div>
      </motion.section>

      <JourneyTrailModal
        isOpen={isModalOpen}
        onClose={closeModal}
        mode={selectedTrail ? "edit" : "create"}
        trail={selectedTrail}
        journeyId={id}
        onSave={handleTrailSaved}
      />
    </MainLayout>
  );
}