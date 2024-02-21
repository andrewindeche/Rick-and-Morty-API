import React, { useRef, useEffect } from 'react';

const ImagePosters: React.FC = () => {
  const imageRef1 = useRef<HTMLImageElement>(null);
  const imageRef2 = useRef<HTMLImageElement>(null);
  const imageRef3 = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const fetchNewImage = async (imageRef: React.RefObject<HTMLImageElement>) => {
      try {
        const response = await fetch('https://rickandmortyapi.com/api/character/' + Math.floor(Math.random() * 671));
        const data = await response.json();
        const imageUrl = data.image;

        if (imageRef.current) {
          imageRef.current.src = imageUrl;
        }
      } catch (error) {
        console.error('Error fetching image:', error);
      }

      setTimeout(() => fetchNewImage(imageRef), 5000);
    };

    fetchNewImage(imageRef1);
    fetchNewImage(imageRef2);
    fetchNewImage(imageRef3);
  }, []);

  return (
    <div className="ImgContainer">
      <img
        ref={imageRef1}
        src=""
        alt="Rick and Morty"
        style={{ position: 'relative', transform: 'translate(-50%, -50%)', border: '8px solid #518D34', width: '180px', height: '230px' }}
      />
      <img
        ref={imageRef2}
        src=""
        alt="Rick and Morty"
        style={{ position: 'relative', transform: 'translate(-50%, -50%)', border: '8px solid #518D34', width: '180px', height: '230px' }}
      />
      <img
        ref={imageRef3}
        src=""
        alt="Rick and Morty"
        style={{ position: 'relative', transform: 'translate(-50%, -50%)', border: '8px solid #518D34', width: '180px', height: '230px' }}
      />
    </div>
  );
};

export default ImagePosters;
