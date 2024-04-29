import React, { useState } from 'react';
import CardMatching from './CardMatching';

const GameSetup = () => {
  const [gridSize, setGridSize] = useState(0);
  const gridSizes = [2, 4, 6];

  const handleGridSizeChange = (size) => {
    setGridSize(size);
  };

  return (
    <div className="flow container">
      <h1>Card Matching Game</h1>
      {!gridSize ? (
        <div className="setup-wrapper">
          {gridSizes.map((d, i) => (
            <button
              onClick={() => handleGridSizeChange(d)}
            >{`${d}x${d}`}</button>
          ))}
        </div>
      ) : (
        <CardMatching
          gridSize={gridSize}
          handleGridSizeChange={handleGridSizeChange}
        />
      )}
    </div>
  );
};

export default GameSetup;
