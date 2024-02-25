import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWindowClose} from '@fortawesome/free-solid-svg-icons';
import { faEraser} from '@fortawesome/free-solid-svg-icons';
import { faCheckSquare} from '@fortawesome/free-solid-svg-icons';

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

  const handlePostNote = async () => {
    if (note.trim() !== '') {
      try {
        await fetch('http://localhost:3000/api/notes', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            characterName: character.name,
            note,
          }),
        });

        setPostedNotes((prevNotes) => [...prevNotes, note]);
        setNote('');
      } catch (error) {
        console.error('Error posting note:', error);
      }
    }
  };
  const handleClearNote = () => {
    setNote('');
    setPostedNotes([]);
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
        <div className="textareabutton">
        <textarea className='text-area'
          placeholder="Add notes about the character..."
          value={note}
          onChange={(e) => setNote(e.target.value)}
        />
        <div className='notes-button'>
        <button className='post-button' onClick={handlePostNote}>
          Post<FontAwesomeIcon icon={faCheckSquare} />
          </button>
        <button className='clear-button' onClick={handleClearNote}>
          Clear<FontAwesomeIcon icon={faEraser} />
          </button>
        <button className="close-button" onClick={onClose}>
          Close<FontAwesomeIcon icon={faWindowClose} />
        </button>
        </div>
      </div>
      </div>
            <div className="notes-section">
            <p><span className='NotesTitle'>Notes about:</span> {character.name} </p>
            {postedNotes.map((postedNote, index) => (
            <div key={index} className="posted-note">
              {postedNote}
            </div>
          ))}
        </div>
      </div>
    );
};

export default CharacterModal;