import { useState } from 'react';

const options = [
  {
    id: 1,
    text: 'A candlelit dinner under the stars',
    emoji: '🌙',
  },
  {
    id: 2,
    text: 'A cozy walk and dessert together',
    emoji: '🍰',
  },
  {
    id: 3,
    text: 'A little surprise date with music and magic',
    emoji: '🎶',
  },
];

function DateGame() {
  const [selected, setSelected] = useState(null);
  const [revealed, setRevealed] = useState(false);

  const handleSelect = (option) => {
    setSelected(option);
    setRevealed(true);
  };

  return (
    <div className="date-game-page">
      <header className="date-game-hero">
        <p className="eyebrow">A little invitation</p>
        <h1>Will you go on a date with me?</h1>
        <p className="hero-copy">
          Choose your favorite kind of adventure, and let’s make it a beautiful evening together.
        </p>
      </header>

      <main className="date-game-content">
        {!revealed ? (
          <>
            <p className="game-instruction">Pick the one that sounds most like us:</p>
            <div className="date-options">
              {options.map((option) => (
                <button key={option.id} className="date-option" onClick={() => handleSelect(option)}>
                  <span className="date-emoji">{option.emoji}</span>
                  <span>{option.text}</span>
                </button>
              ))}
            </div>
          </>
        ) : (
          <div className="date-result">
            <p className="game-instruction">Perfect choice</p>
            <h2>You picked: {selected?.text}</h2>
            <p>
              That sounds like the kind of evening I’d love to share with you. So let’s make it happen —
              just you, me, and a little bit of magic.
            </p>
            <div className="date-actions">
              <a href="#/" className="primary-btn">Back home</a>
              <a href="#/gallery" className="secondary-btn">See our memories</a>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

export default DateGame;
