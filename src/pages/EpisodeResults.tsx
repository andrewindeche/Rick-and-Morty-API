import React, { useEffect, useState }  from 'react';
import SearchBar from 'components/SearchBar';
import Layout from 'components/Layout';
import axios from 'axios';

const Episode: React.FC = () => {
    const [episodeResults, setEpisodeResults] = useState<any>({});
    const [episodeName, setEpisodeName] = useState<string | null>(null);
    const [characters, setCharacters] = useState<any[]>([]);

    const handleSearch = async(query: string)  => {
        try {
          const response = await axios.get(`https://rickandmortyapi.com/api/episode/?name=${encodeURIComponent(query)}`);
          setEpisodeResults(response.data.results);
          setEpisodeName(query);
    
          const characterPromises = response.data.results[0]?.residents.map((resident: string) => axios.get(resident));
          const characterResponses = await Promise.all(characterPromises);
          const characterData = characterResponses.map((characterResponse: any) => characterResponse.data);
          setCharacters(characterData);
        } catch (error) {
          console.error('Error fetching location data:', error);
          setEpisodeResults([]);
          setEpisodeName(null);
          setCharacters([]);
        }
      };
  
    return(
        <>
        <Layout>
        <div className="wrapper">
        <div className="page">
        <SearchBar onSearch={handleSearch} />
          <div className='EpisodeResults'>
          {episodeName && (
            <div className="header">
          <div className="EpisodeHeader">EPISODE NUMBER: <span className='headername'>{episodeName}</span></div>
          <div className="ResidentsHeader">EPISODE NAME: <span className='headername'>{episodeResults.length}</span></div>
            </div>
            )}
            {episodeResults.length > 0 ? (
          <div className="results">{episodeResults.length} RESULT FOR EPISODE</div>
          ) : (
            <div className="results">No results found <span className='PlanetName'>{episodeName}</span></div>
          )}
        <div className="cards">
            {characters.map((character, index) => (
              <div className="card" key={index}>
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