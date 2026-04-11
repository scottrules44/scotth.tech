import React from 'react';
import { Link } from 'react-router-dom';
import Footer from "../components/Footer";
import NavBar from "../components/NavBar";
import data from "../pluginDocs/pluginList.json";

function Plugins() {
  document.title = "Plugins – Scott H Tech";
  const categories = data.categories;
  const plugins = data.plugins;

  const sortedPlugins = {};
  Object.keys(plugins).forEach((e) => {
    const d = plugins[e];
    if (sortedPlugins[d.category] === undefined) {
      sortedPlugins[d.category] = [];
    }
    sortedPlugins[d.category].push({ ...d, key: e });
  });

  function getPluginsForCategory(category) {
    if (!sortedPlugins[category]) return null;
    return sortedPlugins[category]
      .filter(plugin => !plugin.hidden)
      .map((plugin, i) => {
        const pluginPath = plugin.key.replace("-", "/");
        return (
          <Link
            key={i}
            to={"/" + pluginPath}
            className="block px-4 py-3 rounded-xl text-sm font-medium text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800 hover:bg-primary-50 dark:hover:bg-primary-600/10 hover:text-primary-600 dark:hover:text-primary-400 border border-gray-200 dark:border-gray-700 transition-colors"
          >
            {plugin.name}
          </Link>
        );
      });
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-950">
      <NavBar />
      <div className="max-w-5xl mx-auto w-full px-4 py-12 flex-1">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">Plugins</h1>
        <p className="text-gray-600 dark:text-gray-400 mb-10">Solar2D plugins I've built and maintain.</p>
        <div className="space-y-8">
          {categories.map((category, i) => {
            const categoryPlugins = getPluginsForCategory(category);
            if (!categoryPlugins || categoryPlugins.length === 0) return null;
            return (
              <div key={i}>
                <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-3">{category}</h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
                  {categoryPlugins}
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Plugins;
