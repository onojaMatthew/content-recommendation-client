"use client";

import type { NextPage } from 'next';
import Head from 'next/head';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import dynamic from 'next/dynamic';
import { RootState, useAppSelector } from '@/types/storeType';

const LoginForm = dynamic(() => import('../../components/auth/LoginForm'), {
  ssr: false,
});

const LoginPage: NextPage = () => {
  const router = useRouter();
   const { user, business } = useAppSelector((state: RootState) => state.auth);
  
  useEffect(() => {
    if (business) {
      const slug = business?.slug;
      console.log(slug, " the slug")
      router.push(`/dashboard/${slug}`);
    }
  }, [user, router]);
  // if (typeof window !== 'undefined') {
  //   // safe to use browser features
  // }

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