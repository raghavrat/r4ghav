import Image from "next/image";
import { SectionIndex } from "./SectionIndex";

type WorkItem = {
  name: string;
  role: string;
  description: string;
  href?: string;
};

const work: readonly WorkItem[] = [
  {
    name: "Cumulus Labs",
    role: "Current / YC W26",
    description: "AI infrastructure built for production speed and control.",
    href: "https://cumuluslabs.io",
  },
  {
    name: "DecaPal",
    role: "Founder and builder",
    description: "A practice partner for competitive roleplay.",
  },
  {
    name: "Robotics",
    role: "Autonomous systems",
    description: "Motion, controls, and software under pressure.",
  },
];

const photographs = [
  {
    src: "/photography/dscf4001-2.jpg",
    alt: "Manhattan Bridge crossing a purple night sky above a park",
    caption: "Manhattan Bridge, after dark",
    className: "photo-frame photo-frame--wide",
  },
  {
    src: "/photography/dscf4028.jpg",
    alt: "Manhattan Bridge with the Lower Manhattan skyline beyond it",
    caption: "Through the bridge",
    className: "photo-frame photo-frame--portrait",
  },
  {
    src: "/photography/dscf1650-2.jpg",
    alt: "Red Ford Mustang parked at dusk",
    caption: "Red Mustang at dusk",
    className: "photo-frame photo-frame--car",
  },
  {
    src: "/photography/dscf4023.jpg",
    alt: "Brooklyn Bridge, skyline, and carousel reflected in the East River",
    caption: "Brooklyn Bridge in haze",
    className: "photo-frame photo-frame--river",
  },
  {
    src: "/photography/dscf4031-5.jpg",
    alt: "Manhattan Bridge and city lights reflected across the East River",
    caption: "East River, night",
    className: "photo-frame photo-frame--closing",
  },
] as const;

const playlists = [
  {
    title: "gibbs free energy",
    image: "/music/gibbs-free-energy.jpg",
    href: "https://open.spotify.com/playlist/0f605RPG95bwb4KN8o89wk",
  },
  {
    title: "nimbus labs",
    image: "/music/nimbus-labs.jpg",
    href: "https://open.spotify.com/playlist/2hz5neU8CYxkUbFh1cIrv8",
  },
] as const;

export function PortfolioExperience() {
  return (
    <>
      <a className="skip-link" href="#work">
        Skip to work
      </a>
      <SectionIndex />

      <main className="site-shell">
        <section
          className="cover-spread"
          id="cover"
          data-spread
          data-spread-name="Cover"
          data-spread-number="00"
          aria-labelledby="cover-title"
        >
          <div className="cover-block cover-block--identity">
            <span className="issue-mark">No. 01 / 2026</span>
            <h1 id="cover-title">RR</h1>
          </div>
          <div className="cover-block cover-block--clay" aria-hidden="true" />
          <div className="cover-block cover-block--portrait">
            <Image
              src="/photography/dscf3993.jpg"
              alt="Manhattan Bridge tower and cables seen from below at night"
              width={1466}
              height={2200}
              sizes="(max-width: 760px) 78vw, 38vw"
              priority
              unoptimized
            />
          </div>
          <div className="cover-block cover-block--name">
            <p>Raghav Ratnani</p>
            <span>Engineer / photographer</span>
          </div>
          <div className="cover-block cover-block--details">
            <p>Cumulus Labs / YC W26</p>
            <nav aria-label="Profile links">
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
            </nav>
          </div>
        </section>

        <section
          className="work-spread"
          id="work"
          data-spread
          data-spread-name="Work"
          data-spread-number="01"
          aria-labelledby="work-title"
        >
          <div className="work-heading">
            <p>Software / systems / machines</p>
            <h2 id="work-title">
              I build
              <br />
              things.
            </h2>
          </div>

          <div className="work-intro">
            <p>
              Software engineer at Cumulus Labs. I like hard systems, clean
              interfaces, and projects with a point of view.
            </p>
            <em>The useful part should feel obvious.</em>
          </div>

          <div className="work-roster">
            {work.map((item) => (
              <article key={item.name}>
                <span>{item.role}</span>
                <h3>
                  {item.href ? (
                    <a href={item.href} target="_blank" rel="noreferrer">
                      {item.name} ↗
                    </a>
                  ) : (
                    item.name
                  )}
                </h3>
                <p>{item.description}</p>
              </article>
            ))}
          </div>
        </section>

        <section
          className="photography-spread"
          id="photography"
          data-spread
          data-spread-name="Photography"
          data-spread-number="02"
          aria-labelledby="photography-title"
        >
          <div className="photo-lead">
            <div className="photo-lead-copy">
              <p>New York / night studies</p>
              <h2 id="photography-title">
                After
                <br />
                dark.
              </h2>
              <span>
                Bridges, reflections, and whatever makes me stop for a second
                look.
              </span>
            </div>
            <figure>
              <Image
                src="/photography/dscf4005.jpg"
                alt="Brooklyn Bridge and Lower Manhattan illuminated at night"
                width={2200}
                height={1466}
                sizes="(max-width: 760px) 100vw, 65vw"
                loading="lazy"
                unoptimized
              />
              <figcaption>Lower Manhattan, across the river</figcaption>
            </figure>
          </div>

          <div className="photo-contact-sheet">
            {photographs.map((photo, index) => (
              <figure className={photo.className} key={photo.src}>
                <Image
                  src={photo.src}
                  alt={photo.alt}
                  width={index === 1 ? 1466 : 2200}
                  height={index === 1 ? 2200 : 1467}
                  sizes="(max-width: 760px) 100vw, 62vw"
                  loading="lazy"
                  unoptimized
                />
                <figcaption>{photo.caption}</figcaption>
              </figure>
            ))}
          </div>
        </section>

        <section
          className="listening-spread"
          id="music"
          data-spread
          data-spread-name="Listening"
          data-spread-number="03"
          aria-labelledby="music-title"
        >
          <div className="listening-copy">
            <p>Two playlists / permanent rotation</p>
            <h2 id="music-title">
              In
              <br />
              rotation.
            </h2>
          </div>

          <figure className="listening-photo">
            <Image
              src="/photography/dscf1650-2.jpg"
              alt="Red Ford Mustang parked at dusk"
              width={2200}
              height={1466}
              sizes="(max-width: 760px) 100vw, 42vw"
              loading="lazy"
              unoptimized
            />
          </figure>

          <div className="playlist-shelf">
            {playlists.map((playlist) => (
              <a
                href={playlist.href}
                target="_blank"
                rel="noreferrer"
                className="playlist"
                aria-label={`Play ${playlist.title} on Spotify`}
                key={playlist.title}
              >
                <Image
                  src={playlist.image}
                  alt=""
                  width={600}
                  height={600}
                  sizes="(max-width: 760px) 44vw, 22vw"
                  loading="lazy"
                  unoptimized
                />
                <span>
                  <small>Spotify playlist</small>
                  <strong>{playlist.title}</strong>
                </span>
              </a>
            ))}
          </div>

          <footer className="site-footer">
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
            <p>Raghav Ratnani</p>
          </footer>
        </section>
      </main>
    </>
  );
}
