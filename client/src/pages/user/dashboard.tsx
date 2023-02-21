import { UserDashboard } from '@/components/dashboard/UserDashboard';
import MainLayout from '@/components/layout/main-layout';
import Head from 'next/head';
import React from 'react';

export default function dashboard() {
  return (
    <>
      <Head>
        <title>Dashboard</title>
        <link rel='icon' href='/images/titles/manit-logo.png'></link>
      </Head>
      <MainLayout>
        <UserDashboard />
      </MainLayout>
    </>
  );
}
