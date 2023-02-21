import Head from 'next/head';
import Image from 'next/image';
import { Inter } from '@next/font/google';
import styles from '@/styles/Home.module.css';
import { Navbar } from '@/components/navbar/Navbar';
import { HomePage } from '@/components/home/Home';
import { Footer } from '@/components/footer/Footer';
import Link from 'next/link';
import MainLayout from '@/components/layout/main-layout';

const inter = Inter({ subsets: ['latin'] });

export default function Home() {
  return (
    <>
      <Head>
        <title>Home</title>
        <link rel='icon' href='/images/titles/manit-logo.png' />
      </Head>
      <MainLayout>
        <HomePage />
      </MainLayout>
    </>
  );
}
