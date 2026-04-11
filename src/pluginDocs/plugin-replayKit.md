# Replay Kit

This plugin uses the [Replay Kit](https://developer.apple.com/reference/replaykit) framework which requires iOS 9+ for recording and iOS 10+ for broadcasting (tvOS requires 10+ for both). For Android recording, it is built into the [gpgs plugin](https://docs.coronalabs.com/plugin/gpgs/videos/index.html) Corona made. Note: all system events (like notifications and other app music) are not recorded. Speed and quality are based on device and networking speeds.

### Limitations:
Only works on iOS, tvOS and not the iOS or tvOS simulator. Also you cannot access microphone on tvOS.

### Functions:

---

### Recording — iOS 9+ and tvOS 10+
Please note the app does not have access to the video file.

#### replayKit.record(listener)
listener (function)(required) — returns event.response which could contain the following strings:
- "could not start recording"
- "recording started"

#### replayKit.cacheRecording(listener)
listener (function)(required) — returns event.response which could contain the following strings:
- "cached video"
- "sharing video"

#### replayKit.showCacheRecording()
Returns strings "showing" or "nothing cached".

#### replayKit.stopRecording(listener)
listener (function)(required) — returns event.response which could contain the following strings:
- "could not stop"
- "sharing video"

#### replayKit.cancelRecording(listener)
listener (function)(required) — returns event.response which could contain the following strings:
- "could not cancel"
- "recording canceled"
- "recording recycled"

#### replayKit.recordingScreen()
Returns boolean — true = screen being recorded, false = screen not being recorded.

#### replayKit.usingMicrophoneForRecording()
Returns boolean — true = mic being used for recording, false = mic not being used for recording.

#### replayKit.availableToRecord()
Returns boolean — true = you can record screen, false = you cannot record screen.

---

### Broadcasting — iOS 10+
Used with apps such as Mobcrush. Should work the same for other broadcasting apps.

#### replayKit.setBroadcastingOptions(micOn)
micOn (boolean)(optional) — this will allow users to talk during the broadcasting. Default is false.

#### replayKit.startBroadcasting(listener)
listener (function)(required) — returns event.response which could contain the following strings:
- "showing stream picker"
- "unable to show stream picker"
- "we are live"
- "error loading stream"
- "error while broadcasting"

#### replayKit.stopBroadcasting(listener)
listener (function)(required) — returns event.response which could contain the following strings:
- "unable to stop broadcasting"
- "broadcast stopped"

#### replayKit.pauseBroadcasting()
Returns string which could be:
- "not broadcasting"
- "broadcast already paused"
- "broadcast paused"

#### replayKit.resumeBroadcasting()
Returns string which could be:
- "not broadcasting"
- "already broadcasting"
- "resume broadcasting"

#### replayKit.broadcastIsPaused()
Returns boolean — true = broadcast is paused, false = broadcast is not paused.

#### replayKit.getBroadcastingUrl()
Returns string — the url of the broadcast (nil if there is not one).

### Build Settings:

```lua
settings =
{
    iphone =
    {
        plist =
        {
            NSMicrophoneUsageDescription = "Testing",
        },
    },
    plugins =
    {
        ["plugin.replayKit"] =
        {
            publisherId = "tech.scotth",
            marketplaceId = "insert marketplace account ID",
        },
    }
}
```

##### Helpful Links:
- [Get Plugin](https://solar2dmarketplace.com/plugins?ReplayKit_tech-scotth)
- [Example](https://github.com/scottrules44/replaykit-demo)
- [Support](https://forums.solar2d.com/c/corona-marketplace/13)
