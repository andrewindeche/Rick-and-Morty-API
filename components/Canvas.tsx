import { useEffect, useRef } from 'react';
import React from "react";
const MyCanvas: React.FC = () => {
  const imageRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const cnv = document.getElementById("cnv") as HTMLCanvasElement;
    const ctx = cnv.getContext("2d");
    const W = window.innerWidth;
    const H = window.innerHeight * 0.24;

    cnv.width = W;
    cnv.height = H;
    ctx.fillStyle = "#112";
    ctx.fillRect(0, 0, W, H);

    ctx.shadowBlur = 10;
    ctx.shadowColor = "white";

    const animate = () => {
      const x = W * Math.random();
      const y = H * Math.random();
      const r = 2.5 * Math.random();

      ctx.beginPath();
      ctx.fillStyle = "white";
      ctx.arc(x, y, r, 0, Math.PI * 2);
      ctx.fill();

      setTimeout(animate, 100);
    };

    animate();

    const fetchNewImage = async () => {
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

      setTimeout(fetchNewImage, 5000);
    };

    fetchNewImage();

    return () => {
    };
  }, []); 

  return (
    <>
      <canvas id="cnv"></canvas>
      <img 
        src="images/Logo.jpg" 
        alt="Logo"
        style={{ position: 'absolute', left: '0', top: '0',transform: 'translate(-50%, -50%)', border:'8px solid #55BB25', width: '200px', height: '120px',margin:'4em 6.8em 2em' }}
       />
      <img
        ref={imageRef}
        src=""
        alt="Rick and Morty"
        style={{ position: 'absolute', left: '50%', top: '0',transform: 'translate(-50%, -50%)', border:'8px solid #55BB25', width: '150px', height: '120px',margin:'4em' }}
      />
    </>
  );
};

export default MyCanvas;
