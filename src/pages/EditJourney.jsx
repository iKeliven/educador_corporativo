import { useState } from "react";

import styles from "./EditJourney.module.css";

import MainLayout from "../layouts/MainLayout";
import Header from "../components/Header";

import Card from "../components/Card";
import Button from "../components/UI/Button";
import Badge from "../components/UI/Badge";
import Title from "../components/UI/Title";
import Subtitle from "../components/UI/Subtitle";
import Input from "../components/UI/Input";

import JourneyTrailModal from "../components/JourneyTrailModal";

export default function EditJourney() {
    const journey = {
        id: 1,
        company: "SENAI",
        title: "Jornada de Liderança",
        slug: "senai-lideranca",
        count: 3,
    };

    const [trails, setTrails] = useState([
        {
            id: 1,
            title: "Introdução",
            description: "Conheça os objetivos da jornada.",
            workload: "20 min",
            order: 1,
            link: "https://google.com",
        },
        {
            id: 2,
            title: "Workshop",
            description: "Atividade prática sobre liderança.",
            workload: "2h",
            order: 2,
            link: "https://google.com",
        },
        {
            id: 3,
            title: "Mentoria",
            description: "Sessão de acompanhamento com facilitador.",
            workload: "45 min",
            order: 3,
            link: "https://google.com",
        },
    ]);

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedTrail, setSelectedTrail] = useState(null);

    function openCreateTrail() {
        setSelectedTrail(null);
        setIsModalOpen(true);
    }

    function openEditTrail(trail) {
        setSelectedTrail(trail);
        setIsModalOpen(true);
    }

    function closeModal() {
        setSelectedTrail(null);
        setIsModalOpen(false);
    }

    function deleteTrail(id) {
        setTrails((current) => current.filter((trail) => trail.id !== id));
    }

    return (
        <MainLayout>
            <Header isAuthenticated />

            <section className={styles.page}>
                <div className={styles.container}>
                    <div className={styles.header}>
                        <div>
                            <Badge>EDITOR DA JORNADA</Badge>

                            <Title size="bg">Editar jornada</Title>

                            <Subtitle>
                                Atualize as informações principais e organize as trilhas que aparecem no infográfico.
                            </Subtitle>
                        </div>

                        <Button size="sm" variant="secondary">
                            Visualizar infográfico
                        </Button>
                    </div>

                    <div className={styles.contentGrid}>
                        <div>
                            <Card journey={journey} mode="editor" />

                            <form className={styles.form}>
                                <div className={styles.formHeader}>
                                    <h2>Informações da jornada</h2>
                                    <p>Esses dados aparecem no cabeçalho do infográfico.</p>
                                </div>

                                <div className={styles.grid}>
                                    <Input label="Empresa" defaultValue={journey.company} />
                                    <Input label="Slug" defaultValue={journey.slug} />
                                </div>

                                <Input label="Título" defaultValue={journey.title} />
                                <Input
                                    textarea
                                    label="Descrição"
                                    defaultValue="Trilha personalizada de desenvolvimento corporativo."

                                />


                                <div className={styles.actions}>
                                    <Button size="sm" variant="ghost">
                                        Cancelar
                                    </Button>

                                    <Button size="sm">
                                        Salvar alterações
                                    </Button>
                                </div>
                            </form>
                        </div>

                        <aside className={styles.trailsPanel}>
                            <div className={styles.trailsHeader}>
                                <div>
                                    <h2>Trilhas cadastradas</h2>
                                    <p>{trails.length} trilhas no infográfico</p>
                                </div>

                                <Button size="sm" onClick={openCreateTrail}>
                                    + Add trilha
                                </Button>
                            </div>

                            <div className={styles.trailsList}>
                                {trails.map((trail) => (
                                    <article key={trail.id} className={styles.trailItem}>
                                        <div className={styles.trailNumber}>
                                            {trail.order}
                                        </div>

                                        <div className={styles.trailBody}>
                                            <h3>{trail.title}</h3>
                                            <p>{trail.description}</p>

                                            <span>{trail.workload}</span>
                                        </div>

                                        <div className={styles.trailActions}>
                                            <Button
                                                size="sm"
                                                variant="secondary"
                                                onClick={() => openEditTrail(trail)}
                                            >
                                                Editar
                                            </Button>

                                            <Button
                                                size="sm"
                                                variant="ghost"
                                                onClick={() => deleteTrail(trail.id)}
                                            >
                                                Excluir
                                            </Button>
                                        </div>
                                    </article>
                                ))}
                            </div>
                        </aside>
                    </div>
                </div>
            </section>

            <JourneyTrailModal
                isOpen={isModalOpen}
                onClose={closeModal}
                mode={selectedTrail ? "edit" : "create"}
                trail={selectedTrail}
            />
        </MainLayout>
    );
}