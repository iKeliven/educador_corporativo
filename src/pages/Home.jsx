import MainLayout from "../layouts/MainLayout";
import HeroJourney from "../components/HeroJourney";
import JourneyTimeline from "../components/JourneyTimeline";
import { LuGraduationCap, LuBookOpen, LuClock3 } from "react-icons/lu";
import Header from "../components/Header";
import JourneyHowWorks from "../components/JourneyHowWorks";


export default function Home() {
    const etapas = [
        {
            title: "Introdução",
            workload: "20 min",
            date: "20/05/2026",
            description:
                "Conheça os objetivos da jornada e os principais conceitos do treinamento.",
            link: "#",
            ps: 'observações',
            info: "Aula no Zoom",
        },
        {
            title: "Workshop",
            workload: "1h 30min",
            date: "20/05/2026",
            description:
                "Atividade prática com foco em desenvolvimento de liderança.",
            link: "#",
            ps: 'observações',
            info: "Aula no Zoom",
        },
        {
            title: "Mentoria",
            workload: "45 min",
            date: "20/05/2026",
            description:
                "Sessão de acompanhamento e aplicação prática dos conteúdos.",
            link: "#",
            ps: 'observações',
            info: "Aula no Zoom",
        },
    ];

    return (
        <MainLayout>
            <Header />
            <HeroJourney
                badge="SENAI"
                title="Plataforma de Educação"
                highlight="Corporativa"
                subtitle="Crie infográficos que auxiliam na formação corporativa."
                cta="Como funciona a plataforma?"
                stats={[
                    {
                        icon: <LuBookOpen />,
                        strong: 13,
                        text: "TRILHAS",
                    },
                    {
                        icon: <LuClock3 />,
                        strong: "25h+",
                        text: "CARGA HORÁRIA",
                    },
                    {
                        icon: <LuGraduationCap />,
                        strong: "Certificado",
                        text: "INTERNACIONAL",
                    },
                ]}
            />
            <JourneyHowWorks />
        </MainLayout>
    );
}