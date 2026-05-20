import MainLayout from "../layouts/MainLayout";
import HeroJourney from "../components/HeroJourney";
import { LuGraduationCap, LuBookOpen, LuClock3 } from "react-icons/lu";
import Header from "../components/Header";
import JourneyHowWorks from "../components/JourneyHowWorks";
import { Link } from "react-router-dom";

export default function Home() {

    return (
        <MainLayout>
            <Header />
            <HeroJourney
                badge="SENAI"
                title="Plataforma de Educação"
                highlight="Corporativa"
                subtitle="Crie infográficos que auxiliam na formação corporativa."
                cta="Como funciona a plataforma?"
                ctaLink="/sobre"
            />
            
            <JourneyHowWorks />
        </MainLayout>
    );
}