# Bass Boost

Bass boost is an audio effect to boost or amplify low frequencies of the sound. It is comparable to a simple equalizer but limited to one band amplification in the low frequency range.

### Platforms:
Android

### Functions:

#### bassBoost.init(priorityLevel, audioSession)
priorityLevel — the priority level requested by the application for controlling the BassBoost engine. The normal priority is 0, above normal is a positive number, below normal is a negative number.

audioSession — system-wide unique audio session identifier. The BassBoost will be attached to the MediaPlayer or AudioTrack in the same audio session.

#### bassBoost.isStrengthSupported()
Indicates whether setting strength is supported.

#### bassBoost.getRoundedStrength()
Gets the current strength of the effect.

#### bassBoost.setStrength()
Sets the strength of the bass boost effect.

### Build Settings:

[View Example on GitHub Gist](https://gist.github.com/scottrules44/fb4cf2f4c33a2a40c3e2e7fdb92c3cef)

##### Helpful Links:
- [Example](https://github.com/scottrules44/bassBoost-demo)
- [Support](https://forums.solar2d.com/c/corona-marketplace/13)
