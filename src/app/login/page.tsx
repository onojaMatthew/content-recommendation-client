"use client";

import type { NextPage } from 'next';
import Head from 'next/head';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
// import { RootState, useAppSelector } from '../../store/store';
import LoginForm from '../../components/auth/LoginForm';

const LoginPage: NextPage = () => {
  // const router = useRouter();
  // const { user } = useAppSelector((state: RootState) => state.auth);

  // Redirect if already logged in
  // useEffect(() => {
  //   if (user) {
  //     // router.push('/dashboard');
  //   }
  // }, [user, router]);

  return (
    <div className="min-h-screen bg-gray-50">
      <Head>
        <title>Login | SaaS Recommender</title>
        <meta name="description" content="Login to your SaaS Recommender account" />
      </Head>

      <main>
        <LoginForm />
      </main>
    </div>
  );
};

export default LoginPage;