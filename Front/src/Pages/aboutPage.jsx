import React from 'react';
import Newsletter from '../Components/Home/newLetters';
import Footer from '../Components/Home/footer';
import Navbar from '../Components/Home/Navbar';
import About from '../Components/About';

const AboutPage = () => {
    return (
        <div>
            <Navbar></Navbar>
            <About></About>
            <Newsletter></Newsletter>
            <Footer></Footer>
        </div>
    );
}

export default AboutPage;
