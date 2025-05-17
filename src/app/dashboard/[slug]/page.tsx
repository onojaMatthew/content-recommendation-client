"use client";

import { NextPage } from 'next';
import Head from 'next/head';
import { useEffect, useState } from 'react';
import { useRouter, useSearchParams  } from 'next/navigation';
import { RootState, useAppSelector } from '../../../types/storeType';
import UserProfile from '../../../components/dashboard/UserProfile';
import Preferences from '../../../components/dashboard/Preferences';
import Header from '../../../components/common/Header';
import Footer from '../../../components/common/Footer';

const DashboardPage: NextPage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [ slug, setSlug ] = useState("");
  const { user, business } = useAppSelector((state: RootState) => state.auth)
   const tab = searchParams.get('tab');

  // Redirect if not logged in
  useEffect(() => {
    if (!user) {
      router.push('/login');
    } else {
      setSlug(business?.slug);
    }
  }, [user, router]);


  const activeTab = tab || 'profile';

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Head>
        <title>Dashboard | SaaS Recommender</title>
      </Head>

      <Header />

      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="border-b border-gray-200">
            <nav className="flex -mb-px">
              <button
                onClick={() => router.push('/dashboard?tab=profile')}
                className={`py-4 px-6 text-center border-b-2 font-medium text-sm ${activeTab === 'profile' ? 'border-primary text-primary' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}
              >
                Profile
              </button>
              <button
                onClick={() => router.push(`/dashboard/${slug}?tab=preferences`)}
                className={`py-4 px-6 text-center border-b-2 font-medium text-sm ${activeTab === 'preferences' ? 'border-primary text-primary' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}
              >
                Preferences
              </button>
            </nav>
          </div>

          <div className="p-6">
            {activeTab === 'profile' && <UserProfile />}
            {activeTab === 'preferences' && <Preferences />}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default DashboardPage;