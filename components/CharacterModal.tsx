import React, { useState } from 'react';

interface CharacterModalProps {
    character: {
      image: string;
      location: { name: string };
      origin: { name: string };
      status: string;
      species: string;
      name: string;
    };
    onClose: () => void;
  }

const CharacterModal: React.FC<CharacterModalProps> = ({ character, onClose }) => {
  const [note, setNote] = useState('');
  const [postedNotes, setPostedNotes] = useState<string[]>([]);

  const handlePostNote = () => {
    if (note.trim() !== '') {
      setPostedNotes((prevNotes) => [...prevNotes, note]);
      setNote('');
    }
  };
    return(
        <div className="character-modal">
        <div className="modal-content">
        {character && character.image && ( 
          <img src={character.image} alt={character.name} />
          )}
          <div className="details">
          {character && ( 
            <>
            <span className="ResultName">{character.name || 'Unknown'}</span>
            <div className="detail-row">
              <span className="label">Last Known Location:</span>
              <span className="value">{character.location.name}</span>
            </div>
            <div className="detail-row">
              <span className="label">First Seen In:</span>
              <span className="value">{character.origin.name}</span>
            </div>
            <div className="detail-row">
              <span className="label">Alive:</span>
              <span className="value">{character.status === 'Alive' ? 'Yes' : 'No'}</span>
            </div>
            <div className="detail-row">
              <span className="label">Species:</span>
              <span className="value">{character.species}</span>
            </div>
            </>
            )}
          </div>
          <div className="notes-section">
            <p>Notes </p>
          {postedNotes.map((postedNote, index) => (
            <div key={index} className="posted-note">
              {postedNote}
            </div>
          ))}
        </div>
        <textarea
          placeholder="Add notes about the character..."
          value={note}
          onChange={(e) => setNote(e.target.value)}
        />
        <button className='post-button' onClick={handlePostNote}>Post Note</button>
        <button className="close-button" onClick={onClose}>
          Close
        </button>
      </div>
      </div>
    );
};

export default CharacterModal;