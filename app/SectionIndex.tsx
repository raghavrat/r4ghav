"use client";

import { useEffect, useState } from "react";

type Spread = {
  number: string;
  name: string;
};

const cover: Spread = { number: "00", name: "Cover" };

export function SectionIndex() {
  const [active, setActive] = useState<Spread>(cover);

  useEffect(() => {
    const spreads = Array.from(
      document.querySelectorAll<HTMLElement>("[data-spread]"),
    );
    let frame: number | null = null;

    const update = () => {
      frame = null;
      const midpoint = window.innerHeight / 2;
      const current =
        spreads.find((spread) => {
          const bounds = spread.getBoundingClientRect();
          return bounds.top <= midpoint && bounds.bottom > midpoint;
        }) ?? spreads[0];

      setActive((previous) => {
        const next = {
          number: current?.dataset.spreadNumber ?? "00",
          name: current?.dataset.spreadName ?? "Cover",
        };

        return previous.number === next.number ? previous : next;
      });
    };

    const queueUpdate = () => {
      if (frame !== null) return;
      frame = window.requestAnimationFrame(update);
    };

    window.addEventListener("scroll", queueUpdate, { passive: true });
    window.addEventListener("resize", queueUpdate);
    update();

    return () => {
      window.removeEventListener("scroll", queueUpdate);
      window.removeEventListener("resize", queueUpdate);
      if (frame !== null) window.cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <aside
      className="section-index"
      data-hidden={active.number === "00"}
      aria-label="Current section"
    >
      <span>{active.number} / 03</span>
      <span aria-hidden="true">|</span>
      <span>{active.name}</span>
    </aside>
  );
}
