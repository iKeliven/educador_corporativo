import styles from "./Dashboard.module.css";

import Button from "../components/UI/Button";
import MainLayout from "../layouts/MainLayout";
import Header from "../components/Header";
import Card from "../components/Card";
import Badge from "../components/UI/Badge";
import Title from "../components/UI/Title";
import Subtitle from "../components/UI/Subtitle";

export default function Dashboard() {
  const journeys = [
    {
      id: 1,
      company: "SENAI",
      title: "Jornada de Liderança",
      slug: "senai-lideranca",
      count: 5,
    },
    {
      id: 2,
      company: "Empresa XPTO",
      title: "Trilha de Cultura Organizacional",
      slug: "empresa-xpto-cultura",
      count: 3,
    },
  ];

  return (
    <MainLayout>
      <Header />

      <div className={styles.container}>
        <header className={styles.header}>
          <div>
            <Badge>Painel administrativo</Badge>
            <Title size="bg">Jornadas cadastradas</Title>
            <Subtitle variant="light" size="bg">
              Gerencie os infográficos enviados para cada empresa.
            </Subtitle>
          </div>

          <Button size="lg">Nova Jornada</Button>
        </header>

        <section className={styles.grid}>
          {journeys.map((journey) => (
            <Card
              key={journey.id}
              journey={journey}
            />
          ))}
        </section>
      </div>
    </MainLayout>
  );
}