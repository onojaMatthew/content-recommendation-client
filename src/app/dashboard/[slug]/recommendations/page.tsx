import { NextPage } from 'next';
import Head from 'next/head';
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../../../types/storeType';
import { fetchRecommendations } from '../../../../store/slices/recommendationSlice';
import RecommendationList from '../../../../components/recommendations/RecommendationList';
import Filters from '../../../../components/recommendations/Filters';
import LoadingSpinner from '../../../../components/common/Spinner';
import ErrorMessage from '../../../../components/common/ErrorMessage';
import Header from '../../../../components/common/Header';
import Footer from '../../../../components/common/Footer';

const RecommendationsPage: NextPage = () => {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const { user } = useSelector((state: RootState) => state.auth);
  const { recommendations, loading, error } = useSelector(
    (state: RootState) => state.recommendations
  );

  // Redirect if not logged in
  useEffect(() => {
    if (!user) {
      router.push('/login');
    }
  }, [user, router]);

  // Fetch recommendations when component mounts or user changes
  useEffect(() => {
    if (user?.preferences) {
      dispatch(fetchRecommendations(user.preferences));
    }
  }, [dispatch, user]);

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Head>
        <title>Recommendations | SaaS Recommender</title>
      </Head>

      <Header />

      <main className="flex-grow container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Your SaaS Recommendations</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <div className="lg:col-span-1">
            <Filters />
          </div>
          <div className="lg:col-span-3">
            {loading ? (
              <LoadingSpinner />
            ) : error ? (
              <ErrorMessage message={error} onRetry={() => dispatch(fetchRecommendations(user?.preferences || {}))} />
            ) : (
              <RecommendationList recommendations={recommendations} />
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default RecommendationsPage;