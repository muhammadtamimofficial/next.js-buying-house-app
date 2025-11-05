'use client';
import React from 'react';
import Nav from './Nav/Nav';
import Slider from './Slider/Slider';
import Overview from './Overview/Overview';

const page = () => {
  return (
    <div>
      <Nav></Nav>
      <Slider></Slider>
      <Overview></Overview>
    </div>

  );
};

export default page;