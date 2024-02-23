import React from 'react';
import LandingPage from '@/pages/LandingPage';
import Layout from 'components/Layout';

const Home: React.FC = () => {
  const handleSearch = (query: string) => {
    console.log('Searching for:', query);
  };
    return (
      <Layout>
        <LandingPage />
    </Layout>
    )
  };
  
  export default Home;
  