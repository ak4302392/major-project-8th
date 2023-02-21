import React from 'react';
import { Footer } from '../footer/Footer';
import { Navbar } from '../navbar/Navbar';

export default function MainLayout(props: { children: React.ReactNode }) {
  return (
    <>
      <Navbar />
      {props.children}
      <Footer />
    </>
  );
}
