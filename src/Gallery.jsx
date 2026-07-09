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
    title: 'Your piano moment',
    story:
      'A beautiful little frame of you at the piano, completely in your own world. It feels graceful, calm, and exactly like the kind of memory I want to keep forever.',
    quote: 'Some moments do not need words to stay unforgettable.',
    image: `${import.meta.env.BASE_URL}gallery/piano.jpg`,
  },
  {
    chapter: 'Chapter Two',
    title: 'Our little heart on call',
    story:
      'Even from far away, we still found a way to make the screen feel close. That little heart shape says everything about us in one simple moment.',
    quote: 'Distance means very little when the feeling is real.',
    image: `${import.meta.env.BASE_URL}gallery/call-heart.jpg`,
  },
  {
    chapter: 'Chapter Three',
    title: 'The calls I never want to forget',
    story:
      'The ordinary calls became some of the most meaningful parts of our days. They held laughter, comfort, and the kind of closeness that stays with me long after they end.',
    quote: 'The smallest routines often become the biggest treasures.',
    image: `${import.meta.env.BASE_URL}gallery/video-call.jpg`,
  },
  {
    chapter: 'Chapter Four',
    title: 'You, glowing in tradition',
    story:
      'This picture feels timeless. It holds beauty, warmth, and the quiet pride of seeing you look so radiant in a moment that already feels special to remember.',
    quote: 'Some pictures feel like devotion turned into memory.',
    image: `${import.meta.env.BASE_URL}gallery/festival.jpg`,
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
