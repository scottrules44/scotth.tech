# Music Streaming

This plugin allows you to stream audio from a server.

### Limitations:
At this moment iOS (and simulator), macOS, Android (read gotchas), and tvOS are only supported. You can only play one stream at a time — use musicStreaming.stop() before playing another song. Trying to play two will cause an error and crash. You can only stream http:// and https:// urls with this plugin.

Gotchas: addToQueue does not work on Android.

Please note "not playing" means you have not called musicStreaming.play() first.

### Functions:

#### musicStreaming.init()
Sets things up.

#### musicStreaming.play(url, listener)
url (required)(string) — the url of the audio you would like to stream, e.g. "https://www.example.com/test1.mp3"
listener (required)(function) — lets you know when a song is started, finished, or there is an error. Possible event.response values:
- starting
- finished
- error loading song

#### musicStreaming.pause()
Returns string, values: "not playing", "already paused", or "pausing"

#### musicStreaming.stop()
Returns string, values: "not playing" or "stopped"

#### musicStreaming.resume()
Returns string, values: "not playing", "already playing", or "resume"

#### musicStreaming.getStatus()
Returns string, values: "not playing", "paused", "error" (rare), or "playing"

#### musicStreaming.getDuration()
Returns how long the song is.
Returns number (in milliseconds)

#### musicStreaming.getProgress()
Returns where we are in the song.
Returns number (in milliseconds)

#### musicStreaming.getVolume()
Returns number.

#### musicStreaming.setVolume(volume)
volume (required)(integer) — 0 = mute, 1 = loudest. Default is 1.

#### musicStreaming.addToQueue(url)
Allows you to play audio back to back without a gap. Note: on Android this has not been added due to technical limitations.

url (required)(string) — the url of the audio you would like to stream after the current song is finished, e.g. "https://www.example.com/test1.mp3"
Returns string, values: "not playing" or "added to queue"

#### musicStreaming.seek(seekNum)
seekNum (required)(integer) — where you would like to go in the song (in milliseconds)
Returns string, values: "not playing" or "seeking"

#### musicStreaming.checkAudio(url, listener)
Only works on iOS, tvOS, and macOS.

url (required)(string) — url to check
listener (required)(function) — returns strings:
- song found
- error loading song

### Background Play:

Android: Audio will play in the background by default. Please use [system events](https://coronalabs.com/blog/2012/05/15/handling-corona-system-events/) to .pause() the music on "applicationSuspend".

iOS: While there is a way on iOS, it is not officially supported by Corona. Use at your own risk. Example found [here](https://forums.coronalabs.com/topic/34435-streaming-audio-with-app-in-backgroundsuspended/).

### Build Settings Example:

[View Example on GitHub Gist](https://gist.github.com/scottrules44/222c73a48d8f1350fd2a6246e6ad9664)

### Credits:

[streaming kit](https://github.com/tumtumtum/StreamingKit) by Thong Nguyen was used for iOS, Mac, and tvOS.

### Build Settings:

```lua
settings =
{
    ["plugin.musicStreaming"] =
    {
        publisherId = "tech.scotth",
        marketplaceId = "insert marketplace account ID",
    },
}
```

##### Helpful Links:
- [Get Plugin](https://solar2dmarketplace.com/plugins?MusicStreaming_tech-scotth)
- [Example](https://github.com/scottrules44/musicStreamingDemo)
- [Support](https://forums.solar2d.com/c/corona-marketplace/13)
