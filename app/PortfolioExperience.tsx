import Image from "next/image";

type WorkItem = {
  name: string;
  discipline: string;
  detail: string;
  note: string;
  href?: string;
};

type RecordItem = {
  album: string;
  artist: string;
  track: string;
  year: string;
  image: string;
  href: string;
  shelf: "A" | "B";
};

const work: readonly WorkItem[] = [
  {
    name: "Cumulus Labs",
    discipline: "Software engineer",
    detail: "AI infrastructure for production systems that need speed and control.",
    note: "YC W26 / Current",
    href: "https://cumuluslabs.io",
  },
  {
    name: "DecaPal",
    discipline: "Founder and product",
    detail: "An AI sparring partner for high-stakes competitive roleplay.",
    note: "Independent / 2025",
  },
  {
    name: "Robotics",
    discipline: "Controls and autonomy",
    detail: "Software for machines that make decisions in the real world.",
    note: "Labs / Ongoing",
  },
];

const records: readonly RecordItem[] = [
  {
    album: "Graduation",
    artist: "Kanye West",
    track: "I Wonder",
    year: "2007",
    image: "/music/graduation.jpg",
    href: "https://open.spotify.com/track/7rbECVPkY5UODxoOUVKZnA",
    shelf: "A",
  },
  {
    album: "Swimming",
    artist: "Mac Miller",
    track: "Small Worlds",
    year: "2018",
    image: "/music/swimming.jpg",
    href: "https://open.spotify.com/track/4gT3mNJA8lnlkYFqGZ8IA2",
    shelf: "A",
  },
  {
    album: "Isolation",
    artist: "Kali Uchis",
    track: "After the Storm",
    year: "2018",
    image: "/music/isolation.jpg",
    href: "https://open.spotify.com/track/1otG6j1WHNvl9WgXLWkHTo",
    shelf: "A",
  },
  {
    album: "The Slow Rush",
    artist: "Tame Impala",
    track: "Borderline",
    year: "2020",
    image: "/music/the-slow-rush.jpg",
    href: "https://open.spotify.com/track/5hM5arv9KDbCHS0k9uqwjr",
    shelf: "A",
  },
  {
    album: "So Much Fun",
    artist: "Young Thug",
    track: "Hot",
    year: "2019",
    image: "/music/so-much-fun.jpg",
    href: "https://open.spotify.com/track/5Z8HZM6iQMhhqyPcCGY5g9",
    shelf: "B",
  },
  {
    album: "Eternal Atake",
    artist: "Lil Uzi Vert",
    track: "Baby Pluto",
    year: "2020",
    image: "/music/eternal-atake.jpg",
    href: "https://open.spotify.com/track/7hav1MHURQf5SAoPk0egqh",
    shelf: "B",
  },
  {
    album: "Finally Rich",
    artist: "Chief Keef",
    track: "Love Sosa",
    year: "2012",
    image: "/music/finally-rich.jpg",
    href: "https://open.spotify.com/track/01Lr5YepbgjXAWR9iOEyH1",
    shelf: "B",
  },
  {
    album: "56 Nights",
    artist: "Future",
    track: "March Madness",
    year: "2015",
    image: "/music/56-nights.jpg",
    href: "https://open.spotify.com/track/3WcC6NH9J77xPEvj1SOL7z",
    shelf: "B",
  },
];

export function PortfolioExperience() {
  return (
    <>
      <a className="skip-link" href="#work">
        Skip to work
      </a>

      <header className="topbar">
        <a className="topbar-name" href="#top" aria-label="Back to top">
          Raghav Ratnani
        </a>
        <span className="topbar-role">Engineer / Photographer</span>
        <nav aria-label="Primary navigation">
          <a href="#work">Work</a>
          <a href="#photography">Photos</a>
          <a href="#music">Rotation</a>
        </nav>
      </header>

      <main id="top">
        <section className="hero" aria-labelledby="hero-title">
          <div className="hero-kicker">
            <span>Vol. 01</span>
            <span>New York / Boston</span>
            <span>2026</span>
          </div>

          <h1 id="hero-title">
            <span>Raghav</span>
            <span>Ratnani</span>
          </h1>

          <figure className="hero-image">
            <Image
              src="/photography/dscf3993.jpg"
              alt="Manhattan Bridge tower and cables seen from below at night"
              width={1466}
              height={2200}
              sizes="(max-width: 760px) 62vw, 34vw"
              priority
              unoptimized
            />
          </figure>

          <div className="hero-intro">
            <p>
              I make software, photograph cities, and keep a close eye on the
              details that make both feel alive.
            </p>
            <span>Currently at Cumulus Labs / YC W26</span>
          </div>

          <div className="hero-index" aria-label="Portfolio sections">
            <span>01 / Selected work</span>
            <span>02 / Night studies</span>
            <span>03 / In rotation</span>
          </div>

          <p className="hero-scroll">Scroll to enter ↓</p>
        </section>

        <section className="work-section" id="work" aria-labelledby="work-title">
          <div className="section-masthead">
            <p>01 / Selected work</p>
            <h2 id="work-title">
              Useful things,
              <br />
              made carefully.
            </h2>
            <p className="section-deck">
              Software, systems, and machines. The work should be sharp enough
              to disappear into the task.
            </p>
          </div>

          <div className="work-ledger">
            {work.map((item, index) => (
              <article className="work-row" key={item.name}>
                <span className="work-number">0{index + 1}</span>
                <p className="work-discipline">{item.discipline}</p>
                <h3>
                  {item.href ? (
                    <a href={item.href} target="_blank" rel="noreferrer">
                      {item.name} <span aria-hidden="true">↗</span>
                    </a>
                  ) : (
                    item.name
                  )}
                </h3>
                <p className="work-detail">{item.detail}</p>
                <p className="work-note">{item.note}</p>
              </article>
            ))}
          </div>
        </section>

        <section
          className="photography-section"
          id="photography"
          aria-labelledby="photography-title"
        >
          <div className="photo-masthead">
            <p>02 / Night studies</p>
            <h2 id="photography-title">The city after dark.</h2>
            <p>
              Bridges, reflected light, and the quiet parts of New York that
              hold still long enough to become a frame.
            </p>
          </div>

          <figure className="gallery-lead">
            <Image
              src="/photography/dscf4001-2.jpg"
              alt="Manhattan Bridge crossing a purple night sky above a park"
              width={2200}
              height={1467}
              sizes="100vw"
              loading="lazy"
              unoptimized
            />
            <figcaption>
              <span>001</span>
              <span>Manhattan Bridge / New York</span>
            </figcaption>
          </figure>

          <div className="photo-grid">
            <figure className="gallery-figure gallery-figure--portrait-a">
              <Image
                src="/photography/dscf4028.jpg"
                alt="Manhattan Bridge with the Lower Manhattan skyline beyond it"
                width={1466}
                height={2200}
                sizes="(max-width: 760px) 88vw, 34vw"
                loading="lazy"
                unoptimized
              />
              <figcaption>
                <span>002</span>
                <span>Through the bridge</span>
              </figcaption>
            </figure>

            <figure className="gallery-figure gallery-figure--wide-a">
              <Image
                src="/photography/dscf4005.jpg"
                alt="Brooklyn Bridge and Lower Manhattan illuminated at night"
                width={2200}
                height={1466}
                sizes="(max-width: 760px) 100vw, 52vw"
                loading="lazy"
                unoptimized
              />
              <figcaption>
                <span>003</span>
                <span>Lower Manhattan, across the river</span>
              </figcaption>
            </figure>

            <figure className="gallery-figure gallery-figure--wide-b">
              <Image
                src="/photography/dscf4023.jpg"
                alt="Brooklyn Bridge, skyline, and carousel reflected in the East River"
                width={2200}
                height={1466}
                sizes="(max-width: 760px) 100vw, 58vw"
                loading="lazy"
                unoptimized
              />
              <figcaption>
                <span>004</span>
                <span>Brooklyn Bridge in haze</span>
              </figcaption>
            </figure>

            <figure className="gallery-figure gallery-figure--portrait-b">
              <Image
                src="/photography/dscf3993.jpg"
                alt="Bridge tower rising above foliage in purple evening light"
                width={1466}
                height={2200}
                sizes="(max-width: 760px) 88vw, 30vw"
                loading="lazy"
                unoptimized
              />
              <figcaption>
                <span>005</span>
                <span>Understructure</span>
              </figcaption>
            </figure>
          </div>

          <figure className="gallery-close">
            <Image
              src="/photography/dscf4031-5.jpg"
              alt="Manhattan Bridge and city lights reflected across the East River"
              width={2200}
              height={1466}
              sizes="100vw"
              loading="lazy"
              unoptimized
            />
            <figcaption>
              <span>006</span>
              <span>East River / Last frame</span>
            </figcaption>
          </figure>
        </section>

        <section className="music-section" id="music" aria-labelledby="music-title">
          <div className="music-masthead">
            <div>
              <p>03 / In rotation</p>
              <h2 id="music-title">Records I keep coming back to.</h2>
            </div>
            <p>
              Eight pulls from two very different playlists. Part late-night
              drive, part loud room.
            </p>
          </div>

          <div className="music-layout">
            <figure className="music-photo">
              <Image
                src="/photography/dscf1650-2.jpg"
                alt="Red Ford Mustang parked at dusk"
                width={2200}
                height={1466}
                sizes="(max-width: 760px) 100vw, 32vw"
                loading="lazy"
                unoptimized
              />
              <figcaption>
                <span>Drive side A</span>
                <span>Somewhere near sunset</span>
              </figcaption>
            </figure>

            <div className="record-shelf">
              {records.map((record, index) => (
                <a
                  className="record"
                  href={record.href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={`${record.track} by ${record.artist} on Spotify`}
                  key={record.track}
                >
                  <div className="record-cover">
                    <Image
                      src={record.image}
                      alt={`${record.album} album cover`}
                      width={640}
                      height={640}
                      sizes="(max-width: 560px) 43vw, (max-width: 960px) 27vw, 16vw"
                      loading="lazy"
                      unoptimized
                    />
                    <span className="record-sequence">
                      {record.shelf}.{String(index + 1).padStart(2, "0")}
                    </span>
                  </div>
                  <span className="record-name">{record.album}</span>
                  <span className="record-meta">
                    {record.artist} / {record.year}
                  </span>
                </a>
              ))}
            </div>
          </div>

          <div className="playlist-notes">
            <span>Full playlists</span>
            <a
              href="https://open.spotify.com/playlist/0f605RPG95bwb4KN8o89wk"
              target="_blank"
              rel="noreferrer"
            >
              A / gibbs free energy ↗
            </a>
            <a
              href="https://open.spotify.com/playlist/2hz5neU8CYxkUbFh1cIrv8"
              target="_blank"
              rel="noreferrer"
            >
              B / nimbus labs ↗
            </a>
          </div>
        </section>
      </main>

      <footer className="footer">
        <p>Let&apos;s make something with a point of view.</p>
        <div>
          <a
            href="https://www.linkedin.com/in/raghav-ratnani"
            target="_blank"
            rel="noreferrer"
          >
            LinkedIn ↗
          </a>
          <a
            href="https://github.com/raghavrat"
            target="_blank"
            rel="noreferrer"
          >
            GitHub ↗
          </a>
        </div>
        <span>Raghav Ratnani / 2026</span>
      </footer>
    </>
  );
}
