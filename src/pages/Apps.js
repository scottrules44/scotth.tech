import React from 'react';
import AppViewer from "../components/AppViewer";
import Footer from "../components/Footer";
import NavBar from "../components/NavBar";
import apps from "../pages/Apps/Apps.json";

function Apps() {
  document.title = "Apps – Scott H Tech";
  const listOfApps = apps.data;

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-950">
      <NavBar />
      <div className="max-w-5xl mx-auto w-full px-4 py-12 flex-1">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">Apps</h1>
        <p className="text-gray-600 dark:text-gray-400 mb-10">Mobile and web apps I've built.</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {listOfApps.map((app, i) => (
            <div
              key={i}
              className="bg-white dark:bg-gray-900 rounded-2xl p-6 border border-gray-200 dark:border-gray-800 shadow-sm hover:shadow-md transition-shadow flex flex-col"
            >
              <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-1">{app.appName}</h2>
              <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 flex-1">{app.description}</p>
              <AppViewer appStore={app.appStoreLink} googlePlay={app.googlePlayLink} webLink={app.webLink} />
              {app.madeWith && (
                <p className="text-xs text-gray-400 dark:text-gray-600 mt-3">Built with {app.madeWith}</p>
              )}
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Apps;
