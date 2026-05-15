// components/JourneyHowWorks/JourneyHowWorks.jsx

import styles from "./JourneyHowWorks.module.css";

import Badge from "./UI/Badge";
import Title from "./UI/Title";
import Subtitle from "./UI/Subtitle";

import {
  LuLayoutTemplate,
  LuPencil,
  LuSend,
} from "react-icons/lu";

export default function JourneyHowWorks() {
  const steps = [
    {
      icon: <LuLayoutTemplate />,
      title: "Template Inteligente",
      description:
        "Todas as jornadas utilizam o mesmo modelo visual, mantendo consistência e identidade corporativa.",
    },

    {
      icon: <LuPencil />,
      title: "Personalização",
      description:
        "Edite trilhas, conteúdos, links, materiais e descrições para cada empresa de forma simples.",
    },

    {
      icon: <LuSend />,
      title: "Compartilhamento",
      description:
        "A plataforma gera um link exclusivo da jornada para ser enviado aos participantes.",
    },
  ];

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.header}>
          <Badge>
            COMO FUNCIONA
          </Badge>

          <Title size="bg">
            Jornadas automáticas
            <span> com o mesmo template</span>
          </Title>

          <Subtitle size="md">
            Crie experiências visuais padronizadas
            para treinamentos corporativos com
            trilhas personalizadas para cada empresa.
          </Subtitle>
        </div>

        <div className={styles.grid}>
          {steps.map((step, index) => (
            <article
              key={index}
              className={styles.card}
            >
              <div className={styles.icon}>
                {step.icon}
              </div>

              <Title >
                {step.title}
              </Title>

              <Subtitle variant="light">
                {step.description}
              </Subtitle>

              <span className={styles.number}>
                0{index + 1}
              </span>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}