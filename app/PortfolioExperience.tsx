"use client";

import { useEffect, useRef } from "react";
import { ArrowDownRight } from "@phosphor-icons/react/ArrowDownRight";
import { ArrowUpRight } from "@phosphor-icons/react/ArrowUpRight";
import { LinkedinLogo } from "@phosphor-icons/react/LinkedinLogo";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SpatialTunnel } from "./SpatialTunnel";

const projects = [
  {
    name: "DecaPal",
    descriptor: "AI roleplay coach",
    result: "About 72% of users made ICDC.",
    stack: "Next.js / Firebase / Gemini",
    className: "project-panel--acid",
    mark: "DP",
  },
  {
    name: "Job Queue",
    descriptor: "Distributed worker API",
    result: "Email and SMS jobs, handed off without blocking the product.",
    stack: "Redis / Postgres / gRPC / FastAPI",
    className: "project-panel--chrome",
    mark: "JQ",
  },
  {
    name: "shortenURL",
    descriptor: "Fast link infrastructure",
    result: "A focused URL shortener built on serverless primitives.",
    stack: "Next.js / Firebase Cloud Functions",
    className: "project-panel--signal",
    mark: "SU",
  },
] as const;

export function PortfolioExperience() {
  const rootRef = useRef<HTMLElement>(null);
  const horizontalRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    gsap.registerPlugin(ScrollTrigger);
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;

    const context = gsap.context(() => {
      gsap.from(".site-nav", {
        y: -32,
        opacity: 0,
        duration: 0.85,
        ease: "power3.out",
      });
      gsap.from(".journey-copy--intro > *", {
        y: 52,
        opacity: 0,
        duration: 1.1,
        stagger: 0.09,
        ease: "power4.out",
      });

      const flightTimeline = gsap.timeline({
        scrollTrigger: {
          trigger: "#flight",
          start: "top top",
          end: "bottom bottom",
          scrub: 1,
        },
      });

      flightTimeline
        .to(".journey-copy--intro", { opacity: 0, y: -70, duration: 0.12 }, 0.08)
        .fromTo(
          ".journey-copy--systems",
          { opacity: 0, y: 70, scale: 0.94 },
          { opacity: 1, y: 0, scale: 1, duration: 0.1 },
          0.22,
        )
        .to(".journey-copy--systems", { opacity: 0, y: -60, duration: 0.1 }, 0.39)
        .fromTo(
          ".journey-copy--move",
          { opacity: 0, x: -80 },
          { opacity: 1, x: 0, duration: 0.1 },
          0.48,
        )
        .to(".journey-copy--move", { opacity: 0, x: 80, duration: 0.1 }, 0.64)
        .fromTo(
          ".journey-copy--final",
          { opacity: 0, scale: 0.72 },
          { opacity: 1, scale: 1, duration: 0.11 },
          0.73,
        )
        .to(".journey-copy--final", { opacity: 0, scale: 1.18, duration: 0.1 }, 0.89)
        .to(".flight-progress-fill", { scaleY: 1, duration: 1 }, 0);

      gsap.utils.toArray<HTMLElement>("[data-reveal]").forEach((element) => {
        gsap.from(element, {
          y: 72,
          opacity: 0,
          duration: 1.05,
          ease: "power3.out",
          scrollTrigger: {
            trigger: element,
            start: "top 82%",
            once: true,
          },
        });
      });

      const horizontal = horizontalRef.current;
      const track = trackRef.current;
      if (horizontal && track) {
        const media = gsap.matchMedia();
        media.add("(min-width: 769px)", () => {
          const getDistance = () => Math.max(track.scrollWidth - window.innerWidth, 0);
          gsap.to(track, {
            x: () => -getDistance(),
            ease: "none",
            scrollTrigger: {
              trigger: horizontal,
              start: "top top",
              end: () => `+=${getDistance()}`,
              pin: true,
              scrub: 1,
              invalidateOnRefresh: true,
            },
          });
        });
      }
    }, root);

    return () => context.revert();
  }, []);

  return (
    <main ref={rootRef} className="site-shell">
      <a className="skip-link" href="#work">
        Skip to work
      </a>

      <header className="site-nav">
        <a href="#flight" className="site-mark" aria-label="Raghav Ratnani home">
          R/R
        </a>
        <nav aria-label="Primary navigation">
          <a href="#work">Work</a>
          <a
            href="https://www.linkedin.com/in/raghav-ratnani"
            target="_blank"
            rel="noreferrer"
          >
            Connect <ArrowUpRight aria-hidden="true" weight="bold" />
          </a>
        </nav>
      </header>

      <section id="flight" className="flight-section" aria-label="Introduction">
        <div className="flight-stage">
          <SpatialTunnel />

          <div className="journey-copy journey-copy--intro">
            <p className="hero-kicker">Raghav Ratnani</p>
            <h1>
              BUILDING AT
              <br />
              FULL SPEED.
            </h1>
            <p className="hero-summary">
              Cumulus Labs engineer. AI infrastructure, software, and machines.
            </p>
          </div>

          <div className="journey-copy journey-copy--systems" aria-hidden="true">
            <p>I BUILD</p>
            <h2>SYSTEMS.</h2>
          </div>

          <div className="journey-copy journey-copy--move" aria-hidden="true">
            <p>THEN I MAKE THEM</p>
            <h2>MOVE.</h2>
          </div>

          <div className="journey-copy journey-copy--final" aria-hidden="true">
            <p>THE PORTAL OPENS.</p>
            <h2>HERE&apos;S THE WORK.</h2>
          </div>

          <div className="flight-progress" aria-hidden="true">
            <span className="flight-progress-fill" />
          </div>
        </div>
      </section>

      <section className="cumulus-section" id="work">
        <div className="section-inner cumulus-layout">
          <div className="cumulus-type" data-reveal>
            <span className="cumulus-word">CUMULUS</span>
            <span className="cumulus-labs">LABS</span>
          </div>
          <div className="cumulus-copy" data-reveal>
            <p className="section-kicker">Now building / YC W26</p>
            <h2>Production AI should feel instant.</h2>
            <p>
              I work at Cumulus Labs, where inference infrastructure becomes one
              platform instead of a pile of vendors.
            </p>
            <a
              className="text-link"
              href="https://cumuluslabs.io"
              target="_blank"
              rel="noreferrer"
            >
              Visit Cumulus <ArrowUpRight aria-hidden="true" weight="bold" />
            </a>
          </div>
          <div className="cumulus-orbit" aria-hidden="true">
            <span />
            <span />
            <span />
          </div>
        </div>
      </section>

      <section
        className="projects-section"
        aria-labelledby="projects-heading"
        ref={horizontalRef}
      >
        <div className="projects-track" ref={trackRef}>
          <div className="projects-intro">
            <p className="section-kicker">Selected builds</p>
            <h2 id="projects-heading">THINGS THAT SHIPPED.</h2>
            <ArrowDownRight className="projects-arrow" aria-hidden="true" />
          </div>

          {projects.map((project) => (
            <article
              className={`project-panel ${project.className}`}
              key={project.name}
            >
              <div className="project-mark" aria-hidden="true">
                {project.mark}
              </div>
              <div className="project-copy">
                <p>{project.descriptor}</p>
                <h3>{project.name}</h3>
                <p className="project-result">{project.result}</p>
                <span>{project.stack}</span>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="proof-section" aria-labelledby="proof-heading">
        <div className="section-inner">
          <h2 id="proof-heading" data-reveal>
            PROOF OF
            <br />
            OBSESSION.
          </h2>
          <div className="proof-grid">
            <article className="proof-item proof-item--wide" data-reveal>
              <strong>~72%</strong>
              <p>of DecaPal users made ICDC</p>
            </article>
            <article className="proof-item" data-reveal>
              <strong>3X</strong>
              <p>ICDC qualifier</p>
            </article>
            <article className="proof-item" data-reveal>
              <strong>5 / 1,460</strong>
              <p>North Atlantic Stock Market Game</p>
            </article>
          </div>
        </div>
      </section>

      <section className="machines-section">
        <div className="machine-word" aria-hidden="true">
          MACHINES
        </div>
        <div className="machine-copy" data-reveal>
          <p className="section-kicker">Stormgears FRC 5422</p>
          <h2>Code hits different when steel moves.</h2>
          <p>
            Robotics is where software meets tolerances, deadlines, and the real
            world.
          </p>
        </div>
      </section>

      <footer className="site-footer">
        <div className="footer-inner" data-reveal>
          <p>Have a hard problem?</p>
          <a
            href="https://www.linkedin.com/in/raghav-ratnani"
            target="_blank"
            rel="noreferrer"
          >
            CONNECT
            <LinkedinLogo aria-hidden="true" weight="fill" />
          </a>
        </div>
        <div className="footer-base">
          <span>Raghav Ratnani</span>
          <span>r4ghav.xyz</span>
        </div>
      </footer>
    </main>
  );
}
