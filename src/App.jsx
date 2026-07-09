import { useEffect, useState } from 'react';

const AUDIO_SRC = '/audio/Tujhko.mp3';
const startDate = new Date('2026-02-26T00:00:00');

function getTimeTogether() {
  const now = new Date();
  const diff = Math.max(0, now.getTime() - startDate.getTime());
  const totalSeconds = Math.floor(diff / 1000);

  return {
    days: Math.floor(totalSeconds / 86400),
    hours: Math.floor((totalSeconds % 86400) / 3600),
    minutes: Math.floor((totalSeconds % 3600) / 60),
    seconds: totalSeconds % 60,
  };
}

function LiveTimer() {
  const [timeTogether, setTimeTogether] = useState(getTimeTogether);

  useEffect(() => {
    const interval = window.setInterval(() => {
      setTimeTogether(getTimeTogether());
    }, 1000);

    return () => window.clearInterval(interval);
  }, []);

  return (
    <div className="live-timer" aria-label={`Time together since 26 February 2026`}>
      <p className="live-timer-label">
        <span className="timer-heart">♡</span>
        Time together
        <span className="timer-heart">♡</span>
        <span className="timer-beat">❤</span>
      </p>
      <div className="live-timer-grid">
        <div className="timer-unit">
          <span>{String(timeTogether.days).padStart(2, '0')}</span>
          <small>Days</small>
        </div>
        <div className="timer-unit">
          <span>{String(timeTogether.hours).padStart(2, '0')}</span>
          <small>Hours</small>
        </div>
        <div className="timer-unit">
          <span>{String(timeTogether.minutes).padStart(2, '0')}</span>
          <small>Mins</small>
        </div>
        <div className="timer-unit">
          <span>{String(timeTogether.seconds).padStart(2, '0')}</span>
          <small>Secs</small>
        </div>
      </div>
      <p className="live-timer-date">Since 26 Feb 2026</p>
    </div>
  );
}

const memories = [
  {
    title: 'Our first little rituals',
    text: 'From our first conversations to the comfort of your voice, every small moment became something tender.',
    icon: '❦',
  },
  {
    title: 'Late-night conversations',
    text: 'Some of my favorite memories are the ones where time slowed down and the world felt wonderfully still.',
    icon: '✦',
  },
  {
    title: 'Little surprises',
    text: 'Even the smallest gestures felt special because they carried your warmth, care, and grace.',
    icon: '✿',
  },
];

const timeline = [
  'The beginning of something soft, sincere, and full of promise.',
  'Quiet laughter, warm conversations, and the comfort of feeling understood.',
  'Little moments that slowly became treasured memories.',
  'And now, I feel grateful for every step we have shared together.',
];

const memoryLaneEntries = [
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

const galleryPreview = [
  {
    title: 'The first time it felt real',
    story: 'A quiet beginning that felt gentle, warm, and impossible to forget.',
    image: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=900&q=80',
  },
  {
    title: 'The comfort of your presence',
    story: 'The calm, the smiles, and the way ordinary days felt tender with you.',
    image: 'https://images.unsplash.com/photo-1522673607200-164d1b6ce486?auto=format&fit=crop&w=900&q=80',
  },
  {
    title: 'The little memories we kept',
    story: 'Small joys, shared laughter, and moments that stayed long after the day ended.',
    image: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=900&q=80',
  },
];

function App() {
  useEffect(() => {
    const audio = new Audio(AUDIO_SRC);
    audio.loop = true;
    audio.volume = 0.35;
    audio.preload = 'auto';

    let unlocked = false;

    const attemptPlay = async () => {
      if (unlocked) return;

      try {
        await audio.play();
        unlocked = true;
      } catch {
        // Browser may block autoplay until the user interacts first.
      }
    };

    const handleInteraction = () => {
      attemptPlay();
    };

    const handleVisibility = () => {
      if (document.visibilityState === 'visible') {
        attemptPlay();
      }
    };

    window.addEventListener('click', handleInteraction);
    window.addEventListener('keydown', handleInteraction);
    window.addEventListener('touchstart', handleInteraction);
    document.addEventListener('visibilitychange', handleVisibility);

    attemptPlay();

    return () => {
      window.removeEventListener('click', handleInteraction);
      window.removeEventListener('keydown', handleInteraction);
      window.removeEventListener('touchstart', handleInteraction);
      document.removeEventListener('visibilitychange', handleVisibility);
      audio.pause();
      audio.currentTime = 0;
      audio.src = '';
    };
  }, []);

  return (
    <div className="page-shell">
      <header id="hero" className="hero">
        <LiveTimer />
        <p className="eyebrow">A timeless note for you</p>
        <h1>For Preeti</h1>
        <p className="hero-copy">
          In these last four months, my heart has learned the quiet beauty of your presence — the gentle laughter,
          the thoughtful moments, and the way ordinary days have become something I never want to forget.
        </p>
        <div className="hero-actions">
          <a className="primary-btn" href="#memories">
            Read our memories
          </a>
          <a className="secondary-btn" href="#/memory-lane">
            Visit memory lane
          </a>
          <a className="secondary-btn" href="#/gallery">
            Open the gallery
          </a>
        </div>
      </header>

      <main>
        <section id="memories" className="story-section">
          <div className="section-heading">
            <p className="section-label">A little collection</p>
            <h2>Of the moments I will always hold dear</h2>
          </div>
          <div className="card-grid">
            {memories.map((memory) => (
              <article key={memory.title} className="memory-card">
                <span className="icon">{memory.icon}</span>
                <h3>{memory.title}</h3>
                <p>{memory.text}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="letter-section">
          <div className="letter-card">
            <p className="section-label">My heart in words</p>
            <h2>A note from me</h2>
            <p>
              Preeti, you have made these past four months feel gentle, exciting, and deeply meaningful. I keep finding
              myself smiling when I think about the memories we have made together, and I hope this small page helps
              capture just a glimpse of how truly special you are to me.
            </p>
            <p>
              Thank you for being the kind of person who can make ordinary days feel beautiful. I am grateful for every
              laugh, every conversation, and every moment that has drawn us closer.
            </p>
            <p className="signature">— Yours, always</p>
          </div>
        </section>

        <section className="timeline-section">
          <div className="section-heading">
            <p className="section-label">Through the months</p>
            <h2>Four months, one beautiful chapter</h2>
          </div>
          <div className="timeline">
            {timeline.map((entry, index) => (
              <div key={entry} className="timeline-item">
                <span>{String(index + 1).padStart(2, '0')}</span>
                <p>{entry}</p>
              </div>
            ))}
          </div>
        </section>

        <section id="memory-lane-section" className="story-section">
          <div className="section-heading">
            <p className="section-label">A walk through our story</p>
            <h2>Memory Lane</h2>
          </div>
          <div className="memory-lane-preview-list">
            {memoryLaneEntries.map((entry) => (
              <article key={entry.title} className="memory-lane-preview-item">
                <p className="memory-year">{entry.year}</p>
                <h3>{entry.title}</h3>
                <p>{entry.text}</p>
              </article>
            ))}
          </div>
          <div className="section-actions">
            <a className="secondary-btn" href="#/memory-lane">
              Open the full memory lane
            </a>
          </div>
        </section>

        <section id="gallery-section" className="story-section">
          <div className="section-heading">
            <p className="section-label">Little snapshots</p>
            <h2>Pictures and the stories that live with them</h2>
          </div>
          <div className="gallery-preview-grid">
            {galleryPreview.map((item) => (
              <article key={item.title} className="gallery-preview-card">
                <img src={item.image} alt={item.title} />
                <div className="gallery-preview-content">
                  <h3>{item.title}</h3>
                  <p>{item.story}</p>
                </div>
              </article>
            ))}
          </div>
          <div className="section-actions">
            <a className="secondary-btn" href="#/gallery">
              Open the full gallery
            </a>
          </div>
        </section>
      </main>

      <footer>
        <p>Made with love for Preeti</p>
      </footer>
    </div>
  );
}

export default App;
