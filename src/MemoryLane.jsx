import { useEffect } from 'react';

const AUDIO_SRC = '/audio/Leher.mp3';

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
        <a href="#/" className="primary-btn">Back to the beginning</a>
      </footer>
    </div>
  );
}

export default MemoryLane;
