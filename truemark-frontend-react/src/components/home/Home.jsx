// import Companies from "./Companies";
// import Guide from "./Guide";
// import Hero from "./Hero";
// import GetStarted from "./GetStarted";
// import Footer from "./Footer";
// import BackToTopButton from "./BackToTopButton";

// const Home = () => {
//     return (
//         <>
//         <Hero />
//         <Companies />
//         <Guide />
//         <GetStarted />
//         <Footer />
//         <BackToTopButton />
//         </>
//     );
// }

// export default Home;


import { useEffect } from "react";
import useAuth from "../../hooks/useAuth";
import Companies from "./Companies";
import Guide from "./Guide";
import Hero from "./Hero";
import GetStarted from "./GetStarted";
import Footer from "./Footer";
import BackToTopButton from "./BackToTopButton";

const Home = () => {
    const { setAuth } = useAuth();

    useEffect(() => {
        // Clear auth state and remove from localStorage when home page is visited
        setAuth({});
        localStorage.removeItem("auth");
    }, [setAuth]);

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
};

export default Home;
