import { useEffect } from 'react';

const AUDIO_SRC = '/audio/Leher.mp3';

const memories = [
  {
    year: 'Month 1',
    title: 'The first spark',
    text: 'The beginning of something soft, sincere, and impossible to forget.',
  },
  {
    year: 'Month 2',
    title: 'The comfort of your presence',
    text: 'The simple joy of being understood, laughed with, and cherished.',
  },
  {
    year: 'Month 3',
    title: 'The little things',
    text: 'The tiny moments that slowly became our favorite memories.',
  },
  {
    year: 'Month 4',
    title: 'The feeling of us',
    text: 'A beautiful chapter that feels tender, real, and deeply ours.',
  },
];

function MemoryLane() {
  useEffect(() => {
    const audio = new Audio(AUDIO_SRC);
    audio.loop = true;
    audio.volume = 0.35;

    const playAudio = async () => {
      try {
        await audio.play();
      } catch {
        // Autoplay may be blocked until the user interacts with the page.
      }
    };

    playAudio();

    return () => {
      audio.pause();
      audio.currentTime = 0;
      audio.src = '';
    };
  }, []);

  return (
    <div className="memory-lane-page">
      <header className="memory-lane-hero">
        <p className="eyebrow">A walk through our memories</p>
        <h1>Memory Lane</h1>
        <p className="hero-copy">
          Every chapter of us has been special, and this page is just a little path back to the moments that made my heart feel at home.
        </p>
      </header>

      <main className="memory-lane-list">
        {memories.map((entry, index) => (
          <section key={entry.title} className="memory-card memory-lane-card">
            <div className="memory-number">{String(index + 1).padStart(2, '0')}</div>
            <div>
              <p className="memory-year">{entry.year}</p>
              <h3>{entry.title}</h3>
              <p>{entry.text}</p>
            </div>
          </section>
        ))}
      </main>

      <footer className="memory-footer">
        <a href="/" className="primary-btn">Back to the beginning</a>
      </footer>
    </div>
  );
}

export default MemoryLane;
