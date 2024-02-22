import React, { useState, ChangeEvent, FormEvent } from 'react';
import { useRouter } from 'next/router';
import axios from  'axios';

interface SearchBarProps {
    onSearch: (query: string, results: any[]) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
    const [searchQuery, setSearchQuery] = useState<string>('');
    const router = useRouter();

    const handleSearch = async () => {
      try {
        const response = await axios.get(`https://rickandmortyapi.com/api/character/1,183${encodeURIComponent(searchQuery)}`);
        onSearch(searchQuery, response.data.results);
        router.push({
            pathname: '/SearchResults',
            query: {
                q: searchQuery,
            },
        });
      } catch (error) {
        console.error('Error fetching data:', error);
    }
    }
    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(e.target.value);
      };
    
      const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        handleSearch();
      };
    return(
    <form onSubmit={handleSubmit} className="search-form">
      <input
        type="text"
        placeholder="SEARCH FOR RICK AND MORTY CHARACTER"
        value={searchQuery}
        onChange={handleInputChange}
      />
      <button onClick={handleSearch}>Search</button>
    </form>
    )
}

export default SearchBar;