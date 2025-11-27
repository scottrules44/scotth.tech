# Text To Speech plugin

This plugin allows your application to speak to a user via native text to speech api on iOS and Android

### Platforms:
only works with iOS 7+ and Android 5+

### Functions:

#### textToSpeech.init(listener, engineChoice)

listener (required)
- event.phase
  - "started"
  - "init"
  - "finished"

engineChoice (optional android only) String
- Package name of the TTS engine to use. i.e "com.google.android.tts"

```lua
textToSpeech.init(function (e)
 print(json.encode(e))
 end)
```

#### textToSpeech.speak(textToSpeak, options)

textToSpeak(string) text to speak to user

options(table)(optional) can put key values{rate= (number)rate of speech, language=(string) language of speech(default is users default language, takes ISO 639 alpha-2 or alpha-3 language code i.e en = "english" and "ja" is Japanese), voice=(string), pitch=(number), volume=(number) default is 1 }

```lua
textToSpeech.speak("Hello World, how you doing?", {volume=.8, rate=.5, language="en"})
```

#### textToSpeech.stop()
stop .speak

```lua
textToSpeech.stop()
```

#### textToSpeech.pause()
pause .speak

```lua
textToSpeech.pause()
```

#### textToSpeech.resume()
resume .pause

```lua
textToSpeech.resume()
```

#### textToSpeech.getVoices()
returns array of key values {{id=(string) identifier voice option in .speak, language=(string) voice language}}

```lua
print(json.encode(textToSpeech.getVoices()))
```

#### textToSpeech.isSpeaking()
returns boolean

```lua
print(textToSpeech.isSpeaking())
```

### Build Settings:

```lua
settings =
{
 plugins =
 {
 ["plugin.textToSpeech"] =
 {
 publisherId="tech.scotth",
 marketplaceId = "insert marketplace account ID",
 },
 },
}
```

##### Helpful Links:
- [Get plugin](https://solar2dmarketplace.com/plugins?TextToSpeech_tech-scotth)
- [Example](https://github.com/scottrules44/textToSpeech-demo)
- [Support](https://forums.solar2d.com/c/corona-marketplace/13)
