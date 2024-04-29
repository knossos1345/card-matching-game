import React, { useState, useEffect } from 'react';

const CardMatching = ({ gridSize, handleGridSizeChange }) => {
  const [cards, setCards] = useState([]);
  const [openCards, setOpenCards] = useState([]);
  const [matchedCards, setMatchedCards] = useState([]);
  const [isGameOver, setIsGameOver] = useState(false);
  console.log(isGameOver);
  // Generate cards based on the grid size
  useEffect(() => {
    const numCards = gridSize * gridSize;
    const numUniqueCards = numCards / 2;
    const cards = [];

    // Create cards with unique numbers
    for (let i = 1; i <= numUniqueCards; i++) {
      cards.push({ id: i, value: i, matched: false });
      cards.push({ id: numUniqueCards + i, value: i, matched: false });
    }

    // Shuffle the cards
    setCards(shuffleCards(cards));
  }, [gridSize]);

  // Reset the game state
  const resetGame = () => {
    setOpenCards([]);
    setMatchedCards([]);
    setIsGameOver(false);
    handleGridSizeChange(0);
  };

  // Handle card click
  const handleCardClick = (card) => {
    if (openCards.length === 2 || matchedCards.includes(card.id)) {
      return;
    }

    setOpenCards([...openCards, card]);

    if (openCards.length === 1) {
      const [firstCard] = openCards;
      if (firstCard.value === card.value) {
        setMatchedCards([...matchedCards, firstCard.id, card.id]);
        setOpenCards([]);
      } else {
        setTimeout(() => {
          setOpenCards([]);
        }, 1000);
      }
    }
  };

  // Check if the game is over
  useEffect(() => {
    if (matchedCards.length === cards.length) {
      setIsGameOver(true);
    } else {
      setIsGameOver(false);
    }
  }, [matchedCards.length, cards]);

  // Shuffle cards
  const shuffleCards = (cards) => {
    return cards.sort(() => Math.random() - 0.5);
  };
  console.log(
    gridSize,
    matchedCards,
    'cards',
    cards,
    isGameOver,
    matchedCards.length === cards.length
  );
  return (
    <div className="game-wrapper flow">
      {isGameOver || !gridSize ? (
        <button onClick={resetGame}>Play Again</button>
      ) : (
        <>
          <div className={`grid grid-${gridSize}`}>
            {cards.map((card) => (
              <div
                key={card.id}
                className={`card ${openCards.includes(card) ? 'open' : ''} ${
                  matchedCards.includes(card.id) ? 'matched' : ''
                }`}
                onClick={() => handleCardClick(card)}
              >
                {openCards.includes(card) || matchedCards.includes(card.id)
                  ? card.value
                  : ''}
              </div>
            ))}
          </div>
          <button onClick={resetGame}>Restart</button>
        </>
      )}
    </div>
  );
};

export default CardMatching;
