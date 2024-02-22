import React from 'react';
import NavigationBar from 'components/NavigationBar';
import LandingPage from 'components/LandingPage';

const Home: React.FC = () => {
  const handleSearch = (query: string) => {
    console.log('Searching for:', query);
  };
    return (
    <div>
    <NavigationBar />
    <LandingPage />
    </div>
    )
  };
  
  export default Home;
  