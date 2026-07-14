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
  assert.match(html, /id="hero-title">Raghav/);
  assert.match(html, /id="work"/);
  assert.match(html, /id="photography"/);
  assert.match(html, /id="music"/);
  assert.match(html, /Cumulus Labs/);
  assert.match(html, /gibbs free energy/);
  assert.match(html, /nimbus labs/);
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
  assert.match(css, /--bone:\s*#eee8da/);
  assert.match(css, /--olive:\s*#65704d/);
  assert.match(component, /\/music\/gibbs-free-energy\.jpg/);
  assert.match(component, /\/music\/nimbus-labs\.jpg/);

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
});
