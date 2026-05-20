import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import styles from "./Dashboard.module.css";

import Button from "../components/UI/Button";
import MainLayout from "../layouts/MainLayout";
import Header from "../components/Header";
import Card from "../components/Card";
import Badge from "../components/UI/Badge";
import Title from "../components/UI/Title";
import Subtitle from "../components/UI/Subtitle";
import Loading from "../components/UI/Loading";

import { supabase } from "../services/supabase";

export default function Dashboard() {
  const navigate = useNavigate();

  const [journeys, setJourneys] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadJourneys() {
      const { data, error } = await supabase
        .from("journeys")
        .select(`
          *,
          trails (
            id
          )
        `)
        .order("created_at", {
          ascending: false,
        });

      if (error) {
        console.log(error.message);
        setLoading(false);
        return;
      }

      const formattedJourneys = data.map((journey) => ({
        ...journey,
        count: journey.trails?.length || 0,
      }));

      setJourneys(formattedJourneys);
      setLoading(false);
    }

    loadJourneys();
  }, []);

  function handleEdit(journey) {
    navigate(`/dashboard/journeys/${journey.id}/edit`);
  }

  function handlePreview(journey) {
    window.open(`/jornada/${journey.slug}`, "_blank");
  }

  async function handleDelete(journey) {
    const { error: trailsError } = await supabase
      .from("trails")
      .delete()
      .eq("journey_id", journey.id);

    if (trailsError) {
      console.log(trailsError.message);
      alert("Erro ao excluir trilhas da jornada.");
      return;
    }

    const { error: journeyError } = await supabase
      .from("journeys")
      .delete()
      .eq("id", journey.id);

    if (journeyError) {
      console.log(journeyError.message);
      alert("Erro ao excluir jornada.");
      return;
    }

    setJourneys((current) =>
      current.filter((item) => item.id !== journey.id)
    );
  }

  if (loading) {
    return (
      <MainLayout>
        <Header isAuthenticated />
        <Loading />
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <Header isAuthenticated />

      <div className={styles.container}>
        <header className={styles.header}>
          <div>
            <Badge>Painel administrativo</Badge>

            <Title size="bg">Jornadas cadastradas</Title>

            <Subtitle variant="light" size="bg">
              Gerencie os infográficos enviados para cada empresa.
            </Subtitle>
          </div>

          <Link to="/dashboard/journeys/new">
            <Button size="lg">
              Nova Jornada
            </Button>
          </Link>
        </header>

        {journeys.length === 0 ? (
          <div className={styles.empty}>
            <Title size="md">
              Nenhuma jornada cadastrada
            </Title>

            <Subtitle size="sm" variant="light">
              Crie sua primeira jornada corporativa.
            </Subtitle>
          </div>
        ) : (
          <section className={styles.grid}>
            {journeys.map((journey) => (
              <Card
                key={journey.id}
                journey={journey}
                onEdit={() => handleEdit(journey)}
                onPreview={() => handlePreview(journey)}
                onDelete={() => handleDelete(journey)}
              />
            ))}
          </section>
        )}
      </div>
    </MainLayout>
  );
}