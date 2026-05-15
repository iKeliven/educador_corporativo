import styles from "./HeroJourney.module.css";
import Button from "./UI/Button";
import logo from "../assets/logo.png";
import senai from "../assets/senai.png";
import Badge from "./UI/Badge";
import Title from "./UI/Title";
import Subtitle from "./UI/Subtitle";
import StatCard from "./UI/StatCard";

export default function HeroJourney({
  badge = "CERTIFICAÇÃO",
  title,
  highlight,
  subtitle,
  cta = "Acessar jornada",
  stats = [],
}) {
  return (
    <section className={styles.hero}>
      <div className={styles.container}>
        <div className={styles.left}>
          <div className={styles.content}>
            <div className={styles.logo}>
              <img src={logo} alt="Educação Corporativa Senai" />
            </div>

            <Badge>{badge}</Badge>

            <Title size="lg" highlight={highlight}>
              {title}
            </Title>

            <Subtitle size="bg" variant="light">
              {subtitle}
            </Subtitle>

            <Button size="lg">
              {cta}
            </Button>
          </div>

          <div className={styles.stats}>
            {stats.map((stat, index) => (
              <StatCard
                key={index}
                icon={stat.icon}
                strong={stat.strong}
                text={stat.text}
              />
            ))}
          </div>

          <img className={styles.senaiLeft} src={senai} alt="Senai" />
        </div>

        <div className={styles.right}>
          <img className={styles.senai} src={senai} alt="Senai" />
        </div>
      </div>
    </section>
  );
}