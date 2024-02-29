import React, { useState, ChangeEvent, FormEvent } from 'react';
import { useRouter } from 'next/router';
import axios from  'axios';

interface SearchBarProps {
    onSearch: (query: string, results: any[]) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
    const [searchQuery, setSearchQuery] = useState<string>('');
    const [searching, setSearching] = useState<boolean>(false);
    const [isValidQuery, setIsValidQuery] = useState<boolean>(true);
    const router = useRouter();

    const handleSearch = async () => {
      if (searchQuery.trim() === '') {
        setIsValidQuery(false); 
        return;
      }
      setIsValidQuery(true);
      setSearching(true); 
      try {
        const characterResponse = await axios.get(`https://rickandmortyapi.com/api/character/?name=${encodeURIComponent(searchQuery)}`);
        onSearch(searchQuery, characterResponse.data.results);
        router.push({
            pathname: '/SearchResults',
            query: { results: JSON.stringify(characterResponse.data.results) }
        });
        setSearchQuery('');
      } catch (characterError) {
        console.error('Error fetching character data:', characterError);
        setIsValidQuery(false);
      }finally {
        setSearching(false); 
      }
      try {
        const locationResponse = await axios.get(`https://rickandmortyapi.com/api/location/?name=${encodeURIComponent(searchQuery)}`);
        if (locationResponse.data.results.length > 0) {
          onSearch(searchQuery, locationResponse.data.results);
          const characterPromises = locationResponse.data.results[0]?.residents.map((resident: string) => axios.get(resident));
          const characterResponses = await Promise.all(characterPromises);
          const characterData = characterResponses.map((characterResponse: any) => characterResponse.data);
          router.push({
            pathname: '/LocationResults',
            query: { 
              results: JSON.stringify(locationResponse.data.results),
              characters: JSON.stringify(characterData),
              searchQuery: encodeURIComponent(searchQuery),
            }
          });
        }
      } catch (locationError) {
        console.error('Error fetching location data:', locationError);
      } try{
        const episodeResponse = await axios.get(`https://rickandmortyapi.com/api/episode/?name=${encodeURIComponent(searchQuery)}`);
        if (episodeResponse.data.results.length > 0) {
          onSearch(searchQuery, episodeResponse.data.results);
          const characterPromises = episodeResponse.data.results[0]?.characters.map((character: string) => axios.get(character));
          const characterResponses = await Promise.all(characterPromises);
          const characterData = characterResponses.map((characterResponse: any) => characterResponse.data);

          router.push({
            pathname: '/EpisodeResults',
            query: { 
              results: JSON.stringify(episodeResponse.data.results),
              characters: JSON.stringify(characterData),
              searchQuery: encodeURIComponent(searchQuery), 
            }
          });
        }
      } catch(episodeError){
        console.error('Error fetching episode data:', episodeError);
      }
    };
    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(e.target.value);
        setIsValidQuery(true);
      };
    
      const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (searchQuery.trim() === '') {
          setIsValidQuery(false); 
          return;
      }
      setIsValidQuery(true);
      handleSearch();
  };
    return(
    <form onSubmit={handleSubmit} className={`search-form ${isValidQuery ? '' : 'invalid'}`}>
      <input
        type="text"
        placeholder={isValidQuery ? "SEARCH FOR CHARACTER, LOCATION OR EPISODE" : "Nothing entered...Please enter a search"}
        value={searchQuery}
        onChange={handleInputChange}
      />
      <button type="submit" onClick={handleSearch} disabled={searching}>{searching ? 'Searching...' : 'Search'}</button>
    </form>
    )
}

export default SearchBar;
