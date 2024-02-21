import React, { useState, ChangeEvent, FormEvent } from 'react';

interface SearchFormProps {
    onSearch: (query: string) => void;
}
const SearchBar: React.FC = ({ onSearch}) => {
    const [searchQuery, setSearchQuery] = useState<string>('');

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(e.target.value);
      };
    return()
}

export default SearchBar;