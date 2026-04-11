import React from 'react';

function AppViewer({ appStore, googlePlay, webLink }) {
  if (!appStore && !googlePlay && !webLink) return null;
  return (
    <div className="flex flex-row flex-wrap gap-3 mt-4">
      {appStore && (
        <a target="_blank" rel="noreferrer" href={appStore}>
          <img alt="Download on the App Store" src={require('../assets/appStore.png')} width={150} height={44} className="h-11 w-auto" />
        </a>
      )}
      {googlePlay && (
        <a target="_blank" rel="noreferrer" href={googlePlay}>
          <img alt="Get it on Google Play" src={require('../assets/googlePlay.png')} width={150} height={44} className="h-11 w-auto" />
        </a>
      )}
      {webLink && (
        <a
          target="_blank"
          rel="noreferrer"
          href={webLink}
          className="inline-flex items-center px-4 py-2 bg-primary-600 text-white text-sm font-semibold rounded-lg hover:bg-primary-700 transition-colors"
        >
          Visit Website →
        </a>
      )}
    </div>
  );
}

export default AppViewer;
