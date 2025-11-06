'use client';
import React from 'react';
import Nav from './Nav/Nav';
import Slider from './Slider/Slider';
import Overview from './Overview/Overview';
import FAQ from './FAQ/FAQ';

const page = () => {
  return (
    <div>
      <Nav></Nav>
      <Slider></Slider>
      <Overview></Overview>
      <FAQ></FAQ>
    </div>

  );
};

export default page;