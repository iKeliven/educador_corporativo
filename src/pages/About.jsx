import styles from "./About.module.css";

import MainLayout from "../layouts/MainLayout";
import Header from "../components/Header";

import Badge from "../components/UI/Badge";
import Title from "../components/UI/Title";
import Subtitle from "../components/UI/Subtitle";
import Button from "../components/UI/Button";

import AboutImg from "../assets/About.jpg";

import {
  LuBookOpen,
  LuLink,
  LuLayoutTemplate,
  LuPanelTop,
  LuPenLine,
  LuRocket,
  LuUsers,
  LuMonitorSmartphone,
  LuGraduationCap,
  LuBriefcase,
  LuBuilding2,
  LuTarget,
  LuSparkles,
} from "react-icons/lu";

export default function About() {
  const features = [
    {
      icon: <LuBookOpen />,
      title: "Jornadas personalizadas",
      text: "Criação de jornadas corporativas adaptadas para cada empresa.",
    },
    {
      icon: <LuPenLine />,
      title: "Edição de trilhas",
      text: "Cadastro e edição de trilhas de aprendizagem de forma simples.",
    },
    {
      icon: <LuLink />,
      title: "Links exclusivos",
      text: "Cada jornada gera um link único para compartilhamento.",
    },
    {
      icon: <LuLayoutTemplate />,
      title: "Infográfico interativo",
      text: "Estrutura visual padronizada em formato de infográfico.",
    },
    {
      icon: <LuPanelTop />,
      title: "Painel administrativo",
      text: "Gerenciamento dos conteúdos em uma área restrita.",
    },
    {
      icon: <LuMonitorSmartphone />,
      title: "Responsivo",
      text: "Experiência adaptada para desktop, tablets e celulares.",
    },
  ];

  const audiences = [
    { icon: <LuBriefcase />, label: "Consultorias" },
    { icon: <LuGraduationCap />, label: "Educação corporativa" },
    { icon: <LuUsers />, label: "Instrutores" },
    { icon: <LuBuilding2 />, label: "RHs" },
    { icon: <LuRocket />, label: "Onboarding de equipes" },
    { icon: <LuTarget />, label: "Programas de capacitação" },
  ];

  return (
    <MainLayout>
      <Header />

      <section className={styles.hero}>
        <div className={styles.container}>
          <div className={styles.heroContent}>
            <Badge>Sobre a plataforma</Badge>

            <Title size="bg" highlight="corporativa">
              Jornada visual para aprendizagem
            </Title>

            <Subtitle size="md" variant="light">
              Uma plataforma para transformar treinamentos corporativos em
              experiências visuais interativas, organizadas e fáceis de
              compartilhar.
            </Subtitle>

            <div className={styles.heroActions}>
              <Button size="lg">Criar jornada</Button>

              <Button size="lg" variant="secondary">
                Ver exemplo
              </Button>
            </div>
          </div>

          <div className={styles.heroVisual}>
            <div className={styles.mockup}>
              <div className={styles.mockupHeader}>
                <span></span>
                <span></span>
                <span></span>
              </div>

              <div className={styles.mockupBody}>
                <div className={styles.timelineLine}></div>

                <div className={`${styles.mockupCard} ${styles.left}`}>
                  <strong>01</strong>
                  <Subtitle size="lg" variant="light">
                    Introdução
                  </Subtitle>
                </div>

                <div className={`${styles.mockupCard} ${styles.right}`}>
                  <strong>02</strong>
                  <Subtitle size="lg" variant="light">
                    Atividade
                  </Subtitle>
                </div>

                <div className={`${styles.mockupCard} ${styles.left}`}>
                  <strong>03</strong>
                  <Subtitle size="lg" variant="light">
                    Certificação
                  </Subtitle>
                </div>
              </div>
            </div>

            <div className={styles.floatingIcon}>
              <LuSparkles />
            </div>
          </div>
        </div>
      </section>

      <section className={styles.textSection}>
        <img
          src={AboutImg}
          alt="Evento Corporativo"
          className={styles.imgSection}
        />

        <div className={styles.textContainer}>
          <Subtitle size="sm" variant="light">
            A plataforma foi desenvolvida para transformar treinamentos
            corporativos em experiências visuais interativas e organizadas.
          </Subtitle>

          <Subtitle size="sm" variant="light">
            Por meio de um sistema simples de gerenciamento, é possível criar
            jornadas de aprendizagem personalizadas para cada empresa,
            centralizando conteúdos, materiais, atividades, links, vídeos e
            trilhas de desenvolvimento em um único ambiente.
          </Subtitle>

          <Subtitle size="sm" variant="light">
            Cada jornada gera um link exclusivo, permitindo compartilhar
            facilmente o infográfico com participantes, equipes e colaboradores.
          </Subtitle>
        </div>
      </section>

      <section className={styles.proposal}>
        <div className={styles.container}>
          <div className={styles.sectionHeader}>
            <Badge>Proposta</Badge>

            <Title size="bg">O que a plataforma une</Title>
          </div>

          <div className={styles.proposalGrid}>
            <div>
              <Subtitle size="bg" align="center" variant="gold" weight="bold">
                Organização de conteúdos
              </Subtitle>
            </div>

            <div>
              <Subtitle size="bg" align="center" variant="gold" weight="bold">
                Experiência visual moderna
              </Subtitle>
            </div>

            <div>
              <Subtitle size="bg" align="center"  variant="gold" weight="bold">
                Facilidade de edição
              </Subtitle>
            </div>

            <div>
              <Subtitle size="bg" align="center"  variant="gold" weight="bold">
                Padronização de treinamentos
              </Subtitle>
            </div>

            <div>
              <Subtitle size="bg" align="center"  variant="gold" weight="bold">
                Autonomia para gestão das trilhas
              </Subtitle>
            </div>
          </div>
        </div>
      </section>

      <section className={styles.features}>
        <div className={styles.container}>
          <div className={styles.sectionHeader}>
            <Badge>Funcionalidades</Badge>

            <Title size="bg">Principais recursos</Title>

            <Subtitle size="bg" variant="light">
              Tudo que a professora precisa para criar, editar e compartilhar
              jornadas corporativas.
            </Subtitle>
          </div>

          <div className={styles.featureGrid}>
            {features.map((item, index) => (
              <article key={index} className={styles.featureCard}>
                <div className={styles.icon}>{item.icon}</div>

                <Title size="md">{item.title}</Title>

                <Subtitle size="md" variant="light">
                  {item.text}
                </Subtitle>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.objective}>
        <div className={styles.objectiveCard}>
          <div className={styles.objectiveIcon}>
            <LuTarget />
          </div>

          <div>
            <Badge>Objetivo</Badge>

            <Title size="bg">
              Facilitar a gestão e distribuição de conteúdos educacionais
              corporativos.
            </Title>

            <Subtitle size="bg" variant="light">
              Tornando a aprendizagem mais acessível, visual e organizada para
              empresas, equipes e participantes.
            </Subtitle>
          </div>
        </div>
      </section>

      <section className={styles.audience}>
        <div className={styles.container}>
          <div className={styles.sectionHeader}>
            <Badge>Público-alvo</Badge>

            <Title size="bg">Para quem foi pensada</Title>
          </div>

          <div className={styles.audienceGrid}>
            {audiences.map((item, index) => (
              <div key={index} className={styles.audienceItem}>
                <span>{item.icon}</span>

                <Subtitle size="bg" variant="light">
                  {item.label}
                </Subtitle>
              </div>
            ))}
          </div>
        </div>
      </section>
    </MainLayout>
  );
}