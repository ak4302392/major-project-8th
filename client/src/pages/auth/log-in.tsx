import Head from 'next/head';
import Login from '@/components/auth/Login';
import MainLayout from '@/components/layout/main-layout';

export default function LogIn() {
  return (
    <>
      <Head>
        <title>Log In</title>
        <link rel='icon' href=''></link>
      </Head>
      <MainLayout>
        <Login />
      </MainLayout>
    </>
  );
}
