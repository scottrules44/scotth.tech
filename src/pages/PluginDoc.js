import React, { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import NavBar from "../components/NavBar";
import data from "../pluginDocs/pluginList.json";
import ReactMarkdown from 'react-markdown';
import Footer from "../components/Footer";

const mdComponents = {
  h1: ({ children }) => (
    <h1 className="text-3xl font-bold text-gray-900 dark:text-white mt-2 mb-4">{children}</h1>
  ),
  h2: ({ children }) => (
    <h2 className="text-2xl font-bold text-gray-900 dark:text-white mt-10 mb-3 pt-6 border-t border-gray-200 dark:border-gray-800">{children}</h2>
  ),
  h3: ({ children }) => (
    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mt-7 mb-2">{children}</h3>
  ),
  h4: ({ children }) => (
    <h4 className="text-base font-semibold text-primary-700 dark:text-primary-400 mt-5 mb-1 font-mono">{children}</h4>
  ),
  h5: ({ children }) => (
    <h5 className="text-xs font-bold text-gray-500 dark:text-gray-400 mt-6 mb-2 uppercase tracking-widest">{children}</h5>
  ),
  p: ({ children }) => (
    <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed mb-3">{children}</p>
  ),
  ul: ({ children }) => (
    <ul className="list-disc list-outside ml-5 mb-4 space-y-1 text-sm text-gray-700 dark:text-gray-300">{children}</ul>
  ),
  ol: ({ children }) => (
    <ol className="list-decimal list-outside ml-5 mb-4 space-y-1 text-sm text-gray-700 dark:text-gray-300">{children}</ol>
  ),
  li: ({ children }) => (
    <li className="leading-relaxed pl-1">{children}</li>
  ),
  a: ({ href, children }) => (
    <a href={href} target="_blank" rel="noreferrer" className="text-primary-600 dark:text-primary-400 hover:underline">
      {children}
    </a>
  ),
  code: ({ inline, children }) =>
    inline ? (
      <code className="px-1.5 py-0.5 bg-gray-100 dark:bg-gray-800 text-sm font-mono rounded text-primary-700 dark:text-primary-300">
        {children}
      </code>
    ) : (
      <code className="text-gray-100 text-sm font-mono">{children}</code>
    ),
  pre: ({ children }) => (
    <pre className="bg-gray-900 dark:bg-black text-gray-100 rounded-xl px-5 py-4 overflow-x-auto text-sm font-mono mb-5 border border-gray-800 leading-relaxed">
      {children}
    </pre>
  ),
  img: ({ src, alt }) => (
    <img src={src} alt={alt || ''} className="max-w-full rounded-xl my-4 border border-gray-200 dark:border-gray-700 shadow-sm" />
  ),
  blockquote: ({ children }) => (
    <blockquote className="border-l-4 border-primary-500 pl-4 py-1 my-4 text-gray-500 dark:text-gray-400 italic">
      {children}
    </blockquote>
  ),
  hr: () => <hr className="border-gray-200 dark:border-gray-800 my-8" />,
  strong: ({ children }) => (
    <strong className="font-semibold text-gray-900 dark:text-white">{children}</strong>
  ),
};

function PluginDoc() {
  const [pageContent, setPageContent] = useState("");
  const [error, setError] = useState(false);

  const pathName = window.location.pathname.substring(1);
  const pluginKey = pathName.replace("/", "-");
  const pluginInfo = data.plugins[pluginKey];

  document.title = pluginInfo
    ? pluginInfo.name + " Plugin – Scott H Tech"
    : "Plugin Not Found – Scott H Tech";

  useEffect(() => {
    if (!pluginInfo) {
      setError(true);
      return;
    }
    const ext = pluginInfo.legacyFormat ? ".htm" : ".md";
    fetch(require('../pluginDocs/' + pluginKey + ext))
      .then(r => r.text())
      .then(setPageContent)
      .catch(() => setError(true));
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-950">
      <NavBar />
      <div className="max-w-3xl mx-auto w-full px-4 py-10 flex-1">
        <Link
          to="/plugins"
          className="inline-flex items-center gap-1 text-sm text-gray-500 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors mb-6"
        >
          ← All Plugins
        </Link>

        {error ? (
          <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 shadow-sm p-10 text-center">
            <h1 className="text-xl font-bold text-gray-900 dark:text-white mb-3">Plugin Not Found</h1>
            <Link to="/plugins" className="text-primary-600 dark:text-primary-400 hover:underline text-sm">
              Browse all plugins →
            </Link>
          </div>
        ) : (
          <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 shadow-sm">
            {/* Header */}
            {pluginInfo && (
              <div className="px-8 pt-8 pb-6 border-b border-gray-100 dark:border-gray-800">
                <span className="text-xs font-semibold text-primary-600 dark:text-primary-400 uppercase tracking-wider">
                  Solar2D Plugin
                </span>
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white mt-1">
                  {pluginInfo.name}
                </h1>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                  {pluginInfo.category}
                </p>
              </div>
            )}

            {/* Content */}
            <div className="px-8 py-8">
              {pageContent ? (
                <ReactMarkdown components={mdComponents} allowElement={() => true}>
                  {pageContent}
                </ReactMarkdown>
              ) : (
                <p className="text-sm text-gray-400 dark:text-gray-600 animate-pulse">Loading...</p>
              )}
            </div>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
}

export default PluginDoc;
