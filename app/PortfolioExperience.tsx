import Image from "next/image";

type WorkItem = {
  name: string;
  discipline: string;
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
};

const work: readonly WorkItem[] = [
  {
    name: "Cumulus Labs",
    discipline: "Software engineer",
    note: "YC W26 / Current",
    href: "https://cumuluslabs.io",
  },
  {
    name: "DecaPal",
    discipline: "Founder and product",
    note: "Independent / 2025",
    href: "https://decapal.org",
  },
  {
    name: "Robotics",
    discipline: "Controls and autonomy",
    note: "Labs / Ongoing",
    href: "https://github.com/Stormgears-FRC-5422",
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
  },
  {
    album: "Swimming",
    artist: "Mac Miller",
    track: "Small Worlds",
    year: "2018",
    image: "/music/swimming.jpg",
    href: "https://open.spotify.com/track/4gT3mNJA8lnlkYFqGZ8IA2",
  },
  {
    album: "Isolation",
    artist: "Kali Uchis",
    track: "After the Storm",
    year: "2018",
    image: "/music/isolation.jpg",
    href: "https://open.spotify.com/track/1otG6j1WHNvl9WgXLWkHTo",
  },
  {
    album: "The Slow Rush",
    artist: "Tame Impala",
    track: "Borderline",
    year: "2020",
    image: "/music/the-slow-rush.jpg",
    href: "https://open.spotify.com/track/5hM5arv9KDbCHS0k9uqwjr",
  },
  {
    album: "So Much Fun",
    artist: "Young Thug",
    track: "Hot",
    year: "2019",
    image: "/music/so-much-fun.jpg",
    href: "https://open.spotify.com/track/5Z8HZM6iQMhhqyPcCGY5g9",
  },
  {
    album: "Eternal Atake",
    artist: "Lil Uzi Vert",
    track: "Baby Pluto",
    year: "2020",
    image: "/music/eternal-atake.jpg",
    href: "https://open.spotify.com/track/7hav1MHURQf5SAoPk0egqh",
  },
  {
    album: "Finally Rich",
    artist: "Chief Keef",
    track: "Love Sosa",
    year: "2012",
    image: "/music/finally-rich.jpg",
    href: "https://open.spotify.com/track/01Lr5YepbgjXAWR9iOEyH1",
  },
  {
    album: "56 Nights",
    artist: "Future",
    track: "March Madness",
    year: "2015",
    image: "/music/56-nights.jpg",
    href: "https://open.spotify.com/track/3WcC6NH9J77xPEvj1SOL7z",
  },
];

export function PortfolioExperience() {
  return (
    <>
      <a className="skip-link" href="#work">
        Skip to projects
      </a>

      <main id="top">
        <section className="hero" aria-labelledby="hero-title">
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
        </section>

        <section className="work-section" id="work" aria-label="Projects">
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
                <p className="work-note">{item.note}</p>
              </article>
            ))}
          </div>
        </section>

        <section
          className="photography-section"
          id="photography"
          aria-label="Photo collection"
        >
          <div className="photo-archive">
            <figure className="archive-frame archive-frame--lead">
              <Image
                src="/photography/dscf4001-2.jpg"
                alt="Manhattan Bridge crossing a purple night sky above a park"
                width={2200}
                height={1467}
                sizes="(max-width: 700px) 100vw, 66vw"
                loading="lazy"
                unoptimized
              />
              <figcaption>
                <span>001</span>
              </figcaption>
            </figure>

            <figure className="archive-frame archive-frame--portrait-a">
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
              </figcaption>
            </figure>

            <figure className="archive-frame archive-frame--wide-a">
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
              </figcaption>
            </figure>

            <figure className="archive-frame archive-frame--wide-b">
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
              </figcaption>
            </figure>

            <figure className="archive-frame archive-frame--portrait-b">
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
              </figcaption>
            </figure>

            <figure className="archive-frame archive-frame--closing">
              <Image
                src="/photography/dscf4031-5.jpg"
                alt="Manhattan Bridge and city lights reflected across the East River"
                width={2200}
                height={1466}
                sizes="(max-width: 700px) 100vw, 66vw"
                loading="lazy"
                unoptimized
              />
              <figcaption>
                <span>006</span>
              </figcaption>
            </figure>
          </div>
        </section>

        <section className="music-section" id="music" aria-label="Music">
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
            </figure>

            <div className="record-shelf">
              {records.map((record) => (
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
        <span>Raghav Ratnani</span>
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
      </footer>
    </>
  );
}
