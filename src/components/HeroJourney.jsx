import { Link } from "react-router-dom";
import { motion } from "framer-motion";

import styles from "./HeroJourney.module.css";

import Button from "./UI/Button";
import Badge from "./UI/Badge";
import Title from "./UI/Title";
import Subtitle from "./UI/Subtitle";
import StatCard from "./UI/StatCard";

import logo from "../assets/logo.png";
import senai from "../assets/senai.png";

export default function HeroJourney({
  badge = "JORNADA",
  title,
  highlight,
  subtitle,
  cta = "Acessar jornada",
  ctaLink = "/",
  stats = [],
}) {
  const isAnchorLink = ctaLink?.startsWith("#");

  return (
    <motion.section
      className={styles.hero}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      <div className={styles.container}>
        <motion.div
          className={styles.left}
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className={styles.content}>
            <motion.div
              className={styles.logo}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              <img src={logo} alt="Educação Corporativa" />
            </motion.div>

            <Badge>{badge}</Badge>

            <Title size="bg" highlight={highlight}>
              {title}
            </Title>

            <Subtitle size="bg" variant="light">
              {subtitle}
            </Subtitle>

            {isAnchorLink ? (
              <a href={ctaLink}>
                <Button type="button" size="lg">
                  {cta}
                </Button>
              </a>
            ) : (
              <Link to={ctaLink}>
                <Button type="button" size="lg">
                  {cta}
                </Button>
              </Link>
            )}
          </div>

          {stats.length > 0 && (
            <div className={styles.stats}>
              {stats.map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 + index * 0.1 }}
                >
                  <StatCard
                    icon={stat.icon}
                    strong={stat.strong}
                    text={stat.text}
                  />
                </motion.div>
              ))}
            </div>
          )}

          <img className={styles.senaiLeft} src={senai} alt="Senai" />
        </motion.div>

        <motion.div
          className={styles.right}
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <img className={styles.senai} src={senai} alt="Senai" />
        </motion.div>
      </div>
    </motion.section>
  );
}