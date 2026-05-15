import styles from "./JourneyForm.module.css";

import MainLayout from "../layouts/MainLayout";
import Header from "../components/Header";

import Input from "../components/UI/Input";
import Button from "../components/UI/Button";
import Badge from "../components/UI/Badge";
import Title from "../components/UI/Title";
import Subtitle from "../components/UI/Subtitle";

export default function CreateJourney() {

    function handleSubmit(event) {
        event.preventDefault();

        console.log("CRIAR JORNADA");
    }

    return (
        <MainLayout>
            <Header />

            <section className={styles.page}>
                <div className={styles.container}>

                    <div className={styles.header}>
                        <Badge>
                            NOVA JORNADA
                        </Badge>

                        <Title size="bg">
                            Criar trilha corporativa
                        </Title>

                        <Subtitle>
                            Cadastre uma nova jornada personalizada
                            para treinamentos e eventos.
                        </Subtitle>
                    </div>

                    <form
                        className={styles.form}
                        onSubmit={handleSubmit}
                    >

                        <div className={styles.grid}>
                            <Input
                                label="Empresa"
                                placeholder="Nome da empresa"
                            />

                            <Input
                                label="Slug"
                                placeholder="empresa-lideranca"
                            />
                        </div>
                        <div className={styles.grid}>
                            <Input
                                label="Título da Jornada"
                                placeholder="Jornada de Liderança"
                            />
                            <Input
                                label="Carga Horária"
                                placeholder="20h"
                            />
                        </div>
                        <Input
                            textarea
                            label="Descrição"
                            placeholder="Descrição da jornada..."
                        />
                        <div className={styles.sectionHeader}>
                            <div>
                                <h2>Trilhas da jornada</h2>
                                <p>Adicione os cards que aparecerão no infográfico.</p>
                            </div>

                            <Button size="sm" onClick={() => setIsModalOpen(true)}>
                                + Adicionar trilha
                            </Button>
                        </div>

                        <div className={styles.actions}>
                            <Button
                                variant="ghost"
                                size="lg"
                            >
                                Cancelar
                            </Button>

                            <Button size="lg">
                                Criar Jornada
                            </Button>
                        </div>
                        <JourneyTrailModal
                            isOpen={isModalOpen}
                            onClose={() => setIsModalOpen(false)}
                        />
                    </form>
                </div>
            </section>
        </MainLayout>
    );
}