# Voice to Text Plugin

This plugin allows you to get voice input from the microphone and convert it to text.

### Platforms:
iOS 10.0+ and Android 2.2+

### Limitations:
Requires internet access to convert voice to text. Android is "stopped" when a user stops speaking, whereas iOS continues until `.stopRecording()` is called.

### Functions:

#### voiceToText.init(listener)

listener (required) — callback with the following event properties:
- event.speech — the converted text
- event.response:
  - "started"
  - "error"
  - "stopped"

```lua
local voiceToText = require "plugin.voiceToText"
voiceToText.init(function(e)
    local json = require("json")
    if(e) then
        print("init")
        print("--------")
        print(json.prettify(e))
        print("--------")
    end
end)
```

#### voiceToText.startRecording(language, muteAllAudio, inputSilenceLength, inputMinimumLength, inputPossibleSilenceLength)

language (string)(optional) — the language for the recognizer to use. Not setting this will use the device's default settings. On Apple it is based on [this](https://developer.apple.com/library/content/documentation/MacOSX/Conceptual/BPInternational/LanguageandLocaleIDs/LanguageandLocaleIDs.html) and on Android [this](https://tools.ietf.org/html/bcp47). A recommended reference is [this](http://www.science.co.il/Language/Locale-codes.php). Example: "en-US".

muteAllAudio (boolean)(optional) — Android only. Mutes audio while recording. Note: this will also mute Google Now voice alerts.

inputSilenceLength (number, in milliseconds)(optional) — Android only. The amount of time after speech stops before considering the input complete.

inputMinimumLength (number, in milliseconds)(optional) — Android only. The minimum length of an utterance. Recording will not stop before this amount of time.

inputPossibleSilenceLength (number, in milliseconds)(optional) — The amount of time after speech stops before considering the input possibly complete.

```lua
voiceToText.startRecording()
```

#### voiceToText.stopRecording()

Stops recording.

```lua
voiceToText.stopRecording()
```

#### voiceToText.isRecording()

Returns a boolean — true if recording, false if not recording.

```lua
print(voiceToText.isRecording())
```

### Build Settings:

```lua
settings =
{
    iphone =
    {
        plist =
        {
            NSMicrophoneUsageDescription = "testing",
            NSSpeechRecognitionUsageDescription = "Speech recognition will be used to determine which words you speak into this device's microphone.",
        },
    },
    android =
    {
        minSdkVersion = "16",
        usesPermissions =
        {
            "android.permission.INTERNET",
            "android.permission.RECORD_AUDIO",
        },
    },
    plugins = {
        ["plugin.voiceToText"] =
        {
            publisherId = "tech.scotth",
            marketplaceId = "insert marketplace account ID",
        },
    }
}
```

##### Helpful Links:
- [Get Plugin](https://solar2dmarketplace.com/plugins?VoiceToText_tech-scotth)
- [Example](https://github.com/scottrules44/voiceToText-Demo)
- [Support](https://forums.solar2d.com/c/corona-marketplace/13)
