import React from 'react'
import HeroMain from '../components/HeroMain';
import NavMain from '../components/NavMain';
import SectionMain from '../components/SectionMain';
import Footer from '../components/Footer';

function Home() {
    return (
        <>
            <NavMain />
            <main>
                <HeroMain />
                <SectionMain />
            </main>
            <Footer />
        </>
    );
};

export default Home;