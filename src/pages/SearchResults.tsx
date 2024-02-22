import React, { ReactNode, useEffect, useState } from 'react';
import SearchBar from 'components/SearchBar';
import Layout from 'components/Layout';
import { useRouter } from 'next/router';

interface SearchResultsProps {
  onSearch: (query: string, results: any[]) => void; 
}
const SearchResults: React.FC<SearchResultsProps> = ({ onSearch }) => {
  const router = useRouter();
    const { q, results } = router.query;
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
      const parsedResults = JSON.parse(results as string);
      setSearchResults(parsedResults);
  }, [results]);

return(
  <>
    <Layout>
      <SearchBar />
      <div className="Results">
        {searchResults.map((character, index) =>(
        <div key={index}>
        <img
            src={character.image}
            alt={`Search Result ${index + 1}`} />
            <div className="grid-container">
              <div className="title"><span className='ResultTally'>1 RESULT FOR</span> <span className="ResultName">{character.name}</span> <span className='Episodes'>{character.episode}</span></div><br />
              <div className="name">{character.name}</div>
              <div className="status"><span className="green-circle"></span><span className='BeingType'>{`${character.status} - ${character.species}`}</span></div><br />
              <div className="location"><span className="label">LAST KNOWN LOCATION</span><br /><span className='Location'>{character.location.name}</span></div><br />
              <div className="residents"><span className="label">RESIDENTS</span><br /><span className="ResidentNumbers">{character.residents.length}</span></div><br />
              <div className="first-seen"><span className="label">FIRST SEEN IN</span><br /><span className="species">{character.origin.name}</span>
              </div>
            </div>
            </div>
        ))}
    </div>
    </Layout>
    </>
  );
};

export default SearchResults;
