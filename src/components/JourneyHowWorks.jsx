import { motion } from "framer-motion";

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
    <motion.section
      className={styles.section}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >

      <div className={styles.container}>

        <motion.div
          className={styles.header}
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45 }}
        >

          <Badge>
            COMO FUNCIONA
          </Badge>

          <Title size="bg">
            Jornadas automáticas
            <span> com o mesmo template</span>
          </Title>

          <Subtitle
            size="bg"
            variant="light"
          >
            Crie experiências visuais padronizadas
            para treinamentos corporativos com
            trilhas personalizadas para cada empresa.
          </Subtitle>

        </motion.div>

        <div className={styles.grid}>

          {steps.map((step, index) => (

            <motion.article
              key={index}
              className={styles.card}

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
                scale: 1.02,
              }}

              viewport={{ once: true }}

              transition={{
                duration: 0.35,
                delay: index * 0.12,
              }}
            >

              <motion.div
                className={styles.icon}

                initial={{
                  scale: 0.7,
                  opacity: 0,
                }}

                whileInView={{
                  scale: 1,
                  opacity: 1,
                }}

                viewport={{ once: true }}

                transition={{
                  duration: 0.3,
                  delay: 0.15 + index * 0.12,
                }}
              >
                {step.icon}
              </motion.div>

              <Title>
                {step.title}
              </Title>

              <Subtitle variant="light">
                {step.description}
              </Subtitle>

              <motion.span
                className={styles.number}

                initial={{
                  opacity: 0,
                  scale: 0.8,
                }}

                whileInView={{
                  opacity: 1,
                  scale: 1,
                }}

                viewport={{ once: true }}

                transition={{
                  delay: 0.25 + index * 0.12,
                }}
              >
                0{index + 1}
              </motion.span>

            </motion.article>

          ))}

        </div>

      </div>

    </motion.section>
  );
}