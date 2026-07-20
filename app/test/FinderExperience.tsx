"use client";

import Image from "next/image";
import {
  Airplay,
  AppleLogo,
  ArrowSquareOut,
  ArrowsOutSimple,
  BatteryHigh,
  Briefcase,
  CaretDown,
  CaretLeft,
  CaretRight,
  Columns,
  DotsThree,
  DownloadSimple,
  GithubLogo,
  Globe,
  GridFour,
  HardDrives,
  House,
  ImageSquare,
  LinkedinLogo,
  ListBullets,
  MagnifyingGlass,
  MagnifyingGlassMinus,
  MagnifyingGlassPlus,
  Minus,
  MusicNotes,
  ShareNetwork,
  SidebarSimple,
  SlidersHorizontal,
  Smiley,
  SpeakerHigh,
  TagSimple,
  Trash,
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

function FolderGlyph({ compact = false }: { compact?: boolean }) {
  return (
    <span className={`mac-folder${compact ? " mac-folder--compact" : ""}`} aria-hidden="true">
      <span className="mac-folder-tab" />
      <span className="mac-folder-back" />
      <span className="mac-folder-front" />
    </span>
  );
}

function formatClock(date: Date) {
  const weekday = date.toLocaleDateString("en-US", { weekday: "short" });
  const month = date.toLocaleDateString("en-US", { month: "short" });
  const day = date.getDate();
  const time = date.toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit" });
  return `${weekday} ${month} ${day} ${time}`;
}

export function FinderExperience() {
  const [history, setHistory] = useState<FolderKey[]>(["home"]);
  const [historyIndex, setHistoryIndex] = useState(0);
  const [windowOpen, setWindowOpen] = useState(true);
  const [maximized, setMaximized] = useState(false);
  const [viewMode, setViewMode] = useState<ViewMode>("icons");
  const [query, setQuery] = useState("");
  const [preview, setPreview] = useState<PhotoItem | null>(null);
  const [previewZoom, setPreviewZoom] = useState(1);
  const [previewMaximized, setPreviewMaximized] = useState(false);
  const [clock, setClock] = useState("Mon Jul 20 9:41 PM");

  const activeFolder = history[historyIndex];
  const normalizedQuery = query.trim().toLowerCase();

  const visibleWork = useMemo(
    () => work.filter((item) => `${item.name} ${item.discipline}`.toLowerCase().includes(normalizedQuery)),
    [normalizedQuery],
  );
  const visibleFolders = useMemo(
    () => folders.filter((folder) => folder.name.toLowerCase().includes(normalizedQuery)),
    [normalizedQuery],
  );
  const visiblePhotos = useMemo(
    () => photos.filter((photo) => photo.name.toLowerCase().includes(normalizedQuery)),
    [normalizedQuery],
  );
  const visibleAlbums = useMemo(
    () => albums.filter((album) => album.title.toLowerCase().includes(normalizedQuery)),
    [normalizedQuery],
  );

  useEffect(() => {
    const updateClock = () => setClock(formatClock(new Date()));
    updateClock();
    const interval = window.setInterval(updateClock, 30_000);
    return () => window.clearInterval(interval);
  }, []);

  const navigate = (folder: FolderKey) => {
    const nextHistory = [...history.slice(0, historyIndex + 1), folder];
    setHistory(nextHistory);
    setHistoryIndex(nextHistory.length - 1);
    setQuery("");
    setViewMode("icons");
    setWindowOpen(true);
    setMaximized(false);
  };

  const goBack = () => {
    if (historyIndex === 0) return;
    setHistoryIndex((index) => index - 1);
    setQuery("");
    setViewMode("icons");
    setMaximized(false);
  };

  const goForward = () => {
    if (historyIndex >= history.length - 1) return;
    setHistoryIndex((index) => index + 1);
    setQuery("");
  };

  const openPreview = (photo: PhotoItem) => {
    setPreview(photo);
    setPreviewZoom(1);
    setPreviewMaximized(false);
  };

  const cyclePreview = (direction: -1 | 1) => {
    setPreview((current) => {
      if (!current) return current;
      const currentIndex = photos.findIndex((photo) => photo.name === current.name);
      return photos[(currentIndex + direction + photos.length) % photos.length];
    });
    setPreviewZoom(1);
  };

  const sharePreview = async () => {
    if (!preview) return;
    const url = new URL(preview.src, window.location.href).href;

    if (navigator.share) {
      try {
        await navigator.share({ title: preview.name, url });
      } catch {
        return;
      }
      return;
    }

    await navigator.clipboard?.writeText(url);
  };

  useEffect(() => {
    if (!preview) return;

    const handleKeyboard = (event: KeyboardEvent) => {
      if (event.key === "Escape") setPreview(null);
      if (event.key === "ArrowLeft") cyclePreview(-1);
      if (event.key === "ArrowRight") cyclePreview(1);
    };

    window.addEventListener("keydown", handleKeyboard);
    return () => window.removeEventListener("keydown", handleKeyboard);
  });

  const itemCount =
    activeFolder === "home"
      ? visibleFolders.length
      : activeFolder === "work"
        ? visibleWork.length
        : activeFolder === "photography"
          ? visiblePhotos.length
          : visibleAlbums.length;

  const previewIndex = preview ? photos.findIndex((photo) => photo.name === preview.name) + 1 : 0;
  const activeApp = preview ? "Preview" : "Finder";

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
          <AppleLogo size={17} weight="fill" aria-hidden="true" />
          <strong>{activeApp}</strong>
          <span>File</span>
          <span>Edit</span>
          <span>View</span>
          <span>{preview ? "Tools" : "Go"}</span>
          <span>Window</span>
          <span>Help</span>
        </div>
        <div className="menu-status">
          <SpeakerHigh size={16} weight="fill" aria-hidden="true" />
          <WifiHigh size={17} weight="bold" aria-hidden="true" />
          <SlidersHorizontal size={18} weight="bold" aria-hidden="true" />
          <BatteryHigh size={22} weight="fill" aria-hidden="true" />
          <span suppressHydrationWarning>{clock}</span>
        </div>
      </header>

      <section className="desktop-area" aria-label="Raghav's desktop">
        {windowOpen ? (
          <section
            className={`finder-window ${activeFolder === "home" ? "is-home" : "is-folder"}${maximized ? " is-maximized" : ""}${preview ? " is-background" : ""}`}
            aria-label={`${folderNames[activeFolder]} Finder window`}
          >
            <header className="window-toolbar">
              <TrafficLights
                label="Finder"
                maximized={maximized}
                close={() => setWindowOpen(false)}
                minimize={() => setWindowOpen(false)}
                maximize={() => setMaximized((value) => !value)}
              />

              <div className="toolbar-actions">
                <div className="toolbar-leading">
                  <div className="history-controls">
                    <button className="toolbar-button" type="button" aria-label="Back" disabled={historyIndex === 0} onClick={goBack}>
                      <CaretLeft size={23} weight="bold" aria-hidden="true" />
                    </button>
                    <button className="toolbar-button" type="button" aria-label="Forward" disabled={historyIndex >= history.length - 1} onClick={goForward}>
                      <CaretRight size={23} weight="bold" aria-hidden="true" />
                    </button>
                  </div>
                  <h1 className="window-title">{folderNames[activeFolder]}</h1>
                </div>

                {activeFolder !== "home" ? (
                  <div className="finder-toolbar-controls">
                    <div className="segmented-control" aria-label="Finder view">
                      <button className={viewMode === "icons" ? "is-active" : ""} type="button" aria-label="Icon view" aria-pressed={viewMode === "icons"} onClick={() => setViewMode("icons")}>
                        <GridFour size={19} weight="bold" aria-hidden="true" />
                      </button>
                      <button className={viewMode === "list" ? "is-active" : ""} type="button" aria-label="List view" aria-pressed={viewMode === "list"} onClick={() => setViewMode("list")}>
                        <ListBullets size={20} weight="bold" aria-hidden="true" />
                      </button>
                      <button type="button" aria-label="Column view" disabled>
                        <Columns size={20} weight="bold" aria-hidden="true" />
                      </button>
                    </div>
                    <button className="toolbar-pill" type="button" aria-label="Group items" disabled>
                      <SidebarSimple size={19} weight="bold" aria-hidden="true" />
                      <CaretDown size={12} weight="bold" aria-hidden="true" />
                    </button>
                    <button className="toolbar-pill toolbar-pill--wide" type="button" aria-label="Finder actions" disabled>
                      <ShareNetwork size={19} weight="bold" aria-hidden="true" />
                      <TagSimple size={19} weight="bold" aria-hidden="true" />
                      <DotsThree size={21} weight="bold" aria-hidden="true" />
                    </button>
                    <label className="search-box">
                      <MagnifyingGlass size={18} weight="bold" aria-hidden="true" />
                      <input
                        type="search"
                        value={query}
                        onChange={(event) => setQuery(event.target.value)}
                        placeholder="Search"
                        aria-label={`Search ${folderNames[activeFolder]}`}
                      />
                    </label>
                  </div>
                ) : null}
              </div>
            </header>

            {activeFolder !== "home" ? (
              <FinderSidebar activeFolder={activeFolder} navigate={navigate} />
            ) : null}

            <div className="finder-content">
              <div className="content-inner">
                {activeFolder === "home" && <HomeFolder items={visibleFolders} navigate={navigate} />}
                {activeFolder === "work" && <WorkFolder items={visibleWork} viewMode={viewMode} />}
                {activeFolder === "photography" && (
                  <PhotographyFolder items={visiblePhotos} viewMode={viewMode} openPreview={openPreview} />
                )}
                {activeFolder === "music" && <MusicFolder items={visibleAlbums} viewMode={viewMode} />}
              </div>
            </div>

            {activeFolder !== "home" ? (
              <footer className="finder-status">
                {itemCount} {itemCount === 1 ? "item" : "items"}
              </footer>
            ) : null}
          </section>
        ) : null}

        {preview ? (
          <section
            className={`preview-window${previewMaximized ? " is-maximized" : ""}`}
            role="dialog"
            aria-label={`${preview.name} in Preview`}
          >
            <header className="preview-toolbar">
              <TrafficLights
                label="Preview"
                maximized={previewMaximized}
                close={() => setPreview(null)}
                minimize={() => setPreview(null)}
                maximize={() => setPreviewMaximized((value) => !value)}
              />
              <div className="preview-toolbar-actions">
                <div className="preview-leading">
                  <button className="toolbar-button" type="button" aria-label="Previous photo" onClick={() => cyclePreview(-1)}>
                    <CaretLeft size={21} weight="bold" aria-hidden="true" />
                  </button>
                  <button className="toolbar-button" type="button" aria-label="Next photo" onClick={() => cyclePreview(1)}>
                    <CaretRight size={21} weight="bold" aria-hidden="true" />
                  </button>
                  <strong>{preview.name}</strong>
                </div>
                <div className="preview-controls">
                  <button className="toolbar-button" type="button" aria-label="Zoom out" onClick={() => setPreviewZoom((zoom) => Math.max(0.6, zoom - 0.2))}>
                    <MagnifyingGlassMinus size={20} weight="bold" aria-hidden="true" />
                  </button>
                  <span>{Math.round(previewZoom * 100)}%</span>
                  <button className="toolbar-button" type="button" aria-label="Zoom in" onClick={() => setPreviewZoom((zoom) => Math.min(2, zoom + 0.2))}>
                    <MagnifyingGlassPlus size={20} weight="bold" aria-hidden="true" />
                  </button>
                  <a className="toolbar-button" href={preview.src} download aria-label="Download photo">
                    <DownloadSimple size={20} weight="bold" aria-hidden="true" />
                  </a>
                  <button className="toolbar-button" type="button" aria-label="Share photo" onClick={sharePreview}>
                    <ShareNetwork size={20} weight="bold" aria-hidden="true" />
                  </button>
                </div>
              </div>
            </header>
            <div className="preview-canvas">
              <Image
                src={preview.src}
                alt={preview.alt}
                width={preview.width}
                height={preview.height}
                sizes="90vw"
                unoptimized
                style={{ transform: `scale(${previewZoom})` }}
              />
            </div>
            <footer className="preview-status">{previewIndex} of {photos.length}</footer>
          </section>
        ) : null}
      </section>

      <Dock
        windowOpen={windowOpen}
        previewOpen={Boolean(preview)}
        openFinder={() => setWindowOpen(true)}
        openPhotography={() => navigate("photography")}
        openMusic={() => navigate("music")}
      />
    </main>
  );
}

function TrafficLights({
  label,
  maximized,
  close,
  minimize,
  maximize,
}: {
  label: string;
  maximized: boolean;
  close: () => void;
  minimize: () => void;
  maximize: () => void;
}) {
  return (
    <div className="traffic-lights">
      <button className="traffic-light traffic-light--close" type="button" aria-label={`Close ${label}`} onClick={close}>
        <X size={8} weight="bold" aria-hidden="true" />
      </button>
      <button className="traffic-light traffic-light--minimize" type="button" aria-label={`Minimize ${label}`} onClick={minimize}>
        <Minus size={8} weight="bold" aria-hidden="true" />
      </button>
      <button className="traffic-light traffic-light--maximize" type="button" aria-label={maximized ? `Restore ${label}` : `Maximize ${label}`} onClick={maximize}>
        <ArrowsOutSimple size={8} weight="bold" aria-hidden="true" />
      </button>
    </div>
  );
}

function FinderSidebar({ activeFolder, navigate }: { activeFolder: FolderKey; navigate: (folder: FolderKey) => void }) {
  return (
    <aside className="finder-sidebar" aria-label="Finder sidebar">
      <div className="sidebar-section">
        <p className="sidebar-label">Favorites</p>
        <SidebarButton active={activeFolder === "home"} onClick={() => navigate("home")} icon={<House />} label="Raghav" />
        <SidebarButton active={activeFolder === "work"} onClick={() => navigate("work")} icon={<Briefcase />} label="Work" />
        <SidebarButton active={activeFolder === "photography"} onClick={() => navigate("photography")} icon={<ImageSquare />} label="Photography" />
        <SidebarButton active={activeFolder === "music"} onClick={() => navigate("music")} icon={<MusicNotes />} label="Music" />
      </div>
      <div className="sidebar-section">
        <p className="sidebar-label">Locations</p>
        <SidebarButton icon={<HardDrives />} label="Macintosh HD" />
        <SidebarButton icon={<Airplay />} label="AirDrop" />
        <SidebarButton icon={<Trash />} label="Trash" />
      </div>
    </aside>
  );
}

function SidebarButton({ active = false, onClick, icon, label }: { active?: boolean; onClick?: () => void; icon: React.ReactNode; label: string }) {
  return (
    <button className={`sidebar-button${active ? " is-active" : ""}`} type="button" onClick={onClick}>
      <span className="sidebar-icon" aria-hidden="true">{icon}</span>
      {label}
    </button>
  );
}

function Dock({ windowOpen, previewOpen, openFinder, openPhotography, openMusic }: { windowOpen: boolean; previewOpen: boolean; openFinder: () => void; openPhotography: () => void; openMusic: () => void }) {
  return (
    <div className="dock-zone">
      <nav className="dock" aria-label="Desktop dock">
        <button className={`dock-button dock-finder${windowOpen ? " is-open" : ""}`} type="button" aria-label="Open Finder" onClick={openFinder}>
          <Smiley size={34} weight="fill" aria-hidden="true" />
        </button>
        <button className={`dock-button dock-preview${previewOpen ? " is-open" : ""}`} type="button" aria-label="Open Photography" onClick={openPhotography}>
          <ImageSquare size={32} weight="fill" aria-hidden="true" />
        </button>
        <button className="dock-button dock-music" type="button" aria-label="Open Music" onClick={openMusic}>
          <MusicNotes size={32} weight="fill" aria-hidden="true" />
        </button>
        <a className="dock-button dock-web" href="https://r4ghav.xyz" aria-label="Open the original portfolio">
          <Globe size={31} weight="fill" aria-hidden="true" />
        </a>
        <a className="dock-button dock-github" href="https://github.com/raghavrat" target="_blank" rel="noreferrer" aria-label="Open Raghav's GitHub">
          <GithubLogo size={32} weight="fill" aria-hidden="true" />
        </a>
        <a className="dock-button dock-linkedin" href="https://www.linkedin.com/in/raghav-ratnani" target="_blank" rel="noreferrer" aria-label="Open Raghav's LinkedIn">
          <LinkedinLogo size={31} weight="fill" aria-hidden="true" />
        </a>
      </nav>
    </div>
  );
}

function HomeFolder({ items, navigate }: { items: readonly { key: Exclude<FolderKey, "home">; name: string }[]; navigate: (folder: FolderKey) => void }) {
  if (items.length === 0) return <EmptyState />;

  return (
    <div className="home-folder-grid">
      {items.map((folder) => (
        <button className="home-folder" type="button" onClick={() => navigate(folder.key)} key={folder.key}>
          <FolderGlyph />
          <span>{folder.name}</span>
        </button>
      ))}
    </div>
  );
}

function WorkFolder({ items, viewMode }: { items: readonly WorkItem[]; viewMode: ViewMode }) {
  if (items.length === 0) return <EmptyState />;

  if (viewMode === "list") {
    return (
      <table className="list-view">
        <thead><tr><th>Name</th><th>Kind</th><th>Status</th></tr></thead>
        <tbody>
          {items.map((item) => (
            <tr key={item.name}>
              <td><div className="list-name"><Briefcase size={18} weight="fill" /><a href={item.href} target="_blank" rel="noreferrer">{item.name}</a><ArrowSquareOut size={13} aria-hidden="true" /></div></td>
              <td className="list-kind">{item.discipline}</td>
              <td className="list-date">{item.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  }

  return (
    <div className="icon-grid icon-grid--work">
      {items.map((item) => (
        <a className="finder-item" href={item.href} target="_blank" rel="noreferrer" key={item.name}>
          <span className="document-icon document-icon--work"><Briefcase size={42} weight="fill" aria-hidden="true" /></span>
          <span className="finder-item-name">{item.name}</span>
        </a>
      ))}
    </div>
  );
}

function PhotographyFolder({ items, viewMode, openPreview }: { items: readonly PhotoItem[]; viewMode: ViewMode; openPreview: (photo: PhotoItem) => void }) {
  if (items.length === 0) return <EmptyState />;

  if (viewMode === "list") {
    return (
      <table className="list-view">
        <thead><tr><th>Name</th><th>Kind</th><th>Dimensions</th></tr></thead>
        <tbody>
          {items.map((photo) => (
            <tr key={photo.name}>
              <td><div className="list-name"><ImageSquare size={18} weight="fill" /><button type="button" onClick={() => openPreview(photo)}>{photo.name}</button></div></td>
              <td className="list-kind">JPEG image</td>
              <td className="list-date">{photo.width} x {photo.height}</td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  }

  return (
    <div className="icon-grid icon-grid--media">
      {items.map((photo) => (
        <button className="finder-item" type="button" onClick={() => openPreview(photo)} key={photo.name}>
          <span className="photo-file"><span className="photo-thumb"><Image src={photo.src} alt={photo.alt} fill sizes="116px" unoptimized /></span></span>
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
        <thead><tr><th>Name</th><th>Kind</th><th>Open With</th></tr></thead>
        <tbody>
          {items.map((album) => (
            <tr key={album.title}>
              <td><div className="list-name"><MusicNotes size={18} weight="fill" /><a href={album.href} target="_blank" rel="noreferrer">{album.title}</a></div></td>
              <td className="list-kind">Album</td>
              <td className="list-date">Spotify</td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  }

  return (
    <div className="icon-grid icon-grid--media">
      {items.map((album) => (
        <a className="finder-item" href={album.href} target="_blank" rel="noreferrer" aria-label={`${album.title} on Spotify`} key={album.title}>
          <span className="album-thumb"><Image src={album.cover} alt={`${album.title} album cover`} fill sizes="116px" unoptimized /></span>
          <span className="finder-item-name">{album.title}</span>
        </a>
      ))}
    </div>
  );
}

function EmptyState() {
  return <div className="empty-state"><div><MagnifyingGlass size={34} weight="light" aria-hidden="true" /><p>No matching items</p></div></div>;
}
