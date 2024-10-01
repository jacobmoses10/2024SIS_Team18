import React, { useEffect, useRef } from 'react';

const GridOverlay = () => {
  const gridCanvasRef = useRef(null);

  // Function to draw the grid using an overlay canvas
  const drawGridOverlay = () => {
    const gridSpacing = 20; // Spacing between grid lines
    const gridColor = '#ccc'; // Light grid color

    const canvas = gridCanvasRef.current;
    const ctx = canvas.getContext('2d');
    const width = canvas.width = window.innerWidth;
    const height = canvas.height = window.innerHeight;

    // Clear the grid canvas
    ctx.clearRect(0, 0, width, height);

    // Draw vertical lines
    for (let x = 0; x <= width; x += gridSpacing) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, height);
      ctx.strokeStyle = gridColor;
      ctx.lineWidth = 0.5;
      ctx.stroke();
    }

    // Draw horizontal lines
    for (let y = 0; y <= height; y += gridSpacing) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(width, y);
      ctx.strokeStyle = gridColor;
      ctx.lineWidth = 0.5;
      ctx.stroke();
    }
  };

  useEffect(() => {
    drawGridOverlay(); // Draw the grid overlay when the component mounts

    // Re-draw the grid on window resize
    const handleResize = () => {
      drawGridOverlay();
    };
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize); // Clean up on unmount
    };
  }, []);

  return (
    <canvas ref={gridCanvasRef} className="absolute top-0 left-0 w-full h-full pointer-events-none z-20"></canvas>
  );
};

export default GridOverlay;
