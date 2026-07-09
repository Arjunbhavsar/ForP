import { useEffect, useRef } from 'react';

const AUDIO_SRC = `${import.meta.env.BASE_URL}audio/Leher.mp3`;

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

const memories = [
  {
    year: 'Month 1',
    title: 'The first spark',
    text: `The beginning of something soft, sincere, and full of promise. Who would have thought that one day, out of nowhere, I would get a message on Instagram and it would change my life forever? It all started with a simple hello, and from that first call, where we were both so nervous and shy, our journey began. Who could have guessed that after just a few short calls, we would be talking for hours and hours, and before we knew it, we would be talking about our future together?
        It was the first spark of something beautiful. Our first month was full of deep conversations, getting to know each other, and slowly understanding each other’s emotional depth. The calmness you bring into my life is something I had never felt before.
        How can I forget the kind of mess I was in at that time? But just a few calls with you made me feel so sure about you. I am so glad, and so lucky, that I met you. As the days went by, the length of our calls grew too. I still remember the comfort I felt during our emotional conversations. The way you made me feel loved and cared for is something I will always cherish.
        I don’t know how, but I was sure about you in the first month itself.`,
  },
  {
    year: 'Month 2',
    title: 'The comfort of your presence',
    text: `Now that we have a video call almost every day, would you believe it if I said it took us a month to get on our first video call?

The second month came into our lives like a roller coaster, testing whether we were really meant for each other and whether the spark we felt in the first month was something real. Just when we thought everything was going so well, our story was already being tested. Our conversations deepened, and we both started being more honest with each other.

The heavy conversations about the past, the intense conversation with your dad on the very first call, and suddenly feeling the struggle of staying in touch while being in different time zones. Who would have thought we would come out of all of it even stronger?

Working through all of this didn’t feel so hard because of your calmness. All the struggles we had this month actually brought us even closer. Somewhere along the way, you stopped being just Preeti H in my phone and became Preet♥️ in my heart.
By the end of the second month, I had already confessed how sure I am about you.`,
  },
  {
    year: 'Month 3',
    title: 'The little things we started experiencing together',
    text: `It’s the tiny moments that have slowly become my absolute favorite memories. The story of your very first gift is unforgettable—I still remember the look on your face when I told you it was stolen! Seeing how much it hurt you made me realize just how deeply you care about us. Replacing it together only made it more special. This month has been such a beautiful chapter of new experiences for us: our first virtual date, tracking our days and distance on the Couple Pulse app, and starting our first movie together (even if we haven't finished it yet!). To an outsider, these little things might seem simple or cliché, but to me, they are incredibly precious. They prove that all the effort we put into keeping our relationship exciting truly matters and keeps us both in such a happy place. God only knows what crazy adventures are waiting for us, but I know we’re going to have the absolute best time facing them together! 💖✨`,
  },
  {
    year: 'Month 4',
    title: 'The feeling of us together',
    text: `We are writing a beautiful chapter right now—one that is tender, authentic, and completely ours. 💞 I will never forget the day we chose to step into the next level of our relationship and truly commit to a future together. Whispering "I love you" to each other felt like cosmic timing; everything just clicked. Even though we had gone through such intense conversations that day, your confession washed over me with a sudden, beautiful relief that I can still feel. 🌊This month brought a monumental milestone: my parents traveling to meet their daughter-in-law for the first time. 💍✨ That day is officially locked away as one of the absolute happiest moments of my life. You were so beautifully nervous, and even though my words couldn't completely calm you, being up with you at 4:00 AM on the phone just to hold your hand from afar meant the world to me. Of course, you absolutely charmed them all, winning them over with the exact same innocent, radiant smile that captured my heart. It made me realize how incredibly blessed I am. This month gave us both the jitters and the ultimate relief, bringing us closer than ever. 🔐✨`,
  },
];

function MemoryLane() {
  const { handleAudioStart } = usePageAudio(AUDIO_SRC);

  return (
    <div
      className="memory-lane-page"
      onPointerDownCapture={handleAudioStart}
      onTouchStartCapture={handleAudioStart}
      onKeyDownCapture={handleAudioStart}
    >
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
        <a href="#/" className="primary-btn">Back to the beginning</a>
      </footer>
    </div>
  );
}

export default MemoryLane;
