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
    chapter: 'First look - Preeti',
    title: 'The look I always remember',
    story:
      'Some pictures stay with you forever, and this is one of them. this picture still gives me jitters .',
    quote: 'Some looks say everything without a word.',
    image: `${import.meta.env.BASE_URL}gallery/firstlook.JPG`,
  },
  {
    chapter: 'Favorite look - Arjun',
    title: 'the look she adores',
    story:
      'If this photo makes your heart happy, then it has already become my favorite too.',
    quote: 'The heart remembers what the eyes once saw.',
    image: `${import.meta.env.BASE_URL}gallery/Arjun.jpg`,
  },
  {
    chapter: 'Candid moment',
    title: 'Your piano moment',
    story:
      'A beautiful little frame of you at the piano, completely in your own world. It feels graceful, and exactly like the kind of memory I want to keep forever.',
    quote: 'Some moments do not need words to stay unforgettable.',
    image: `${import.meta.env.BASE_URL}gallery/piano.JPG`,
  },
  {
    chapter: 'Our first date',
    title: 'Our first date frame',
    story:
      'A tiny moment from one of our sweetest date memories. The joy in this frame still feels as fresh as that day.',
    quote: 'Some dates end, but their warmth does not.',
    image: `${import.meta.env.BASE_URL}gallery/firstdate.JPG`,
  },
  {
    chapter: 'Virtual birthday',
    title: 'Birthday call memory',
    story:
      'That call felt full of smiles and celebration. You could feel the happiness radiating through the phone.',
    quote: 'Happiness looks best when it is shared.',
    image: `${import.meta.env.BASE_URL}gallery/birthday.PNG`,
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
