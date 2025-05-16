'use client';

import type { NextPage } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import { RootState, useAppSelector } from '../store/store';
import Header from '../components/common/Header';
import Footer from '../components/common/Footer';

const Home: NextPage = () => {
  const { user } = useAppSelector((state: RootState) => state.auth);

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Head>
        <title>SaaS Recommender - Find the best software for your needs</title>
        <meta name="description" content="Discover and compare SaaS products tailored to your requirements" />
      </Head>

      <Header />

      <main className="flex-grow">
        {/* Hero Section */}
        <section className="bg-white py-20">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              Find the Perfect <span className="text-primary">SaaS Solution</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-10">
              Our AI-powered recommendation engine helps you discover the best software products for your specific needs.
            </p>
            <div className="flex justify-center gap-4">
              {user ? (
                <Link href="/recommendations" className="bg-primary hover:bg-secondary text-white font-medium py-3 px-6 rounded-lg transition-colors">
                  Get Recommendations
                </Link>
              ) : (
                <>
                  <Link href="/auth/register" className="bg-primary hover:bg-secondary text-white font-medium py-3 px-6 rounded-lg transition-colors">
                    Get Started
                  </Link>
                  <Link href="/auth/login" className="border border-primary text-primary hover:bg-gray-50 font-medium py-3 px-6 rounded-lg transition-colors">
                    Sign In
                  </Link>
                </>
              )}
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-20 bg-gray-50">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">How It Works</h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <div className="text-primary text-4xl mb-4">1</div>
                <h3 className="text-xl font-semibold mb-2">Tell Us Your Needs</h3>
                <p className="text-gray-600">
                  Answer a few questions about your business requirements and preferences.
                </p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <div className="text-primary text-4xl mb-4">2</div>
                <h3 className="text-xl font-semibold mb-2">Get Personalized Matches</h3>
                <p className="text-gray-600">
                  Our algorithm analyzes thousands of SaaS products to find your best matches.
                </p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <div className="text-primary text-4xl mb-4">3</div>
                <h3 className="text-xl font-semibold mb-2">Compare & Decide</h3>
                <p className="text-gray-600">
                  Compare features, pricing, and reviews to make the right choice.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-primary text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-6">Ready to find your perfect SaaS match?</h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto">
              Join thousands of businesses that have found their ideal software solutions through our platform.
            </p>
            <Link 
              href={user ? "/recommendations" : "/auth/register"} 
              className="inline-block bg-white text-primary hover:bg-gray-100 font-medium py-3 px-8 rounded-lg transition-colors"
            >
              {user ? "Get Recommendations" : "Start Free Now"}
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Home;