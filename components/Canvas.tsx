import { useEffect } from 'react';

const MyCanvas: React.FC = () => {
  useEffect(() => {
    const cnv = document.getElementById("cnv") as HTMLCanvasElement;
    const ctx = cnv.getContext("2d");
    const W = window.innerWidth;
    const H = window.innerHeight;

    cnv.width = W;
    cnv.height = H * 0.25;
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
      <canvas id="cnv"></canvas>
  );
};

export default MyCanvas;
