import styles from './Card.module.css'

import Title from './UI/Title'
import Button from './UI/Button'
import Badge from './UI/Badge'

export default function Card({
    journey,
    mode = "dashboard",
    onEditTrail,
    onDeleteTrail
}) {

    return (
        <article className={styles.card}>

            <div className={styles.cardHeader}>

                <Badge>
                    {journey.company}
                </Badge>

                <Badge variant='ghost'>
                    {journey.count} trilhas
                </Badge>

            </div>

            <Title size="sm">
                {journey.title}
            </Title>

            <p className={styles.slug}>
                /jornada/{journey.slug}
            </p>

            <div className={styles.actions}>

                {/* DASHBOARD */}
                {mode === "dashboard" && (
                    <>
                        <Button size="sm">
                            Editar
                        </Button>

                        <Button
                            size="sm"
                            variant="secondary"
                        >
                            Visualizar
                        </Button>

                        <Button
                            size="sm"
                            variant="ghost"
                        >
                            Excluir
                        </Button>
                    </>
                )}

                {/* EDITOR */}
                {mode === "editor" && (
                    <>
                        <Button
                            size="sm"
                            onClick={onEditTrail}
                        >
                            Editar trilhas
                        </Button>

                        <Button
                            size="sm"
                            variant="secondary"
                        >
                            Pré-visualizar
                        </Button>

                        <Button
                            size="sm"
                            variant="ghost"
                            onClick={onDeleteTrail}
                        >
                            Excluir jornada
                        </Button>
                    </>
                )}

            </div>

        </article>
    )
}