import React from 'react';
import SearchBar from './SearchBar';
const SearchResults: React.FC = () => {
  const handleSearch = (query: string) => {
    console.log('Searching for:', query);
      };
    return(
      <>
      <SearchBar onSearch={handleSearch} />
      <div className="Results">
        <img
        src="images/chudking.jpg"
        alt="Search Results"
      />
      <div className="grid-container">
        <div className="title"><span className='ResultTally'>1 RESULT FOR</span> <span className="ResultName">CHUD KING</span> <span className='Episodes'>EPISODE 10</span></div><br/>
        <div className="name">CHUD KING</div>
        <div className="status"><span className="green-circle"></span><span className='BeingType'>ALIVE - MYTHOLOGICAL CREATURE</span></div><br/>
        <div className="location"><span className="label">LAST KNOWN LOCATION</span><br/><span className='Location'>MR. GOLDENFOLD'S DREAM</span></div><br/>
        <div className="residents"><span className="label">RESIDENTS</span><br/><span className="ResidentNumbers">826</span></div><br/>
        <div className="first-seen"><span className="label">FIRST SEEN IN</span><br/><span className="species">LAWNMOWER DOG</span></div>
      </div>
    </div>
    </>
    )
}

export default SearchResults;
