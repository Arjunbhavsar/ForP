import { useEffect, useRef } from 'react';

const AUDIO_SRC = `${import.meta.env.BASE_URL}audio/Mashooqa.mp3`;

function usePageAudio(audioSrc) {
  const audioRef = useRef(null);

  useEffect(() => {
    const audio = new Audio(audioSrc);
    audioRef.current = audio;
    audio.loop = true;
    audio.volume = 0.35;
    audio.preload = 'auto';

    const tryPlay = async () => {
      if (!audio.paused) return;

      try {
        await audio.play();
      } catch {
        // Browsers may still block playback until a direct user gesture occurs.
      }
    };

    const handleVisibility = () => {
      if (document.visibilityState === 'visible') {
        tryPlay();
      }
    };

    tryPlay();
    document.addEventListener('visibilitychange', handleVisibility);

    return () => {
      document.removeEventListener('visibilitychange', handleVisibility);
      audio.pause();
      audio.currentTime = 0;
      audio.src = '';
    };
  }, [audioSrc]);

  const handleAudioStart = async () => {
    const audio = audioRef.current;
    if (!audio || !audio.paused) return;

    try {
      await audio.play();
    } catch {
      // Keep trying on later interactions.
    }
  };

  return { handleAudioStart };
}

const galleryItems = [
  {
    chapter: 'Chapter One',
    title: 'The first time it felt real',
    story:
      'The day our conversations started carrying a little more warmth than usual. It felt gentle, unfamiliar, and beautiful — like the beginning of a story I wanted to keep reading.',
    quote: 'Some beginnings are quiet, but they stay with you forever.',
    image: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=900&q=80',
  },
  {
    chapter: 'Chapter Two',
    title: 'The comfort of your presence',
    story:
      'The moments that made everything feel easy. The laughter, the calm, the way your presence softened the world around us and made ordinary days feel tender.',
    quote: 'Love often lives in the quietest moments.',
    image: 'https://images.unsplash.com/photo-1522673607200-164d1b6ce486?auto=format&fit=crop&w=900&q=80',
  },
  {
    chapter: 'Chapter Three',
    title: 'The little memories we kept',
    story:
      'The small things that became treasures — a smile, a shared joke, a glance, a conversation that lingered long after it ended. These are the moments that made us feel like us.',
    quote: 'It is often the smallest memories that stay the longest.',
    image: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=900&q=80',
  },
];

function Gallery() {
  const { handleAudioStart } = usePageAudio(AUDIO_SRC);

  return (
    <div
      className="gallery-page"
      onPointerDownCapture={handleAudioStart}
      onTouchStartCapture={handleAudioStart}
      onKeyDownCapture={handleAudioStart}
    >
      <header className="gallery-hero">
        <p className="eyebrow">A walk through our memories</p>
        <h1>Where our little story lives</h1>
        <p className="hero-copy">
          This is not just a gallery. It is a gentle path back to the moments that made our connection feel real, warm, and unforgettable.
        </p>
      </header>

      <main className="gallery-journey">
        {galleryItems.map((item, index) => (
          <article key={item.title} className={`gallery-story-card ${index % 2 === 0 ? 'left' : 'right'}`}>
            <img src={item.image} alt={item.title} />
            <div className="gallery-story-content">
              <p className="gallery-chapter">{item.chapter}</p>
              <h3>{item.title}</h3>
              <p>{item.story}</p>
              <p className="gallery-quote">“{item.quote}”</p>
            </div>
          </article>
        ))}
      </main>

      <footer className="memory-footer">
        <a href="#/memory-lane" className="primary-btn">Continue to memory lane</a>
        <a href="#/" className="secondary-btn">Back to the beginning</a>
      </footer>
    </div>
  );
}

export default Gallery;
