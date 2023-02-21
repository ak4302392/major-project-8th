import Event from '@/components/evnt/Event';
import MainLayout from '@/components/layout/main-layout';
import Head from 'next/head';
import React from 'react';

export default function event() {
  return (
    <>
      <Head>
        <title>Event</title>
        <link rel='icon' href='/images/titles/manit-logo.png'></link>
      </Head>
      <MainLayout>
        <Event />
      </MainLayout>
    </>
  );
}
