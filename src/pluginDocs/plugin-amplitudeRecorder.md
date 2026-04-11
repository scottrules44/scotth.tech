# Amplitude Recorder Plugin

This plugin allows you to record audio and get microphone amplitude.

### Limitations:
Only supports iOS (7+) and Android 6+

### Functions:

#### amplitudeRecorder.record(file, listener)
file (path)(required) — the path of where to save the file (files are saved as .m4a/MPEG4AAC)

listener (function)(optional) — status of recording
- event.status
  - "recording"
  - "permissionDenied"
  - "stopped"
  - "data"
- event.powerLevel (number)

#### amplitudeRecorder.stopRecording()
Stop recording audio and powerLevel.

### Build Settings:

```lua
settings =
{
    plugins =
    {
        ["plugin.amplitudeRecorder"] =
        {
            publisherId = "tech.scotth",
            marketplaceId = "insert marketplace account ID",
        },
    },
}
```

##### Helpful Links:
- [Get Plugin](https://solar2dmarketplace.com/plugins?AmplitudeRecorder_tech-scotth)
- [Example](https://github.com/scottrules44/amplitudeRecorderDemo)
- [Support](https://forums.solar2d.com/c/corona-marketplace/13)
