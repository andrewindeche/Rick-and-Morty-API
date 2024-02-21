import React, {useState,useEffect} from 'react';

const words = ["HALLOO!!!", "WELCOME", "TO", "RICK", "AND", "MORTY", "SEARCH", "ENGINE!"]

const WordAnimation: React.FC = () => {
    const [visibleWords,setVisibleWords] = useState<string[]>([]);
    useEffect(() => {
        const interval = setInterval(() => {
            setVisibleWords((prevWords) => [...prevWords, words[prevWords.length]]);
          }, 300); 
      
          if (visibleWords.length === words.length) {
            clearInterval(interval);
          }
      
          return () => clearInterval(interval);
    }
    return()
};

export default WordAnimation;
