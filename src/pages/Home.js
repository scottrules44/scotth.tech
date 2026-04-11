import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import Footer from "../components/Footer";
import NavBar from "../components/NavBar";

function Home() {
  document.title = "Scott H Tech";

  useEffect(() => {
    const script = document.createElement('script');
    script.src = '//cdn.jsdelivr.net/github-cards/latest/widget.js';
    script.async = true;
    document.body.appendChild(script);
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-950">
      <NavBar />

      {/* Hero */}
      <section className="max-w-5xl mx-auto w-full px-4 pt-20 pb-12 text-center">
        <img
          src={require('../assets/mylogo.png')}
          width={80}
          height={80}
          alt="Scott H Tech logo"
          className="mx-auto mb-6 rounded-2xl shadow-md"
        />
        <h1 className="text-5xl font-bold text-gray-900 dark:text-white mb-4">Scott H Tech</h1>
        <p className="text-lg text-gray-600 dark:text-gray-400 max-w-xl mx-auto mb-8">
          Apps, tools, and plugins built by Scott Harrison — a freelance developer passionate about crafting effective solutions.
        </p>
        <div className="flex flex-wrap justify-center gap-3">
          <Link to="/apps" className="px-5 py-2.5 bg-primary-600 text-white rounded-xl font-semibold hover:bg-primary-700 transition-colors text-sm">
            View Apps
          </Link>
          <Link to="/projects" className="px-5 py-2.5 bg-white dark:bg-gray-800 text-gray-900 dark:text-white border border-gray-200 dark:border-gray-700 rounded-xl font-semibold hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors text-sm">
            See Projects
          </Link>
          <Link to="/contact" className="px-5 py-2.5 bg-white dark:bg-gray-800 text-gray-900 dark:text-white border border-gray-200 dark:border-gray-700 rounded-xl font-semibold hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors text-sm">
            Get in Touch
          </Link>
        </div>
      </section>

      {/* Featured section */}
      <section className="max-w-5xl mx-auto w-full px-4 pb-16">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Featured</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">

          <div className="bg-white dark:bg-gray-900 rounded-2xl p-6 border border-gray-200 dark:border-gray-800 shadow-sm hover:shadow-md transition-shadow">
            <span className="text-xs font-semibold text-primary-600 dark:text-primary-400 uppercase tracking-wider">App</span>
            <h3 className="text-base font-bold text-gray-900 dark:text-white mt-2 mb-1">PlaneBud</h3>
            <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">All-in-one aircraft management for fleet owners and co-ownership groups.</p>
            <a href="https://planebud.com" target="_blank" rel="noreferrer" className="text-primary-600 dark:text-primary-400 text-sm font-medium hover:underline">
              Visit site →
            </a>
          </div>

          <div className="bg-white dark:bg-gray-900 rounded-2xl p-6 border border-gray-200 dark:border-gray-800 shadow-sm hover:shadow-md transition-shadow">
            <span className="text-xs font-semibold text-primary-600 dark:text-primary-400 uppercase tracking-wider">Project</span>
            <h3 className="text-base font-bold text-gray-900 dark:text-white mt-2 mb-1">Physics Body Tool</h3>
            <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">Create and edit hitboxes easily and export them into your game.</p>
            <a href="https://scottrules44.github.io/physics-body-tool/" target="_blank" rel="noreferrer" className="text-primary-600 dark:text-primary-400 text-sm font-medium hover:underline">
              Try the tool →
            </a>
          </div>

          <div className="bg-white dark:bg-gray-900 rounded-2xl p-6 border border-gray-200 dark:border-gray-800 shadow-sm hover:shadow-md transition-shadow">
            <span className="text-xs font-semibold text-primary-600 dark:text-primary-400 uppercase tracking-wider">Plugin</span>
            <h3 className="text-base font-bold text-gray-900 dark:text-white mt-2 mb-1">Iron Source</h3>
            <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">Solar2D plugin for IronSource ad monetization integration.</p>
            <Link to="/plugin/ironSource" className="text-primary-600 dark:text-primary-400 text-sm font-medium hover:underline">
              View plugin →
            </Link>
          </div>
        </div>

        {/* GitHub */}
        <div className="mt-6 bg-white dark:bg-gray-900 rounded-2xl p-6 border border-gray-200 dark:border-gray-800 shadow-sm">
          <h3 className="text-base font-bold text-gray-900 dark:text-white mb-4">More on GitHub</h3>
          <div
            className="github-card"
            data-github="scottrules44"
            data-width="400"
            data-height=""
            data-theme="default"
          />
        </div>
      </section>

      <Footer />
    </div>
  );
}

export default Home;
