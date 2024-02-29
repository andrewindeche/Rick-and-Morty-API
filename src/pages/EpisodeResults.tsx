import React, { useState, useEffect  }  from 'react';
import SearchBar from 'components/SearchBar';
import { useRouter } from 'next/router';
import Layout from 'components/Layout';
import axios from 'axios';

const Episode: React.FC = () => {
  const router = useRouter();
    const [episodeResults, setEpisodeResults] = useState<any[]>([]);
    const [episodeName, setEpisodeName] = useState<string | null>(null);
    const [characters, setCharacters] = useState<any[]>([]);

    useEffect(() => {
      const { results, characters, searchQuery } = router.query;
      if (results) {
        setEpisodeResults(JSON.parse(results as string));
      }
      if (characters) {
        setCharacters(JSON.parse(characters as string));
      }
      if (searchQuery) {
        setEpisodeName(decodeURIComponent(searchQuery as string));
      }
    }, [router.query]);
  
  async function handleSearch(query: string) {
    try{
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
  }

    return(
        <>
        <Layout>
        <div className="wrapper">
        <div className="page">
        <SearchBar onSearch={handleSearch} />
          <div className='EpisodeResults'>
          {episodeName && (
            <div className="header">
          <div className="EpisodeHeader">EPISODE NAME: <span className='headername'>{episodeName}</span></div>
          <div className="ResidentsHeader">EPISODE RESULTS: <span className='headername'>{episodeResults.length}</span></div>
            </div>
            )}
            {episodeResults.length > 0 ? (
          <div className="results">{episodeResults.length} RESULT FOR EPISODE</div>
          ) : (
            <div className="results">No results found <span className='PlanetName'>{episodeName}</span></div>
          )}
          <div className="episode-cards">
            {Array.isArray(characters) && characters.map((character, index) =>  (
              <div className="episode-card" key={index}>
                <img src={character.image} alt={character.name} />
                <div className="name">{character.name}</div>
                <div className="dimension">{character.dimension}</div>
                <div className="origin">{character.origin.name}</div>
                <div className="description">{character.status} - ${character.species}</div>
              </div>
            ))} 
          </div>
          </div>
          </div>
          </div>
        </Layout>
      </>
    )
}

export default Episode;
