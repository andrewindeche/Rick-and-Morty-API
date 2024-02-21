import React from 'react';
import NavigationBar from 'components/NavigationBar';
import WordAnimations from 'components/WordAnimations';
import SearchBar from 'components/SearchBar';
const Home: React.FC = () => {
  const handleSearch = (query: string) => {
    console.log('Searching for:', query);
  };
    return (
    <div>
    <NavigationBar />
    <WordAnimations />
    <SearchBar onSearch={handleSearch} />
    </div>
    )
  };
  
  export default Home;
  