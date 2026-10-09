import React from 'react';
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";

const IMG = (name) => `${process.env.PUBLIC_URL}/rolyGuide/${name}`;

const APP_STORE = "https://apps.apple.com/us/app/roly-armadillo/id1281711301";
const GOOGLE_PLAY = "https://play.google.com/store/apps/details?id=tech.scotth.rolyArmadillo&hl=en_US&gl=US";

// --- tiles: real sprites where we have them, a coloured swatch otherwise ---
const tiles = [
  { img: "dirt.png", name: "Dirt & Blocks", desc: "Solid ground. Roly rolls and slows to a stop like normal." },
  { img: "ice.png", name: "Ice", desc: "Slick — Roly never stops sliding. Carries your speed, but hard to park." },
  { img: "snow.png", name: "Snow", desc: "Grippy — your brakes. Land on snow to stop right where you want." },
  { img: "bounce.png", name: "Bounce Block", desc: "Super bouncy. Ricochet off it to reach ledges you can't launch to directly." },
  { img: "stick.png", name: "Sticky Wall", desc: "Roly clings on and waits. Launch again to release — the key to climbing." },
  { img: "boost.png", name: "Boost Pad", desc: "Flings Roly in the arrow's direction at high speed. Free momentum." },
  { img: "quicksand.png", name: "Quicksand", desc: "Slows Roly down and sinks him. Skip across — don't linger." },
  { img: "coin.png", name: "Coin", desc: "Scattered along the best routes. Scoop them up as you fly by." },
  { img: "star.png", name: "Star", desc: "A tucked-away collectible. Grab it for bragging rights." },
  { swatch: "bg-sky-400/80", name: "Water", desc: "Buoyant — Roly floats. A soft landing that catches missed jumps." },
  { swatch: "bg-fuchsia-500/80", name: "Poison", desc: "Hazard. Touch it and the level restarts from the tee." },
  { swatch: "bg-emerald-500", name: "The Flag", desc: "The finish platform. Land on it to beat the level." },
];

const powers = [
  { img: "pow-undo.png", name: "Undo", desc: "Take back your last stroke and try that shot again." },
  { img: "pow-power.png", name: "Power", desc: "Launch harder — extra distance and height on your next shot." },
  { img: "pow-bounce.png", name: "Bounce", desc: "Turn Roly bouncy for one launch so he ricochets off anything." },
  { img: "pow-ice.png", name: "Ice", desc: "Make Roly slick to glide across the ground without stopping." },
  { img: "pow-ghost.png", name: "Ghost", desc: "Phase Roly through solid blocks to slip past an obstacle." },
  { img: "pow-stick.png", name: "Stick", desc: "Make Roly stick where he lands instead of rolling away." },
];

const tips = [
  { t: "Aim with the dotted line", d: "The trail of dots shows exactly where Roly will fly. Line it up before you let go." },
  { t: "Farther pull = more power", d: "The distance you drag sets your strength. Small taps for gentle taps, big pulls to send it." },
  { t: "Ice carries, snow stops", d: "Use ice to keep your momentum across a gap, and aim for snow when you need to stop on target." },
  { t: "You can't climb straight up", d: "Between two sticky walls, launching straight up won't reach the next hold — zig-zag side to side instead." },
  { t: "Bounce to skip sections", d: "A well-angled shot into a bounce block can leap over hazards and shave strokes." },
  { t: "Fewer strokes, more stars", d: "Every launch counts. Plan the whole route, not just the next hop." },
];

function StoreButtons() {
  return (
    <div className="flex flex-wrap gap-3">
      <a href={APP_STORE} target="_blank" rel="noreferrer"
        className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-gray-900 text-white text-sm font-semibold hover:bg-gray-800 transition-colors dark:bg-white dark:text-gray-900 dark:hover:bg-gray-200">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M16.5 1.4c.1 1-.3 2-1 2.8-.7.8-1.7 1.4-2.7 1.3-.1-1 .4-2 1-2.7.7-.8 1.8-1.4 2.7-1.4zM19 17c-.5 1.1-.7 1.6-1.3 2.6-.9 1.4-2.2 3.1-3.7 3.1-1.4 0-1.7-.9-3.6-.9s-2.3.9-3.6.9c-1.5 0-2.7-1.6-3.6-2.9-2.5-3.7-2.8-8-1.2-10.3C4 7.8 5.4 7 6.7 7c1.4 0 2.2.9 3.4.9 1.1 0 1.8-.9 3.4-.9 1.2 0 2.4.6 3.3 1.7-2.9 1.6-2.4 5.7 1.2 7.3z"/></svg>
        App Store
      </a>
      <a href={GOOGLE_PLAY} target="_blank" rel="noreferrer"
        className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-primary-600 text-white text-sm font-semibold hover:bg-primary-700 transition-colors">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M3.6 2.3c-.3.3-.5.7-.5 1.3v16.8c0 .6.2 1 .5 1.3l.1.1L13 12.6v-.2L3.7 2.2l-.1.1zM16.3 15.9l-3.1-3.1v-.2l3.1-3.1.1.1 3.7 2.1c1 .6 1 1.6 0 2.2l-3.7 2zM15.9 16.3l-3.2-3.2L3.6 22.3c.4.4 1 .4 1.7.1l10.6-6.1M15.9 7.7L5.3 1.6c-.7-.4-1.3-.3-1.7.1l9.1 9.1 3.2-3.1z"/></svg>
        Google Play
      </a>
    </div>
  );
}

function RolyGuide() {
  document.title = "How to Play Roly Armadillo – Scott H Tech";

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-950">
      <NavBar />

      <main className="max-w-5xl mx-auto w-full px-4 py-12 flex-1">

        {/* Hero */}
        <section className="relative overflow-hidden rounded-3xl border border-gray-200 dark:border-gray-800 bg-gradient-to-br from-primary-50 to-white dark:from-primary-600/10 dark:to-gray-900 p-8 sm:p-10 mb-12">
          <div className="flex flex-col sm:flex-row items-center gap-8">
            <img src={IMG("roly.png")} alt="Roly the armadillo" width={128} height={128}
              className="w-28 h-28 sm:w-32 sm:h-32 drop-shadow-lg shrink-0" />
            <div className="text-center sm:text-left">
              <p className="text-sm font-semibold text-primary-600 dark:text-primary-400 mb-2">Roly Armadillo · Player Guide</p>
              <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-3">How to Play</h1>
              <p className="text-gray-600 dark:text-gray-300 max-w-xl mb-5">
                Roly is a physics golf game: <strong>pull back and let go</strong> to launch your armadillo, then
                bounce, stick, and glide your way to the flag in as few shots as possible.
              </p>
              <StoreButtons />
            </div>
          </div>
        </section>

        {/* The basics */}
        <section className="grid md:grid-cols-3 gap-5 mb-12">
          {[
            { n: "1", t: "Drag to aim", d: "Touch Roly and drag in the opposite direction you want to go — like a slingshot. A dotted line previews the arc." },
            { n: "2", t: "Let go to launch", d: "Release to fire. The farther you pulled, the more power. Each launch adds one to your stroke count." },
            { n: "3", t: "Reach the flag", d: "Roll, bounce, and climb to the green finish platform. Beat it in fewer strokes for more stars." },
          ].map((s) => (
            <div key={s.n} className="bg-white dark:bg-gray-900 rounded-2xl p-6 border border-gray-200 dark:border-gray-800 shadow-sm">
              <div className="w-9 h-9 rounded-full bg-primary-600 text-white font-bold flex items-center justify-center mb-3">{s.n}</div>
              <h3 className="font-bold text-gray-900 dark:text-white mb-1">{s.t}</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">{s.d}</p>
            </div>
          ))}
        </section>

        {/* Stars & par */}
        <section className="bg-white dark:bg-gray-900 rounded-2xl p-6 sm:p-8 border border-gray-200 dark:border-gray-800 shadow-sm mb-12">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">⭐ Stars &amp; Par</h2>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            Every level has a <strong>par</strong> — the target number of strokes. Beat it and you earn up to three stars.
          </p>
          <div className="grid sm:grid-cols-3 gap-4">
            {[
              { stars: "★★★", label: "At or under par", cls: "text-yellow-500" },
              { stars: "★★☆", label: "One over par", cls: "text-yellow-500" },
              { stars: "★☆☆", label: "Two over par", cls: "text-yellow-500" },
            ].map((s) => (
              <div key={s.label} className="rounded-xl border border-gray-200 dark:border-gray-800 p-4 text-center">
                <div className={`text-2xl tracking-widest ${s.cls} mb-1`}>{s.stars}</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">{s.label}</div>
              </div>
            ))}
          </div>
        </section>

        {/* Terrain guide */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-1">Know Your Terrain</h2>
          <p className="text-gray-600 dark:text-gray-400 mb-6">Each tile plays differently. Read the ground before you shoot.</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {tiles.map((tile) => (
              <div key={tile.name} className="flex items-start gap-4 bg-white dark:bg-gray-900 rounded-2xl p-4 border border-gray-200 dark:border-gray-800 shadow-sm">
                {tile.img ? (
                  <img src={IMG(tile.img)} alt={tile.name} width={48} height={48}
                    className="w-12 h-12 object-contain shrink-0" />
                ) : (
                  <div className={`w-12 h-12 rounded-lg shrink-0 border border-black/10 dark:border-white/10 ${tile.swatch}`} />
                )}
                <div>
                  <h3 className="font-bold text-gray-900 dark:text-white text-sm mb-0.5">{tile.name}</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{tile.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Power-ups */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-1">Power-Ups</h2>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            Stuck? Tap the power button before a shot to change how Roly behaves. Each one is a limited resource, so spend them wisely.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {powers.map((p) => (
              <div key={p.name} className="flex items-start gap-4 bg-white dark:bg-gray-900 rounded-2xl p-5 border border-gray-200 dark:border-gray-800 shadow-sm hover:shadow-md transition-shadow">
                <img src={IMG(p.img)} alt={p.name} width={44} height={44} className="w-11 h-11 object-contain shrink-0" />
                <div>
                  <h3 className="font-bold text-gray-900 dark:text-white mb-0.5">{p.name}</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{p.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Pro tips */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Pro Tips</h2>
          <div className="grid sm:grid-cols-2 gap-4">
            {tips.map((tip) => (
              <div key={tip.t} className="flex gap-3 bg-white dark:bg-gray-900 rounded-2xl p-5 border border-gray-200 dark:border-gray-800 shadow-sm">
                <div className="text-primary-500 shrink-0 mt-0.5">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 18h6M10 22h4M12 2a7 7 0 0 0-4 12.7c.6.5 1 1.3 1 2.1V17h6v-.2c0-.8.4-1.6 1-2.1A7 7 0 0 0 12 2z"/></svg>
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 dark:text-white text-sm mb-0.5">{tip.t}</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{tip.d}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Build & share */}
        <section className="rounded-3xl border border-gray-200 dark:border-gray-800 bg-gradient-to-br from-primary-600 to-primary-700 text-white p-8 sm:p-10">
          <h2 className="text-2xl font-bold mb-2">Build &amp; Share Your Own Levels</h2>
          <p className="text-primary-50 max-w-2xl mb-4">
            Done with the built-in courses? Tap <strong>Build</strong> in the app to design your own with the level editor —
            drop in ground, hazards, boosts, and sticky walls, set the par, and test it instantly.
          </p>
          <p className="text-primary-50 max-w-2xl">
            Publish a level and it gets a shareable link. Friends who tap it jump straight into your course inside the app —
            no searching required.
          </p>
        </section>

      </main>

      <Footer />
    </div>
  );
}

export default RolyGuide;
