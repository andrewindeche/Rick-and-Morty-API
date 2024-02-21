import React, { useState,useEffect } from 'react';

const words = ["HALLOO!!!", "WELCOME", "TO", "RICK", "AND", "MORTY", "SEARCH", "ENGINE!"]

const WordAnimations: React.FC = () => {
    const [visibleWords,setVisibleWords] = useState<string[]>([]);
    useEffect(() => {
        const interval = setInterval(() => {
            setVisibleWords((prevWords) => [...prevWords, words[prevWords.length]]);
          }, 300); 
      
          if (visibleWords.length === words.length) {
            clearInterval(interval);
          }
      
          return () => clearInterval(interval);
    }, [visibleWords]);

    return(
    <div className="navigation">
      {visibleWords.map((word, index) => (
         <React.Fragment key={index}>
        {index > 0 && ' ' }<span>{word}</span>
        </React.Fragment>
      ))}
    </div>
    );
};

export default WordAnimations;
