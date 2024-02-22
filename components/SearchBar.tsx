import React, { useState, ChangeEvent, FormEvent } from 'react';
import { useRouter } from 'next/router';
import axios from  'axios';

interface SearchFormProps {
    onSearch: (query: string) => void;
}

const SearchBar: React.FC = ({ onSearch, ...props}) => {
    const [searchQuery, setSearchQuery] = useState<string>('');
    const router = useRouter();

    const handleSearch = async () => {
      try {
        const response = await 
          axios.get(`https://rickandmortyapi.com/api/character/?name=${encodeURIComponent(searchQuery)}`);
          router.push({
            pathname: '/search-results',
            query: {
                q: searchQuery,
                results: JSON.stringify(response.data.results),
            },
        });
      } catch (error) {
        console.error('Error fetching data:', error);
    }
    }
    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(e.target.value);
        router.push(`/SearchResults?q=${encodeURIComponent(searchQuery)}`);
      };
    
      const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        onSearch(searchQuery);
      };
    return(
    <form onSubmit={handleSubmit} className="search-form">
      <input
        type="text"
        placeholder="SEARCH FOR RICK AND MORTY CHARACTER"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      <button onClick={handleInputChange}>Search</button>
    </form>
    )
}

export default SearchBar;