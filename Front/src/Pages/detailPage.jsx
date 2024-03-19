import React from 'react';
import Details from '../Components/details/details';
import Reviews from '../Components/details/Reviews';
import Navbar from '../Components/Home/Navbar';

const DetailPage = () => {
    return (
        <div>
            <Navbar />
            <Details />
            <Reviews></Reviews>
        </div>
    );
}

export default DetailPage;
