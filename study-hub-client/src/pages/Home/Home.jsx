import React from 'react';
import Banner from '../../components/Banner';
import Features from '../../components/Features';
import FAQ from '../../components/FAQ';


const Home = () => {
    return (
        <div className='dark'>
            <Banner></Banner>
            <Features></Features>
            <FAQ></FAQ>
        </div>
    );
};

export default Home;
