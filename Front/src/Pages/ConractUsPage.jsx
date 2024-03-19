import React from 'react';
import Newsletter from '../Components/Home/newLetters';
import Footer from '../Components/Home/footer';
import ContactUs from '../Components/ContactUs';
import Navbar from '../Components/Home/Navbar';

const ConractUsPage = () => {
    return (
        <div>
            <Navbar></Navbar>
            <ContactUs></ContactUs>
            <Newsletter></Newsletter>
            <Footer></Footer>
        </div>
    );
}

export default ConractUsPage;
