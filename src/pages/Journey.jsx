import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { motion } from "framer-motion";

import MainLayout from "../layouts/MainLayout";
import HeroJourney from "../components/HeroJourney";
import Loading from "../components/UI/Loading";
import Title from "../components/UI/Title";
import Subtitle from "../components/UI/Subtitle";
import Button from "../components/UI/Button";
import Badge from "../components/UI/Badge";

import styles from "./Journey.module.css";

import { supabase } from "../services/supabase";

import {
  LuGraduationCap,
  LuBookOpen,
  LuClock3,
} from "react-icons/lu";

export default function Journey() {
  const { slug } = useParams();

  const [journey, setJourney] = useState(null);
  const [trails, setTrails] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    async function loadJourney() {
      try {
        setLoading(true);

        const { data, error } = await supabase
          .from("journeys")
          .select(`
    *,
    trails (*)
  `)
          .eq("slug", slug)
          .single();

        if (error || !data) {
          setErrorMessage("Jornada não encontrada.");
          return;
        }

        const orderedTrails =
          (data.trails || []).sort(
            (a, b) =>
              a.order_number - b.order_number
          );

        setJourney(data);
        setTrails(orderedTrails);
      } finally {
        setLoading(false);
      }
    }

    loadJourney();
  }, [slug]);

  function formatDuration(minutes = 0) {
    const total = Number(minutes) || 0;
    const hours = Math.floor(total / 60);
    const remaining = total % 60;

    if (hours && remaining) return `${hours}h ${remaining}min`;
    if (hours) return `${hours}h`;
    return `${remaining}min`;
  }

  const totalMinutes = trails.reduce(
    (total, trail) => total + (Number(trail.duration_minutes) || 0),
    0
  );

  if (loading && !journey) {
    return (
      <MainLayout>
        <Loading />
      </MainLayout>
    );
  }

  if (errorMessage) {
    return (
      <MainLayout>
        <motion.div
          className={styles.message}
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <Title size="md">{errorMessage}</Title>
        </motion.div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <HeroJourney
        badge={journey.company || "JORNADA"}
        title={journey.title}
        subtitle={journey.description}
        cta="Iniciar jornada"
        ctaLink="#start"
        stats={[
          {
            icon: <LuBookOpen />,
            strong: trails.length,
            text: "TRILHAS",
          },
          {
            icon: <LuClock3 />,
            strong: formatDuration(totalMinutes),
            text: "CARGA HORÁRIA",
          },
          {
            icon: <LuGraduationCap />,
            strong: "Certificado",
            text: journey.type || "PADRÃO",
          },
        ]}
      />

      <section
        className={styles.timeline}
        id="start"

      >
        <div
          className={styles.line}

        />

        <div
          className={styles.start}

        >
          Início
        </div>

        {trails.map((trail, index) => (
          <div
            key={trail.id}
            className={`
              ${styles.item}
              ${index % 2 === 0 ? styles.left : styles.right}
            `}
            initial={{
              opacity: 0,
              x: index % 2 === 0 ? -50 : 50,
            }}
            whileInView={{
              opacity: 1,
              x: 0,
            }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{
              duration: 0.45,
              delay: index * 0.08,
            }}
          >
            <motion.div
              className={styles.number}
              initial={{ scale: 0.7, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: index * 0.08 }}
            >
              {index + 1}
            </motion.div>

            <motion.article
              className={styles.card}
              whileHover={{ y: -6 }}
              transition={{ duration: 0.25 }}
            >
              <div className={styles.header}>
                <Badge>Trilha {index + 1}</Badge>

                <Badge variant="ghost">
                  {formatDuration(trail.duration_minutes)}
                </Badge>
              </div>

              <div className={styles.content}>
                <Title size="md">{trail.title}</Title>

                <Subtitle size="sm" variant="light">
                  {trail.description}
                </Subtitle>
              </div>

              <div className={styles.info}>
                {trail.date && (
                  <Subtitle size="sm" variant="gold">
                    {trail.date} às {trail.hour}
                  </Subtitle>
                )}

                {trail.link && (
                  <a
                    href={trail.link}
                    target="_blank"
                    rel="noreferrer"
                  >
                    <Button type="button" size="sm">
                      Acessar Conteúdo
                    </Button>
                  </a>
                )}
              </div>
            </motion.article>
          </div>
        ))}
      </section>
    </MainLayout>
  );
}