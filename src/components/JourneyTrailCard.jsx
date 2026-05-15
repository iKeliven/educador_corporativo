import styles from "./JourneyTrailCard.module.css";
import Badge from "./UI/Badge";

import Button from "./UI/Button";
import Subtitle from "./UI/Subtitle";
import Title from "./UI/Title";

export default function JourneyTrailCard({
    title,
    description,
    workload,
    date,
    info,
    ps,
}) {
    return (
        <article className={styles.card}>
            <div className={styles.header}>
                <Badge variant='ghost'>
                    {date}
                </Badge>
                <Badge variant='secondary'>
                    {workload}
                </Badge>

            </div>



            <div className={styles.content}>
                <Title size="md">
                    {title}
                </Title>

                <Subtitle size='md' variant='light'>
                    {description}
                </Subtitle>
                <p className={styles.ps}>{ps}</p>

            </div>
            <div className={styles.info}>
                <Subtitle size='sm' variant='light'>{info}

                </Subtitle>
                <Button size="sm">
                    Acessar Trilha
                </Button>                
            </div>
        </article>
    );
}