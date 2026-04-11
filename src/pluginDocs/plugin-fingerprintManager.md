# Fingerprint Manager Plugin

This plugin allows you detect registered fingerprints from the sensor on Android. Note no UI is shown, so you need to handle this yourself.

### Platforms:
This plugin only works with Android 6.0+ (API 23) and Up

### Functions:

#### fingerprintManager.sensorStatus()
(returns string) — used to determine if device has a fingerprint and is enabled

- "does not have a fingerprint sensor"
- "lock screen security not enabled in settings"
- "does not have a fingerprint registered"
- "has access"

#### fingerprintManager.detect(listener)
Activate fingerprint detection.

listener, event.response (string)

- "does not have a fingerprint sensor"
- "lock screen security not enabled in settings"
- "does not have a fingerprint registered"
- "fingerprint authentication succeeded"
- "fingerprint authentication failed"
- "advice for authentication:"..authentication advice here
- "error:"..error

#### fingerprintManager.cancel()
Cancel fingerprint detection.

### Build Settings:

```lua
settings =
{
	plugins = {
		["plugin.fingerprintManager"] =
		{
			publisherId = "tech.scotth",
			marketplaceId = "insert marketplace account ID",
		},
	}
}
```

##### Helpful Links:
- [Example](https://github.com/scottrules44/fingerprintManager-demo)
- [Support](https://forums.solar2d.com/c/corona-marketplace/13)
- [Get the Plugin](https://solar2dmarketplace.com/plugins?FingerprintManager_tech-scotth)
