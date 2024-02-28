import React, { ReactNode, useEffect, useState } from 'react';
import SearchBar from 'components/SearchBar';
import Layout from 'components/Layout';
import { useRouter } from 'next/router';
import CharacterModal from 'components/CharacterModal'; 

interface SearchResultsProps {
  onSearch: (query: string, results: any[]) => void; 
}
const SearchResults: React.FC<SearchResultsProps> = () => {
  const router = useRouter();
    const { results } = router.query;
    const [selectedCharacter, setSelectedCharacter] = useState<any | null>(null);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [searchResults, setSearchResults] = useState<{
      origin: any;
      residents: any;
      location: any;
      status: any;
      species: any;
      episode: ReactNode;
      name: ReactNode; image: string 
}[]>([]);

    useEffect(() => {
      if (results) {
        try {
          const parsedResults = JSON.parse(results as string);
          setSearchResults(parsedResults);
        } catch (error) {
          console.error('Error parsing JSON:', error);
          setSearchResults([]);
        }
      } else {
        setSearchResults([]);
      }
  }, [results]);

  const handleSearch = (query: string, results: any[]) => {
    setSearchResults(results);
  };

  const handleCardClick = (character: any) => {
    setSelectedCharacter(character);
    setIsModalVisible(true);
  };

  const getEpisodeNumber = (episodeUrls) => {
    if (!episodeUrls || episodeUrls.length === 0) {
      return null;
    }
    const lastEpisodeUrl = episodeUrls[episodeUrls.length - 1];
    const episodeNumber = lastEpisodeUrl.split('/').pop();
    return episodeNumber;
  };

return(
  <>
    <Layout>
      <SearchBar onSearch={handleSearch}/>
      <div className="SearchResults">
        {searchResults.slice(0, 1).map((character, index) =>(
          <div className='key' key={index} onClick={() => handleCardClick(character)}>
            <img
            src={character.image}
            alt={`Search Result ${index + 1}`} />
            <div className="grid-container" >
              <div className="title">
                <span className='ResultTally'>1 RESULT FOR</span> . 
                <span className="ResultName">{character.name || 'Unknown'}</span>{" "}
                <span className='Episodes'>Episode:{getEpisodeNumber(character.episode) || 'Unknown'}</span>
              </div>
              <br />
              <div className="name">{character.name}</div>
              <div className="status"><span className="green-circle"></span>
              <span className='BeingType'>{`${character.status} - ${character.species}`}</span>
              </div>
              <br />
              <div className="location">
                <span className="label">LAST KNOWN LOCATION</span><br />
                  {character.location && (
              <span className='Location'>{character.location.name}</span>
                      )}
                    </div>
              <br />
              <div className="residents"><span className="label">RESIDENTS</span><br />
              <span className="ResidentNumbers">{ character.residents ? character.residents.length : 0 }</span>
              </div>
              <br />
              <div className="first-seen"><span className="label">FIRST SEEN IN</span><br />
              <span className="species">{character.origin?.name}</span>
              </div>
              </div>
            </div>
        ))}
    </div>
    {selectedCharacter && isModalVisible && (
          <CharacterModal
            character={selectedCharacter}
            onClose={() => setIsModalVisible(false)}
          />
        )}
    </Layout>
    </>
  );
};

export default SearchResults;
