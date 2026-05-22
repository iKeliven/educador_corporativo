import { motion } from "framer-motion";

import styles from "./About.module.css";

import MainLayout from "../layouts/MainLayout";
import Header from "../components/Header";

import Badge from "../components/UI/Badge";
import Title from "../components/UI/Title";
import Subtitle from "../components/UI/Subtitle";
import Button from "../components/UI/Button";

import aboutImg from "../assets/about.jpg";

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

      {/* HERO */}
      <motion.section
        className={styles.hero}

        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}

        transition={{ duration: 0.5 }}
      >

        <div className={styles.container}>

          <motion.div
            className={styles.heroContent}

            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}

            transition={{ duration: 0.5 }}
          >

            <Badge>
              Sobre a plataforma
            </Badge>

            <Title
              size="bg"
              highlight="corporativa"
            >
              Jornada visual para aprendizagem
            </Title>

            <Subtitle
              size="md"
              variant="light"
            >
              Uma plataforma para transformar treinamentos corporativos em
              experiências visuais interativas, organizadas e fáceis de
              compartilhar.
            </Subtitle>

            <div className={styles.heroActions}>

              {/*<Button size="lg">
                Criar jornada
              </Button>*/}

              <a
                href="https://educadorcoporativo.netlify.app/jornada/lideranca"
                target="_blank"
                rel="noreferrer"
              >
                <Button
                  size="lg"
                  variant="secondary"
                >
                  Ver exemplo
                </Button>
              </a>

            </div>

          </motion.div>

          <motion.div
            className={styles.heroVisual}

            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}

            transition={{
              duration: 0.5,
              delay: 0.15,
            }}
          >

            <motion.div
              className={styles.mockup}

              whileHover={{
                y: -8,
              }}

              transition={{ duration: 0.3 }}
            >

              <div className={styles.mockupHeader}>
                <span></span>
                <span></span>
                <span></span>
              </div>

              <div className={styles.mockupBody}>

                <div className={styles.timelineLine}></div>

                <motion.div
                  className={`${styles.mockupCard} ${styles.left}`}

                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}

                  viewport={{ once: true }}

                  transition={{ delay: 0.1 }}
                >

                  <strong>01</strong>

                  <Subtitle
                    size="lg"
                    variant="light"
                  >
                    Introdução
                  </Subtitle>

                </motion.div>

                <motion.div
                  className={`${styles.mockupCard} ${styles.right}`}

                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}

                  viewport={{ once: true }}

                  transition={{ delay: 0.2 }}
                >

                  <strong>02</strong>

                  <Subtitle
                    size="lg"
                    variant="light"
                  >
                    Atividade
                  </Subtitle>

                </motion.div>

                <motion.div
                  className={`${styles.mockupCard} ${styles.left}`}

                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}

                  viewport={{ once: true }}

                  transition={{ delay: 0.3 }}
                >

                  <strong>03</strong>

                  <Subtitle
                    size="lg"
                    variant="light"
                  >
                    Certificação
                  </Subtitle>

                </motion.div>

              </div>

            </motion.div>

            <motion.div
              className={styles.floatingIcon}

              animate={{
                y: [0, -10, 0],
              }}

              transition={{
                repeat: Infinity,
                duration: 2.5,
              }}
            >
              <LuSparkles />
            </motion.div>

          </motion.div>

        </div>

      </motion.section>

      {/* TEXTO */}
      <motion.section
        className={styles.textSection}

        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}

        viewport={{ once: true }}

        transition={{ duration: 0.45 }}
      >

        <img
          src={aboutImg}
          alt="Evento Corporativo"
          className={styles.imgSection}
        />

        <div className={styles.textContainer}>

          <Subtitle
            size="md"
            variant="light"
          >
            A plataforma foi desenvolvida para transformar treinamentos
            corporativos em experiências visuais interativas e organizadas.
          </Subtitle>

          <Subtitle
            size="md"
            variant="light"
          >
            Por meio de um sistema simples de gerenciamento, é possível criar
            jornadas de aprendizagem personalizadas para cada empresa,
            centralizando conteúdos, materiais, atividades, links, vídeos e
            trilhas de desenvolvimento em um único ambiente.
          </Subtitle>

          <Subtitle
            size="md"
            variant="light"
          >
            Cada jornada gera um link exclusivo, permitindo compartilhar
            facilmente o infográfico com participantes, equipes e colaboradores.
          </Subtitle>

        </div>

      </motion.section>

      {/* PROPOSTA */}
      <motion.section
        className={styles.proposal}

        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}

        viewport={{ once: true }}

        transition={{ duration: 0.5 }}
      >

        <div className={styles.container}>

          <div className={styles.sectionHeader}>

            <Badge>
              Proposta
            </Badge>

            <Title size="bg">
              O que a plataforma une
            </Title>

          </div>

          <div className={styles.proposalGrid}>

            {[
              "Organização de conteúdos",
              "Experiência visual moderna",
              "Facilidade de edição",
              "Padronização de treinamentos",
              "Autonomia para gestão das trilhas",
            ].map((item, index) => (

              <motion.div
                key={index}

                initial={{
                  opacity: 0,
                  y: 30,
                }}

                whileInView={{
                  opacity: 1,
                  y: 0,
                }}

                viewport={{ once: true }}

                transition={{
                  delay: index * 0.08,
                }}
              >

                <Subtitle
                  size="bg"
                  align="center"
                  variant="gold"
                  weight="bold"
                >
                  {item}
                </Subtitle>

              </motion.div>

            ))}

          </div>

        </div>

      </motion.section>

      {/* FEATURES */}
      <section className={styles.features}>

        <div className={styles.container}>

          <motion.div
            className={styles.sectionHeader}

            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}

            viewport={{ once: true }}
          >

            <Badge>
              Funcionalidades
            </Badge>

            <Title size="bg">
              Principais recursos
            </Title>

            <Subtitle
              size="bg"
              variant="light"
            >
              Tudo que a professora precisa para criar, editar e compartilhar
              jornadas corporativas.
            </Subtitle>

          </motion.div>

          <div className={styles.featureGrid}>

            {features.map((item, index) => (

              <motion.article
                key={index}
                className={styles.featureCard}

                initial={{
                  opacity: 0,
                  y: 40,
                }}

                whileInView={{
                  opacity: 1,
                  y: 0,
                }}

                whileHover={{
                  y: -8,
                }}

                viewport={{ once: true }}

                transition={{
                  duration: 0.35,
                  delay: index * 0.06,
                }}
              >

                <div className={styles.icon}>
                  {item.icon}
                </div>

                <Title size="md">
                  {item.title}
                </Title>

                <Subtitle
                  size="md"
                  variant="light"
                >
                  {item.text}
                </Subtitle>

              </motion.article>

            ))}

          </div>

        </div>

      </section>

      {/* OBJETIVO */}
      <motion.section
        className={styles.objective}

        initial={{ opacity: 0, scale: 0.96 }}
        whileInView={{ opacity: 1, scale: 1 }}

        viewport={{ once: true }}

        transition={{ duration: 0.45 }}
      >

        <div className={styles.objectiveCard}>

          <div className={styles.objectiveIcon}>
            <LuTarget />
          </div>

          <div>

            <Badge>
              Objetivo
            </Badge>

            <Title size="bg">
              Facilitar a gestão e distribuição de conteúdos educacionais
              corporativos.
            </Title>

            <Subtitle
              size="bg"
              variant="light"
            >
              Tornando a aprendizagem mais acessível, visual e organizada para
              empresas, equipes e participantes.
            </Subtitle>

          </div>

        </div>

      </motion.section>

      {/* PUBLICO */}
      <section className={styles.audience}>

        <div className={styles.container}>

          <motion.div
            className={styles.sectionHeader}

            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}

            viewport={{ once: true }}
          >

            <Badge>
              Público-alvo
            </Badge>

            <Title size="bg">
              Para quem foi pensada
            </Title>

          </motion.div>

          <div className={styles.audienceGrid}>

            {audiences.map((item, index) => (

              <motion.div
                key={index}
                className={styles.audienceItem}

                initial={{
                  opacity: 0,
                  scale: 0.9,
                }}

                whileInView={{
                  opacity: 1,
                  scale: 1,
                }}

                whileHover={{
                  y: -6,
                }}

                viewport={{ once: true }}

                transition={{
                  delay: index * 0.06,
                }}
              >

                <span>
                  {item.icon}
                </span>

                <Subtitle
                  size="bg"
                  variant="light"
                >
                  {item.label}
                </Subtitle>

              </motion.div>

            ))}

          </div>

        </div>

      </section>

    </MainLayout>
  );
}