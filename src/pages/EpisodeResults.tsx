import React, { useState }  from 'react';
import SearchBar from 'components/SearchBar';
import Layout from 'components/Layout';
import axios from 'axios';

const Episode: React.FC = () => {
    const [episodeResults, setEpisodeResults] = useState<any>({});
    const [episodeName, setEpisodeName] = useState<string | null>(null);
    const [characters, setCharacters] = useState<any[]>([]);

    const handleSearch = async(query: string, results: any[])  => {
        try {
            const episodeResponse = await axios.get(`https://rickandmortyapi.com/api/episode/?name=${encodeURIComponent(query)}`);
            const { episode, season, name, characters: episodeCharacters } = episodeResponse.data;
            setEpisodeResults(episodeCharacters);
            console.log(`Season ${season}, Episode ${episode}: ${name}`);
            setCharacters(episodeCharacters);
        } catch (error) {
            console.error('Error fetching episode details:', error);
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
            {Array.isArray(characters) && characters.map((character, index) =>  (
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
        </Layout>
      </>
    )
}

export default Episode;
