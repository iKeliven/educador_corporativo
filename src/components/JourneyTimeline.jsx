import styles from "./JourneyTimeline.module.css";

import JourneyTrailCard from "./JourneyTrailCard";

export default function JourneyTimeline({
    items,
}) {
    return (
        <section className={styles.timeline}>
            <div className={styles.line}></div>
            {/* START */}
            <div className={styles.start}>
                Início
            </div>
            {items.map((item, index) => (
                <div
                    key={index}
                    className={`
                        ${styles.item}
                        ${index % 2 === 0
                                            ? styles.left
                                            : styles.right
                                        }
                    `}
                >
                    {/* NUMBER */}
                    <div className={styles.number}>
                        {index + 1}
                    </div>

                    <JourneyTrailCard {...item} />
                </div>
            ))}
        </section>
    )
}