import React, { useState, useEffect } from 'react';

const CardMatching = ({ gridSize, handleGridSizeChange }) => {
  const [cards, setCards] = useState([]);
  const [openCards, setOpenCards] = useState([]);
  const [matchedCards, setMatchedCards] = useState([]);
  const [isGameOver, setIsGameOver] = useState(false);
  console.log(isGameOver);
  
  useEffect(() => {
    const numCards = gridSize * gridSize;
    const numUniqueCards = numCards / 2;
    const cards = [];

    
    for (let i = 1; i <= numUniqueCards; i++) {
      cards.push({ id: i, value: i, matched: false });
      cards.push({ id: numUniqueCards + i, value: i, matched: false });
    }

    
    setCards(shuffleCards(cards));
  }, [gridSize]);

  
  const resetGame = () => {
    setOpenCards([]);
    setMatchedCards([]);
    setIsGameOver(false);
    handleGridSizeChange(0);
  };

  
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

  
  useEffect(() => {
    if (matchedCards.length === cards.length) {
      setIsGameOver(true);
    } else {
      setIsGameOver(false);
    }
  }, [matchedCards.length, cards]);

  
  const shuffleCards = (cards) => {
    return cards.sort(() => Math.random() - 0.5);
  };
  
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
