import React from 'react';
import Footer from "../components/Footer";
import NavBar from "../components/NavBar";

const projects = [
  {
    name: "PebBeep",
    description: "All your Beeper messages on your Pebble smartwatch — WhatsApp, Signal, Telegram, Discord, Slack, right on your wrist.",
    url: "https://pebbeep.web.app/",
    label: "Visit site",
  },
  {
    name: "Solar2D Marketplace",
    description: "Browse and purchase dozens of Solar2D plugins I've created.",
    url: "https://solar2dmarketplace.com",
    label: "Check it out",
  },
  {
    name: "Physics Body Tool",
    description: "Create and edit hitboxes easily and export them into your game.",
    url: "https://scottrules44.github.io/physics-body-tool/",
    label: "Try the tool",
  },
  {
    name: "SBrowser",
    description: "A basic Python-based web browser.",
    url: "https://github.com/scottrules44/SBrowser",
    label: "View on GitHub",
  },
];

function Projects() {
  document.title = "Projects – Scott H Tech";

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-950">
      <NavBar />
      <div className="max-w-5xl mx-auto w-full px-4 py-12 flex-1">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">Projects</h1>
        <p className="text-gray-600 dark:text-gray-400 mb-10">Tools, experiments, and open-source work.</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {projects.map((project, i) => (
            <div
              key={i}
              className="bg-white dark:bg-gray-900 rounded-2xl p-6 border border-gray-200 dark:border-gray-800 shadow-sm hover:shadow-md transition-shadow flex flex-col"
            >
              <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-2">{project.name}</h2>
              <p className="text-gray-600 dark:text-gray-400 text-sm mb-5 flex-1">{project.description}</p>
              <a
                href={project.url}
                target="_blank"
                rel="noreferrer"
                className="self-start px-4 py-2 bg-primary-600 text-white text-sm font-semibold rounded-lg hover:bg-primary-700 transition-colors"
              >
                {project.label} →
              </a>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Projects;
