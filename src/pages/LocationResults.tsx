import React, { useEffect, useState }  from 'react';
import SearchBar from 'components/SearchBar';
import Layout from 'components/Layout';
import axios from 'axios';
const Location: React.FC = () => {
  const [locationResults, setLocationResults] = useState<any>({});
  const [locationName, setLocationName] = useState<string | null>(null);
  const [characters, setCharacters] = useState<any[]>([]);

  const handleSearch = async(query: string)  => {
    try {
      const response = await axios.get(`https://rickandmortyapi.com/api/location/?name=${encodeURIComponent(query)}`);
      setLocationResults(response.data.results);
      setLocationName(query);

      const characterPromises = response.data.results[0]?.residents.map((resident: string) => axios.get(resident));
      const characterResponses = await Promise.all(characterPromises);
      const characterData = characterResponses.map((characterResponse: any) => characterResponse.data);
      setCharacters(characterData);
    } catch (error) {
      console.error('Error fetching location data:', error);
      setLocationResults([]);
      setLocationName(null);
      setCharacters([]);
    }
  };
    return(
      <>
      <Layout>
      <SearchBar onSearch={handleSearch} />
        <div className='LocationResults'>
        {locationName && (
          <div className="header">
        <div className="LocationHeader">LOCATION: <span className='headername'>{locationName}</span></div>
        <div className="ResidentsHeader">RESIDENTS: <span className='headername'>{locationResults.length}</span></div>
          </div>
          )}
          {locationResults.length > 0 ? (
        <div className="results">{locationResults.length} RESULT FOR: <span className='PlanetName'>{locationName}</span></div>
        ) : (
          <div className="results">No results found <span className='PlanetName'>{locationName}</span></div>
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
        </Layout>
        </>
    )
}
export default Location;
