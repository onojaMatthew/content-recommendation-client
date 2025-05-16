"use client";

import type { NextPage } from 'next';
import Head from 'next/head';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useSelector } from 'react-redux';
import { RootState } from '../../types/storeType';
import RegisterForm from '../../components/auth/RegistrationForm';

const RegisterPage: NextPage = () => {
  const router = useRouter();
  const { user } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    if (user) {
      router.push('/dashboard');
    }
  }, [user, router]);

  return (
    <div className="min-h-screen bg-gray-50">
      <Head>
        <title>Register | SaaS Recommender</title>
        <meta name="description" content="Create a new SaaS Recommender account" />
      </Head>
      <main>
        <RegisterForm />
      </main>
    </div>
  );
};

export default RegisterPage;