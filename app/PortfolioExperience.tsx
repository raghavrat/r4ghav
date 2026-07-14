import Image from "next/image";

type WorkItem = {
  name: string;
  role: string;
  description: string;
  href?: string;
};

const work: readonly WorkItem[] = [
  {
    name: "Cumulus Labs",
    role: "Software engineer / YC W26",
    description:
      "Building infrastructure that makes production AI faster and easier to operate.",
    href: "https://cumuluslabs.io",
  },
  {
    name: "DecaPal",
    role: "Founder and builder",
    description:
      "A practice partner for competitive roleplay, built with Gemini and Firebase.",
  },
  {
    name: "Robotics",
    role: "Autonomous systems",
    description:
      "Motion, controls, and software for robots that need to perform under pressure.",
  },
];

const photographs = [
  {
    src: "/photography/dscf4001-2.jpg",
    alt: "Manhattan Bridge crossing a purple night sky above a park",
    caption: "Manhattan Bridge, after dark",
    className: "photograph photograph--opening",
  },
  {
    src: "/photography/dscf3993.jpg",
    alt: "Manhattan Bridge tower and cables seen from below at night",
    caption: "Bridge study, Brooklyn",
    className: "photograph photograph--portrait-left",
  },
  {
    src: "/photography/dscf4028.jpg",
    alt: "Manhattan Bridge with the Lower Manhattan skyline beyond it",
    caption: "Through the bridge",
    className: "photograph photograph--portrait-right",
  },
  {
    src: "/photography/dscf4005.jpg",
    alt: "Brooklyn Bridge and Lower Manhattan illuminated at night",
    caption: "Lower Manhattan, across the river",
    className: "photograph photograph--center-wide",
  },
  {
    src: "/photography/dscf1650-2.jpg",
    alt: "Red Ford Mustang parked at dusk",
    caption: "Red Mustang at dusk",
    className: "photograph photograph--car",
  },
  {
    src: "/photography/dscf4023.jpg",
    alt: "Brooklyn Bridge, skyline, and carousel reflected in the East River",
    caption: "Brooklyn Bridge in haze",
    className: "photograph photograph--river-left",
  },
  {
    src: "/photography/dscf4031-5.jpg",
    alt: "Manhattan Bridge and city lights reflected across the East River",
    caption: "East River, night",
    className: "photograph photograph--river-right",
  },
] as const;

const playlists = [
  {
    title: "gibbs free energy",
    image: "/music/gibbs-free-energy.jpg",
    href: "https://open.spotify.com/playlist/0f605RPG95bwb4KN8o89wk",
    note: "Playlist one",
  },
  {
    title: "nimbus labs",
    image: "/music/nimbus-labs.jpg",
    href: "https://open.spotify.com/playlist/2hz5neU8CYxkUbFh1cIrv8",
    note: "Playlist two",
  },
] as const;

export function PortfolioExperience() {
  return (
    <main className="site-shell">
      <a className="skip-link" href="#work">
        Skip to work
      </a>

      <header className="site-header">
        <a className="wordmark" href="#top" aria-label="Raghav Ratnani home">
          RR
        </a>
        <nav aria-label="Primary navigation">
          <a href="#work">Work</a>
          <a href="#photography">Photography</a>
          <a href="#music">Music</a>
          <a
            href="https://www.linkedin.com/in/raghav-ratnani"
            target="_blank"
            rel="noreferrer"
          >
            LinkedIn <span aria-hidden="true">↗</span>
          </a>
        </nav>
      </header>

      <section className="hero" id="top" aria-labelledby="hero-title">
        <div className="hero-copy">
          <p className="hero-role">Engineer / photographer / listener</p>
          <h1 id="hero-title">
            Raghav
            <br />
            Ratnani
          </h1>
          <p className="hero-summary">
            Building software at Cumulus Labs, photographing cities after dark,
            and keeping good music close.
          </p>
        </div>
        <figure className="hero-image">
          <Image
            src="/photography/dscf4001-2.jpg"
            alt="Manhattan Bridge crossing a purple night sky above a park"
            width={2200}
            height={1467}
            sizes="(max-width: 820px) 100vw, 74vw"
            priority
            unoptimized
          />
        </figure>
      </section>

      <section className="work-section page-section" id="work">
        <div className="section-heading">
          <h2>Work</h2>
          <p>
            I build software that gets out of the way and lets the useful part
            feel obvious.
          </p>
        </div>

        <div className="work-list">
          {work.map((item) => (
            <article className="work-item" key={item.name}>
              <div>
                <h3>
                  {item.href ? (
                    <a href={item.href} target="_blank" rel="noreferrer">
                      {item.name} <span aria-hidden="true">↗</span>
                    </a>
                  ) : (
                    item.name
                  )}
                </h3>
                <p className="work-role">{item.role}</p>
              </div>
              <p>{item.description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="photography-section page-section" id="photography">
        <div className="section-heading section-heading--photos">
          <h2>Photography</h2>
          <p>
            Night walks, bridge geometry, reflections, and whatever makes me
            stop for a second look.
          </p>
        </div>

        <div className="photography-grid">
          {photographs.map((photo, index) => (
            <figure className={photo.className} key={photo.src}>
              <Image
                src={photo.src}
                alt={photo.alt}
                width={index === 1 || index === 2 ? 1467 : 2200}
                height={index === 1 || index === 2 ? 2200 : 1467}
                sizes="(max-width: 820px) 100vw, 74vw"
                loading="lazy"
                unoptimized
              />
              <figcaption>{photo.caption}</figcaption>
            </figure>
          ))}
        </div>
      </section>

      <section className="music-section page-section" id="music">
        <div className="section-heading section-heading--music">
          <h2>In rotation</h2>
          <p>Two playlists, updated whenever the room needs a different mood.</p>
        </div>

        <div className="playlist-grid">
          {playlists.map((playlist) => (
            <a
              className="playlist"
              href={playlist.href}
              target="_blank"
              rel="noreferrer"
              key={playlist.title}
              aria-label={`Play ${playlist.title} on Spotify`}
            >
              <Image
                src={playlist.image}
                alt=""
                width={600}
                height={600}
                sizes="(max-width: 820px) calc(100vw - 32px), 40vw"
                loading="lazy"
                unoptimized
              />
              <span className="playlist-meta">
                <span>
                  <small>{playlist.note}</small>
                  <strong>{playlist.title}</strong>
                </span>
                <span className="playlist-arrow" aria-hidden="true">
                  ↗
                </span>
              </span>
            </a>
          ))}
        </div>
      </section>

      <footer className="site-footer">
        <p>Raghav Ratnani</p>
        <div>
          <a
            href="https://github.com/raghavrat"
            target="_blank"
            rel="noreferrer"
          >
            GitHub <span aria-hidden="true">↗</span>
          </a>
          <a
            href="https://www.linkedin.com/in/raghav-ratnani"
            target="_blank"
            rel="noreferrer"
          >
            LinkedIn <span aria-hidden="true">↗</span>
          </a>
        </div>
      </footer>
    </main>
  );
}
