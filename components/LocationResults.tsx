import React from 'react';

const Location: React.FC = () => {
    return(
        <div className='LocationResults'>
          <div className="header">
        <div className="location">LOCATION: EARTH</div>
        <div className="residents">RESIDENTS: 826</div>
      </div>
      <div className="results">5 RESULT FOR: EARTH</div>
      <div className="cards">
        <div className="card">
          <img src="images/centaur.jpeg" alt="Centaur" />
          <div className="name">CENTAUR</div>
          <div className="description">ALIVE - MYTHOLOGICAL CREATURE</div>
        </div>
        <div className="card">
          <img src="images/randy.jpeg" alt="Randy Dicknose" />
          <div className="name">RANDY DICKNOSE</div>
          <div className="description">ALIVE - INTERDIMENSIONAL CABLE</div>
        </div>
        <div className="card">
          <img src="images/morphizer.jpeg" alt="Morphizer-XE Customer Support" />
          <div className="name">MORPHIZER-XE CUSTOMER SUPPORT</div>
          <div className="description">ALIVE - ALIEN</div>
        </div>
        <div className="card">
          <img src="images/facistshrimpss.jpeg" alt="Facist Shrimp $$" />
          <div className="name">FACIST SHRIMP $$</div>
          <div className="description">ALIVE - ANIMAL</div>
        </div>
        <div className="card">
          <img src="images/toocute.jpeg" alt="TooCuteToMurderSummer $$" />
          <div className="name">TOO CUTE TO MURDER SUMMER $$</div>
          <div className="description">DEAD - ROBOT</div>
        </div>
      </div>
        </div>
    )
}
export default Location;