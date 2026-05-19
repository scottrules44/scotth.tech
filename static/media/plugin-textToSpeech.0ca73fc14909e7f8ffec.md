# Text To Speech plugin

This plugin allows your application to speak to a user via native text to speech api on iOS and Android

### Platforms:
only works with iOS 7+ and Android 5+

### Functions:

#### textToSpeech.init(listener, engineChoice)

- `listener` (function)(required) — receives `textToSpeech` events. `event.phase` is one of:
  - `"init"` — fired once the plugin is ready to speak.
  - `"started"` — fired when an utterance begins playing (each call to `speak`).
  - `"finished"` — fired when the current utterance has finished playing.
- `engineChoice` (string)(optional, Android only) — package name of the TTS engine to use, e.g. `"com.google.android.tts"`. Ignored on iOS.

```lua
textToSpeech.init(function (e)
    print(json.encode(e))
end)
```

#### textToSpeech.speak(textToSpeak, options)

- `textToSpeak` (string) — text to speak to the user.
- `options` (table)(optional) — table of keys controlling how the text is spoken. All keys are optional.

`options` keys:

- `rate` (number) — speed of speech. `1.0` is roughly normal speed on both platforms. Below `1.0` is slower, above `1.0` is faster. Default is `1.0` when omitted.
  - **iOS:** scaled non-linearly. `~1.12` matches the system default exactly; `~1.6` and above clamps to maximum.
  - **Android:** linear. `2.0` is twice as fast, `0.5` is half-speed. Must be greater than `0`.
- `pitch` (number) — pitch multiplier. `1.0` is the voice's normal pitch, below `1.0` is deeper, above `1.0` is higher. Default is `1.0` when omitted. Typical usable range is `0.5`–`2.0` on both platforms (iOS clamps outside this range; Android requires greater than `0`).
- `volume` (number) — `0.0` (silent) to `1.0` (full volume). Default `1.0` when omitted.
- `language` (string) — ISO 639 alpha-2 or alpha-3 language code (e.g. `"en"` for English, `"ja"` for Japanese). Defaults to the user's device language. On iOS, if `voice` is also set, `voice` overrides `language`.
- `voice` (string) — identifier of a specific voice to use. Pass the `id` value returned by [`textToSpeech.getVoices()`](#texttospeechgetvoices) on the **same platform** — iOS and Android voice IDs are not interchangeable.
  - iOS IDs look like `"com.apple.voice.compact.en-US.Samantha"` (AVSpeechSynthesisVoice identifier).
  - Android IDs look like `"en-us-x-sfg#female_1-local"` (Voice name).

```lua
textToSpeech.speak("Hello World, how you doing?", {volume=0.8, rate=1.0, pitch=1.0, language="en"})
```

#### textToSpeech.stop([finishCurrentWord])
Stops the current speech.

- `finishCurrentWord` (boolean)(optional)(iOS only) — if `true`, finishes speaking the current word before stopping. If `false` or omitted, stops immediately mid-word. Ignored on Android.

```lua
textToSpeech.stop()           -- stop immediately
textToSpeech.stop(true)       -- iOS: finish current word, then stop
```

#### textToSpeech.pause([finishCurrentWord])
Pauses the current speech.

- `finishCurrentWord` (boolean)(optional)(iOS only) — if `true`, finishes the current word before pausing. If `false` or omitted, pauses immediately mid-word.

**Note:** On Android there is no true pause — this calls the native `stop()`, so it behaves the same as `textToSpeech.stop()`.

```lua
textToSpeech.pause()
```

#### textToSpeech.resume()
Resumes after `pause()`.

- **iOS:** continues from where speech was paused.
- **Android:** because `pause()` stops the engine, `resume()` re-speaks the current sentence chunk from the beginning. (The input is split internally on `, . : ; ! ? \n`, and resume restarts the chunk currently in progress.) Only available on Android 5.0+.

```lua
textToSpeech.resume()
```

#### textToSpeech.getVoices()
Returns an array of voices available on the device. Each entry is a table with:

- `id` (string) — the voice identifier. Pass this as the `voice` option in `textToSpeech.speak()`. The format differs per platform (see `voice` in `speak`).
- `language` (string) — the language/locale the voice speaks (e.g. `"en-US"`).

On Android, this returns an empty result on devices below Android 5.0 (Lollipop).

```lua
print(json.encode(textToSpeech.getVoices()))
```

#### textToSpeech.isSpeaking()
Returns a boolean — `true` if the engine is currently speaking, `false` otherwise.

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
