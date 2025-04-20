import Companies from "./Companies";
import Guide from "./Guide";
import Hero from "./Hero";
import GetStarted from "./GetStarted";
import Footer from "./Footer";
import BackToTopButton from "./BackToTopButton";

const Home = () => {
    return (
        <>
        <Hero />
        <Companies />
        <Guide />
        <GetStarted />
        <Footer />
        <BackToTopButton />
        </>
    );
}

export default Home;