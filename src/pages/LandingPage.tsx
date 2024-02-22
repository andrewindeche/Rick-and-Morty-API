import React from 'react';
import WordAnimations from 'components/WordAnimations';
import SearchBar from 'components/SearchBar';
import ImagePosters from 'components/ImagePosters';
import Link from 'next/link';

const LandingPage: React.FC = () => {
    const handleSearch = (query: string) => {
    console.log('Searching for:', query);
      };
    return(
    <>
    <WordAnimations />
    <SearchBar onSearch={handleSearch} />
    <ImagePosters />
    </>
    )
}

export default LandingPage;