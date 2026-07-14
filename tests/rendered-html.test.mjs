import assert from "node:assert/strict";
import { access, readFile } from "node:fs/promises";
import test from "node:test";

async function render() {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}`);
  const { default: worker } = await import(workerUrl.href);

  return worker.fetch(
    new Request("http://localhost/", {
      headers: { accept: "text/html" },
    }),
    {
      ASSETS: {
        fetch: async () => new Response("Not found", { status: 404 }),
      },
    },
    {
      waitUntil() {},
      passThroughOnException() {},
    },
  );
}

test("server-renders the complete portfolio", async () => {
  const response = await render();
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);

  const html = await response.text();
  assert.match(
    html,
    /<title>Raghav Ratnani \| Engineer and Photographer<\/title>/i,
  );
  assert.match(html, /id="hero-title"/);
  assert.match(html, /Raghav/);
  assert.match(html, /Ratnani/);
  assert.doesNotMatch(html, /class="topbar"|<nav\b/i);
  assert.match(html, /id="work"/);
  assert.doesNotMatch(html, />Work</i);
  assert.match(html, /https:\/\/decapal\.org/);
  assert.match(html, /https:\/\/github\.com\/Stormgears-FRC-5422/);
  assert.match(html, /id="photography"/);
  assert.match(html, /class="photo-archive"/);
  assert.match(html, /id="music"/);
  assert.match(html, /Cumulus Labs/);
  assert.match(html, /gibbs free energy/);
  assert.match(html, /nimbus labs/);
  assert.match(html, /Graduation/);
  assert.match(html, /Swimming/);
  assert.match(html, /Eternal Atake/);
  assert.match(html, /Finally Rich/);
  assert.match(html, /DS2 \(Deluxe\)/);
  assert.doesNotMatch(html, /56 Nights/);
  assert.match(html, /open\.spotify\.com\/album\/4SZko61aMnmgvNhfhgTuD3/);
  assert.match(html, /open\.spotify\.com\/album\/0fUy6IdLHDpGNwavIlhEsl/);
  assert.doesNotMatch(html, /open\.spotify\.com\/track\//);
  assert.doesNotMatch(html, /record-track/);
  assert.doesNotMatch(
    html,
    /Useful things|The city after dark|Records I keep coming back|Scroll to enter|point of view|>Photography<|>Rotation</i,
  );
  assert.match(html, /\/photography\/dscf4001-2\.jpg/);
});

test("keeps the portfolio static and its media local", async () => {
  const [page, component, css, packageJson] = await Promise.all([
    readFile(new URL("../app/page.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/PortfolioExperience.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/globals.css", import.meta.url), "utf8"),
    readFile(new URL("../package.json", import.meta.url), "utf8"),
  ]);

  assert.match(page, /<PortfolioExperience \/>/);
  assert.doesNotMatch(component, /"use client"|useEffect|ScrollTrigger/);
  assert.doesNotMatch(packageJson, /"gsap"|"three"/);
  assert.match(css, /--paper:\s*#eee9db/);
  assert.match(css, /--forest:\s*#33453a/);
  assert.match(component, /\/music\/graduation\.jpg/);
  assert.match(component, /\/music\/eternal-atake\.jpg/);
  assert.match(component, /DS2 \(Deluxe\)/);
  assert.match(component, /open\.spotify\.com\/album\//);
  assert.doesNotMatch(component, /open\.spotify\.com\/track\//);
  assert.doesNotMatch(component, /className="record-track"/);
  assert.doesNotMatch(component, /gallery-lead|photo-grid/);

  await Promise.all(
    [
      "dscf1650-2.jpg",
      "dscf3993.jpg",
      "dscf4001-2.jpg",
      "dscf4005.jpg",
      "dscf4023.jpg",
      "dscf4028.jpg",
      "dscf4031-5.jpg",
    ].map((filename) =>
      access(new URL(`../public/photography/${filename}`, import.meta.url)),
    ),
  );

  await Promise.all(
    [
      "graduation.jpg",
      "swimming.jpg",
      "isolation.jpg",
      "the-slow-rush.jpg",
      "so-much-fun.jpg",
      "eternal-atake.jpg",
      "finally-rich.jpg",
      "56-nights.jpg",
    ].map((filename) =>
      access(new URL(`../public/music/${filename}`, import.meta.url)),
    ),
  );
});
