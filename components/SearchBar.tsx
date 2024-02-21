import React, { useState, ChangeEvent, FormEvent } from 'react';

interface SearchFormProps {
    onSearch: (query: string) => void;
}

const SearchBar: React.FC = ({ onSearch, ...props}) => {
    const [searchQuery, setSearchQuery] = useState<string>('');

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(e.target.value);
      };
    
      const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        onSearch(searchQuery);
      };
    return(
    <form onSubmit={handleSubmit} className="search-form">
      <input
        type="text"
        placeholder="Enter your search query"
        value={searchQuery}
        onChange={handleInputChange}
      />
      <button type="submit">Search</button>
    </form>
    )
}

export default SearchBar;