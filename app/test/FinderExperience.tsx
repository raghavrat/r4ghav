"use client";

import Image from "next/image";
import {
  AppleLogo,
  ArrowSquareOut,
  ArrowsOutSimple,
  BatteryHigh,
  Briefcase,
  CaretLeft,
  CaretRight,
  FolderSimple,
  GithubLogo,
  Globe,
  GridFour,
  House,
  ImageSquare,
  LinkedinLogo,
  ListBullets,
  MagnifyingGlass,
  Minus,
  MusicNotes,
  Smiley,
  WifiHigh,
  X,
} from "@phosphor-icons/react";
import { useEffect, useMemo, useState } from "react";

type FolderKey = "home" | "work" | "photography" | "music";
type ViewMode = "icons" | "list";

type WorkItem = {
  name: string;
  discipline: string;
  status: string;
  href: string;
};

type PhotoItem = {
  name: string;
  src: string;
  alt: string;
  width: number;
  height: number;
};

type AlbumItem = {
  title: string;
  cover: string;
  href: string;
};

const work: readonly WorkItem[] = [
  {
    name: "Cumulus Labs",
    discipline: "Software engineering",
    status: "Current",
    href: "https://cumuluslabs.io",
  },
  {
    name: "DecaPal",
    discipline: "Founder and product",
    status: "2025",
    href: "https://decapal.org",
  },
  {
    name: "Robotics",
    discipline: "Controls and autonomy",
    status: "Ongoing",
    href: "https://github.com/Stormgears-FRC-5422",
  },
];

const photos: readonly PhotoItem[] = [
  {
    name: "DSCF4001-2.JPG",
    src: "/photography/dscf4001-2.jpg",
    alt: "Manhattan Bridge crossing a purple night sky above a park",
    width: 2200,
    height: 1467,
  },
  {
    name: "DSCF4028.JPG",
    src: "/photography/dscf4028.jpg",
    alt: "Manhattan Bridge with the Lower Manhattan skyline beyond it",
    width: 1466,
    height: 2200,
  },
  {
    name: "DSCF4005.JPG",
    src: "/photography/dscf4005.jpg",
    alt: "Brooklyn Bridge and Lower Manhattan illuminated at night",
    width: 2200,
    height: 1466,
  },
  {
    name: "DSCF3993.JPG",
    src: "/photography/dscf3993.jpg",
    alt: "Bridge tower rising above foliage in purple evening light",
    width: 1466,
    height: 2200,
  },
  {
    name: "DSCF4031-5.JPG",
    src: "/photography/dscf4031-5.jpg",
    alt: "Manhattan Bridge and city lights reflected across the East River",
    width: 2200,
    height: 1466,
  },
  {
    name: "DSCF4023.JPG",
    src: "/photography/dscf4023.jpg",
    alt: "Brooklyn Bridge, skyline, and carousel reflected in the East River",
    width: 2200,
    height: 1466,
  },
  {
    name: "DSCF1650-2.JPG",
    src: "/photography/dscf1650-2.jpg",
    alt: "Red Ford Mustang parked at dusk",
    width: 2200,
    height: 1466,
  },
];

const albums: readonly AlbumItem[] = [
  {
    title: "Graduation",
    cover: "/music/graduation.jpg",
    href: "https://open.spotify.com/album/4SZko61aMnmgvNhfhgTuD3",
  },
  {
    title: "Swimming",
    cover: "/music/swimming.jpg",
    href: "https://open.spotify.com/album/5wtE5aLX5r7jOosmPhJhhk",
  },
  {
    title: "Isolation",
    cover: "/music/isolation.jpg",
    href: "https://open.spotify.com/album/4EPQtdq6vvwxuYeQTrwDVY",
  },
  {
    title: "The Slow Rush",
    cover: "/music/the-slow-rush.jpg",
    href: "https://open.spotify.com/album/31qVWUdRrlb8thMvts0yYL",
  },
  {
    title: "So Much Fun",
    cover: "/music/so-much-fun.jpg",
    href: "https://open.spotify.com/album/1bnHPO4dKK7IjvgrtVBcQh",
  },
  {
    title: "Eternal Atake",
    cover: "/music/eternal-atake.jpg",
    href: "https://open.spotify.com/album/7IyoGB8J31fvQDwGtHAq9m",
  },
  {
    title: "Finally Rich",
    cover: "/music/finally-rich.jpg",
    href: "https://open.spotify.com/album/2B4y3j02ho6XNF8BEzx3JF",
  },
  {
    title: "DS2 (Deluxe)",
    cover: "/music/ds2-deluxe.jpg",
    href: "https://open.spotify.com/album/0fUy6IdLHDpGNwavIlhEsl",
  },
];

const folderNames: Record<FolderKey, string> = {
  home: "Raghav",
  work: "Work",
  photography: "Photography",
  music: "Music",
};

const folders: readonly { key: Exclude<FolderKey, "home">; name: string }[] = [
  { key: "work", name: "Work" },
  { key: "photography", name: "Photography" },
  { key: "music", name: "Music" },
];

function FolderGlyph({ size = 82 }: { size?: number }) {
  return <FolderSimple className="folder-icon" size={size} weight="fill" />;
}

export function FinderExperience() {
  const [history, setHistory] = useState<FolderKey[]>(["home"]);
  const [historyIndex, setHistoryIndex] = useState(0);
  const [windowOpen, setWindowOpen] = useState(true);
  const [maximized, setMaximized] = useState(false);
  const [viewMode, setViewMode] = useState<ViewMode>("icons");
  const [query, setQuery] = useState("");
  const [preview, setPreview] = useState<PhotoItem | null>(null);

  const activeFolder = history[historyIndex];
  const normalizedQuery = query.trim().toLowerCase();

  const visibleWork = useMemo(
    () =>
      work.filter((item) =>
        `${item.name} ${item.discipline}`.toLowerCase().includes(normalizedQuery),
      ),
    [normalizedQuery],
  );

  const visibleFolders = useMemo(
    () =>
      folders.filter((folder) => folder.name.toLowerCase().includes(normalizedQuery)),
    [normalizedQuery],
  );

  const visiblePhotos = useMemo(
    () =>
      photos.filter((photo) => photo.name.toLowerCase().includes(normalizedQuery)),
    [normalizedQuery],
  );

  const visibleAlbums = useMemo(
    () =>
      albums.filter((album) => album.title.toLowerCase().includes(normalizedQuery)),
    [normalizedQuery],
  );

  useEffect(() => {
    if (!preview) return;

    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setPreview(null);
    };

    window.addEventListener("keydown", closeOnEscape);
    return () => window.removeEventListener("keydown", closeOnEscape);
  }, [preview]);

  const navigate = (folder: FolderKey) => {
    const nextHistory = [...history.slice(0, historyIndex + 1), folder];
    setHistory(nextHistory);
    setHistoryIndex(nextHistory.length - 1);
    setQuery("");
    setViewMode(folder === "work" ? "list" : "icons");
    setWindowOpen(true);
  };

  const goBack = () => {
    if (historyIndex === 0) return;
    setHistoryIndex((index) => index - 1);
    setQuery("");
  };

  const goForward = () => {
    if (historyIndex >= history.length - 1) return;
    setHistoryIndex((index) => index + 1);
    setQuery("");
  };

  const itemCount =
    activeFolder === "home"
      ? visibleFolders.length
      : activeFolder === "work"
        ? visibleWork.length
        : activeFolder === "photography"
          ? visiblePhotos.length
          : visibleAlbums.length;

  return (
    <main className="finder-desktop">
      <Image
        className="desktop-wallpaper"
        src="/photography/dscf4001-2.jpg"
        alt=""
        fill
        sizes="100vw"
        priority
        unoptimized
      />

      <header className="menu-bar" aria-label="Desktop menu">
        <div className="menu-group">
          <AppleLogo size={16} weight="fill" aria-hidden="true" />
          <strong>Finder</strong>
          <span>File</span>
          <span>Edit</span>
          <span>View</span>
          <span>Go</span>
          <span>Window</span>
          <span>Help</span>
        </div>
        <div className="menu-status">
          <WifiHigh size={17} weight="bold" aria-hidden="true" />
          <BatteryHigh size={21} weight="fill" aria-hidden="true" />
          <span>Raghav Ratnani</span>
        </div>
      </header>

      <section className="desktop-area" aria-label="Raghav's desktop">
        <div className="desktop-icons" aria-label="Desktop folders">
          {folders.map((folder) => (
            <button
              className="desktop-folder"
              type="button"
              onClick={() => navigate(folder.key)}
              key={folder.key}
            >
              <FolderGlyph size={58} />
              <span>{folder.name}</span>
            </button>
          ))}
        </div>

        {windowOpen ? (
          <section
            className={`finder-window${maximized ? " is-maximized" : ""}`}
            aria-label={`${folderNames[activeFolder]} Finder window`}
          >
            <header className="window-toolbar">
              <div className="traffic-lights">
                <button
                  className="traffic-light traffic-light--close"
                  type="button"
                  aria-label="Close Finder window"
                  onClick={() => setWindowOpen(false)}
                >
                  <X size={8} weight="bold" aria-hidden="true" />
                </button>
                <button
                  className="traffic-light traffic-light--minimize"
                  type="button"
                  aria-label="Minimize Finder window"
                  onClick={() => setWindowOpen(false)}
                >
                  <Minus size={8} weight="bold" aria-hidden="true" />
                </button>
                <button
                  className="traffic-light traffic-light--maximize"
                  type="button"
                  aria-label={maximized ? "Restore Finder window" : "Maximize Finder window"}
                  onClick={() => setMaximized((value) => !value)}
                >
                  <ArrowsOutSimple size={8} weight="bold" aria-hidden="true" />
                </button>
              </div>

              <div className="toolbar-actions">
                <div className="history-controls">
                  <button
                    className="toolbar-button"
                    type="button"
                    aria-label="Back"
                    disabled={historyIndex === 0}
                    onClick={goBack}
                  >
                    <CaretLeft size={18} weight="bold" aria-hidden="true" />
                  </button>
                  <button
                    className="toolbar-button"
                    type="button"
                    aria-label="Forward"
                    disabled={historyIndex >= history.length - 1}
                    onClick={goForward}
                  >
                    <CaretRight size={18} weight="bold" aria-hidden="true" />
                  </button>
                </div>

                <h1 className="window-title">{folderNames[activeFolder]}</h1>

                <div className="view-controls">
                  <button
                    className={`toolbar-button${viewMode === "icons" ? " is-active" : ""}`}
                    type="button"
                    aria-label="Icon view"
                    aria-pressed={viewMode === "icons"}
                    onClick={() => setViewMode("icons")}
                  >
                    <GridFour size={17} weight="fill" aria-hidden="true" />
                  </button>
                  <button
                    className={`toolbar-button${viewMode === "list" ? " is-active" : ""}`}
                    type="button"
                    aria-label="List view"
                    aria-pressed={viewMode === "list"}
                    onClick={() => setViewMode("list")}
                  >
                    <ListBullets size={18} weight="bold" aria-hidden="true" />
                  </button>
                  <label className="search-box">
                    <MagnifyingGlass size={15} aria-hidden="true" />
                    <input
                      type="search"
                      value={query}
                      onChange={(event) => setQuery(event.target.value)}
                      placeholder={`Search ${folderNames[activeFolder]}`}
                      aria-label={`Search ${folderNames[activeFolder]}`}
                    />
                  </label>
                </div>
              </div>
            </header>

            <aside className="finder-sidebar" aria-label="Finder sidebar">
              <p className="sidebar-label">Favorites</p>
              <button
                className={`sidebar-button${activeFolder === "home" ? " is-active" : ""}`}
                type="button"
                onClick={() => navigate("home")}
              >
                <House size={17} weight="fill" aria-hidden="true" />
                Raghav
              </button>
              <button
                className={`sidebar-button${activeFolder === "work" ? " is-active" : ""}`}
                type="button"
                onClick={() => navigate("work")}
              >
                <Briefcase size={17} weight="fill" aria-hidden="true" />
                Work
              </button>
              <button
                className={`sidebar-button${activeFolder === "photography" ? " is-active" : ""}`}
                type="button"
                onClick={() => navigate("photography")}
              >
                <ImageSquare size={17} weight="fill" aria-hidden="true" />
                Photography
              </button>
              <button
                className={`sidebar-button${activeFolder === "music" ? " is-active" : ""}`}
                type="button"
                onClick={() => navigate("music")}
              >
                <MusicNotes size={17} weight="fill" aria-hidden="true" />
                Music
              </button>
            </aside>

            <div className="finder-content">
              <div className="content-inner">
                {activeFolder === "home" && (
                  <HomeFolder items={visibleFolders} viewMode={viewMode} navigate={navigate} />
                )}
                {activeFolder === "work" && (
                  <WorkFolder items={visibleWork} viewMode={viewMode} />
                )}
                {activeFolder === "photography" && (
                  <PhotographyFolder
                    items={visiblePhotos}
                    viewMode={viewMode}
                    openPreview={setPreview}
                  />
                )}
                {activeFolder === "music" && (
                  <MusicFolder items={visibleAlbums} viewMode={viewMode} />
                )}
              </div>
            </div>

            <footer className="finder-status">
              {itemCount} {itemCount === 1 ? "item" : "items"}
            </footer>
          </section>
        ) : null}
      </section>

      <div className="dock-zone">
        <nav className="dock" aria-label="Desktop dock">
          <button
            className={`dock-button${windowOpen ? " is-open" : ""}`}
            type="button"
            aria-label="Open Finder"
            onClick={() => setWindowOpen(true)}
          >
            <Smiley size={31} weight="fill" aria-hidden="true" />
          </button>
          <button
            className="dock-button"
            type="button"
            aria-label="Open Photography"
            onClick={() => navigate("photography")}
          >
            <ImageSquare size={30} weight="fill" aria-hidden="true" />
          </button>
          <button
            className="dock-button"
            type="button"
            aria-label="Open Music"
            onClick={() => navigate("music")}
          >
            <MusicNotes size={30} weight="fill" aria-hidden="true" />
          </button>
          <a
            className="dock-button"
            href="https://r4ghav.xyz"
            aria-label="Open the original portfolio"
          >
            <Globe size={29} weight="fill" aria-hidden="true" />
          </a>
          <a
            className="dock-button"
            href="https://github.com/raghavrat"
            target="_blank"
            rel="noreferrer"
            aria-label="Open Raghav's GitHub"
          >
            <GithubLogo size={29} weight="fill" aria-hidden="true" />
          </a>
          <a
            className="dock-button"
            href="https://www.linkedin.com/in/raghav-ratnani"
            target="_blank"
            rel="noreferrer"
            aria-label="Open Raghav's LinkedIn"
          >
            <LinkedinLogo size={29} weight="fill" aria-hidden="true" />
          </a>
        </nav>
      </div>

      {preview ? (
        <div className="quick-look" role="dialog" aria-modal="true" aria-label={preview.name}>
          <div className="quick-look-panel">
            <button
              className="quick-look-close"
              type="button"
              aria-label="Close photo preview"
              onClick={() => setPreview(null)}
              autoFocus
            >
              <X size={15} weight="bold" aria-hidden="true" />
            </button>
            <Image
              src={preview.src}
              alt={preview.alt}
              width={preview.width}
              height={preview.height}
              sizes="88vw"
              unoptimized
            />
          </div>
        </div>
      ) : null}
    </main>
  );
}

function HomeFolder({
  items,
  viewMode,
  navigate,
}: {
  items: readonly { key: Exclude<FolderKey, "home">; name: string }[];
  viewMode: ViewMode;
  navigate: (folder: FolderKey) => void;
}) {
  if (items.length === 0) return <EmptyState />;

  if (viewMode === "list") {
    return (
      <table className="list-view">
        <thead>
          <tr>
            <th>Name</th>
            <th>Kind</th>
            <th>Date Modified</th>
          </tr>
        </thead>
        <tbody>
          {items.map((folder) => (
            <tr key={folder.key}>
              <td>
                <div className="list-name">
                  <FolderSimple size={18} weight="fill" className="folder-icon" />
                  <button type="button" onClick={() => navigate(folder.key)}>
                    {folder.name}
                  </button>
                </div>
              </td>
              <td className="list-kind">Folder</td>
              <td className="list-date">Today</td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  }

  return (
    <div className="icon-grid">
      {items.map((folder) => (
        <button
          className="finder-item"
          type="button"
          onClick={() => navigate(folder.key)}
          key={folder.key}
        >
          <span className="item-icon">
            <FolderGlyph />
          </span>
          <span className="finder-item-name">{folder.name}</span>
        </button>
      ))}
    </div>
  );
}

function WorkFolder({ items, viewMode }: { items: readonly WorkItem[]; viewMode: ViewMode }) {
  if (items.length === 0) return <EmptyState />;

  if (viewMode === "icons") {
    return (
      <div className="icon-grid">
        {items.map((item) => (
          <a
            className="finder-item"
            href={item.href}
            target="_blank"
            rel="noreferrer"
            key={item.name}
          >
            <span className="item-icon">
              <Briefcase size={72} weight="fill" color="#667c73" />
            </span>
            <span className="finder-item-name">{item.name}</span>
          </a>
        ))}
      </div>
    );
  }

  return (
    <table className="list-view">
      <thead>
        <tr>
          <th>Name</th>
          <th>Kind</th>
          <th>Status</th>
        </tr>
      </thead>
      <tbody>
        {items.map((item) => (
          <tr key={item.name}>
            <td>
              <div className="list-name">
                <Briefcase size={17} weight="fill" color="#667c73" />
                <a href={item.href} target="_blank" rel="noreferrer">
                  {item.name}
                </a>
                <ArrowSquareOut size={13} aria-hidden="true" />
              </div>
            </td>
            <td className="list-kind">{item.discipline}</td>
            <td className="list-date">{item.status}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

function PhotographyFolder({
  items,
  viewMode,
  openPreview,
}: {
  items: readonly PhotoItem[];
  viewMode: ViewMode;
  openPreview: (photo: PhotoItem) => void;
}) {
  if (items.length === 0) return <EmptyState />;

  if (viewMode === "list") {
    return (
      <table className="list-view">
        <thead>
          <tr>
            <th>Name</th>
            <th>Kind</th>
            <th>Size</th>
          </tr>
        </thead>
        <tbody>
          {items.map((photo) => (
            <tr key={photo.name}>
              <td>
                <div className="list-name">
                  <ImageSquare size={17} weight="fill" color="#ad675d" />
                  <button type="button" onClick={() => openPreview(photo)}>
                    {photo.name}
                  </button>
                </div>
              </td>
              <td className="list-kind">JPEG image</td>
              <td className="list-date">{photo.width} x {photo.height}</td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  }

  return (
    <div className="icon-grid">
      {items.map((photo) => (
        <button
          className="finder-item"
          type="button"
          onClick={() => openPreview(photo)}
          key={photo.name}
        >
          <span className="photo-thumb">
            <Image
              src={photo.src}
              alt={photo.alt}
              fill
              sizes="112px"
              unoptimized
            />
          </span>
          <span className="finder-item-name">{photo.name}</span>
        </button>
      ))}
    </div>
  );
}

function MusicFolder({ items, viewMode }: { items: readonly AlbumItem[]; viewMode: ViewMode }) {
  if (items.length === 0) return <EmptyState />;

  if (viewMode === "list") {
    return (
      <table className="list-view">
        <thead>
          <tr>
            <th>Name</th>
            <th>Kind</th>
            <th>Open With</th>
          </tr>
        </thead>
        <tbody>
          {items.map((album) => (
            <tr key={album.title}>
              <td>
                <div className="list-name">
                  <MusicNotes size={17} weight="fill" color="#b75757" />
                  <a href={album.href} target="_blank" rel="noreferrer">
                    {album.title}
                  </a>
                </div>
              </td>
              <td className="list-kind">Album</td>
              <td className="list-date">Spotify</td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  }

  return (
    <div className="icon-grid">
      {items.map((album) => (
        <a
          className="finder-item"
          href={album.href}
          target="_blank"
          rel="noreferrer"
          aria-label={`${album.title} on Spotify`}
          key={album.title}
        >
          <span className="album-thumb">
            <Image
              src={album.cover}
              alt={`${album.title} album cover`}
              fill
              sizes="112px"
              unoptimized
            />
          </span>
          <span className="finder-item-name">{album.title}</span>
        </a>
      ))}
    </div>
  );
}

function EmptyState() {
  return (
    <div className="empty-state">
      <div>
        <MagnifyingGlass size={32} weight="light" aria-hidden="true" />
        <p>No matching items</p>
      </div>
    </div>
  );
}
