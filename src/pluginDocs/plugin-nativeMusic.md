# Native Music Plugin

This plugin handles playback controls and creates native music APIs for a platform.

### Limitations:
Only works on iOS, tvOS, and macOS.

### Functions:

#### nativeAudio.init(controlCallback)
Sets up control callbacks (remote events from control center and headphones).

Note: The Native Audio Plugin handles all control events automatically — e.g. when the pause button is pressed from an external source, the player will pause automatically.

controlCallback (function)(required) — triggers event.status which can be:
- "playPause" — triggered from play/pause button (e.g. headphones)
- "pause"
- "play"
- "nextTrack" — triggered from skip button
- "previousTrack"
- "songEnded" — triggered when song ends naturally (not from hitting skip button)

#### nativeAudio.newTrack(fileParams)
Returns a track object.

### Build Settings:

[View Example on GitHub Gist](https://gist.github.com/scottrules44/5de9f30829dc6463b41b93baac7153c0)

##### Helpful Links:
- [Get Plugin](https://solar2dmarketplace.com/plugins?VideoShare_tech-scotth)
- [Example](https://github.com/scottrules44/videoShare-demo)
- [Support](https://forums.solar2d.com/c/corona-marketplace/13)
