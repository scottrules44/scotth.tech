# Equalizer Plugin

The Equalizer Plugin allows you to alter the frequency response of a particular music source or of the main output mix.

### Platforms:
Android

### Functions:

#### equalizer.initEqualizer(priorityLevel, audioSession)
Initialize the Equalizer engine. The priority level indicates how much control the application needs over effect parameters (normal priority is `0`, above normal is a positive number, below normal is a negative number). For audio session, `0` is recommended.

- `priorityLevel` (number)
- `audioSession` (number)

#### equalizer.getBandLevelRange()
Gets the level range for a band. Returns two integers: min and max.

#### equalizer.getNumberOfBands()
Gets the number of frequency bands supported by the Equalizer engine.

#### equalizer.getBandFreqRange(band)
Gets the frequency range of the given frequency band.

- `band` (number)

#### equalizer.getCenterFreq(band)
Gets the center frequency of the given band.

- `band` (number)

#### equalizer.setBandLevel(band, level)
Sets the given equalizer band to the given gain value.

- `band` (number)
- `level` (number)

#### equalizer.getBandLevel(band)
Gets the gain set for the given equalizer band.

- `band` (number)

#### equalizer.initReverb(priorityLevel, audioSession)
Initialize the PresetReverb engine. The priority level indicates how much control the application needs over effect parameters (normal priority is `0`, above normal is a positive number, below normal is a negative number). For audio session, `0` is recommended.

- `priorityLevel` (number)
- `audioSession` (number)

#### equalizer.setReverb(preset)
Enables a preset (a number) on the reverb.

- `preset` (number)

#### equalizer.getReverb()
Gets the current reverb preset.

### Build Settings:

```lua
settings =
{
    plugins =
    {
        ["plugin.equalizer"] =
        {
            publisherId = "tech.scotth",
            marketplaceId = "insert marketplace account ID",
        },
    },
    android =
    {
        usesPermissions =
        {
            "android.permission.MODIFY_AUDIO_SETTINGS",
        },
    },
}
```

[View Example on GitHub Gist](https://gist.github.com/scottrules44/c7e027eb7d703b2a59e239d50a8dbb0a)

##### Helpful Links:
- [Get Plugin](https://solar2dmarketplace.com/plugins?EqualizerPlugin_tech-scotth)
- [Example](https://github.com/scottrules44/equalizer-demo)
- [Support](https://forums.solar2d.com/c/corona-marketplace/13)
