import MainLayout from "../layouts/MainLayout";
import HeroJourney from "../components/HeroJourney";
import JourneyTimeline from "../components/JourneyTimeline";
import { LuGraduationCap, LuBookOpen, LuClock3 } from "react-icons/lu";


export default function Journey() {
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
            <HeroJourney
                badge="CERTIFICAÇÃO"
                title="Instrutor Master"
                highlight="Internacional"
                subtitle="Este infográfico vai te mostrar todas as etapas da formação."
                cta="Como funciona a jornada?"
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

            <JourneyTimeline items={etapas} />
        </MainLayout>
    );
}