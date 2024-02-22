import { useEffect} from 'react';
import React from "react";
import Link from 'next/link';
const MyCanvas: React.FC = () => {
  useEffect(() => {
    const cnv = document.getElementById("cnv") as HTMLCanvasElement;
    const ctx = cnv.getContext("2d");
    const W = window.innerWidth;
    const H = window.innerHeight * 0.22;

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

    return () => {
    };
  }, []); 

  return (
    <>
      <canvas id="cnv"></canvas>
      <Link href="/">
            <a></a>
      <img 
        src="images/Logo.jpg" 
        alt="Logo"
        style={{ position: 'absolute', left: '0', top: '0',transform: 'translate(-50%, -50%)', border:'8px solid #55BB25', width: '150px', height: '106px',margin:'3.8em 5em 2em' }}
       />
      </Link>
    </>
  );
};

export default MyCanvas;
