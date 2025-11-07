'use client';
import React from 'react';
import Nav from './Nav/Nav';
import Slider from './Slider/Slider';
import Overview from './Overview/Overview';
import FAQ from './FAQ/FAQ';
import Contact from './Contact/Contact';
import ProductCategory from './ProductCategory/ProductCategory';
import OurMission from './OurMission/OurMission';
import Footer from './Footer/Footer';

const page = () => {
  return (
    <div>
      <Nav></Nav>
      <Slider></Slider>
      <Overview></Overview>
      <ProductCategory></ProductCategory>
      <OurMission></OurMission>
      <FAQ></FAQ>
      <Contact></Contact>
      <Footer></Footer>
    </div>

  );
};

export default page;