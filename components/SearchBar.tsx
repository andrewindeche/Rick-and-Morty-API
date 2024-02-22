import React, { useState, ChangeEvent, FormEvent } from 'react';
import { useRouter } from 'next/router';

interface SearchFormProps {
    onSearch: (query: string) => void;
}

const SearchBar: React.FC = ({ onSearch, ...props}) => {
    const [searchQuery, setSearchQuery] = useState<string>('');
    const router = useRouter();

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
        onChange={handleInputChange}
      />
      <button type="submit">Search</button>
    </form>
    )
}

export default SearchBar;