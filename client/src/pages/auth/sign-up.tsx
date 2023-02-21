import { Signup } from '@/components/auth/Signup';
import MainLayout from '@/components/layout/main-layout';
import Head from 'next/head';

export default function SignUp() {
  return (
    <>
      <Head>
        <title>Sign Up</title>
        <link rel='icon' href=''></link>
      </Head>
      <MainLayout>
        <Signup />
      </MainLayout>
    </>
  );
}
