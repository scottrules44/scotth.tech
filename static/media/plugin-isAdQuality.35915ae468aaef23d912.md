# Iron Source Ad Quality

This plugin enables users of [Iron Source Ad plugin](https://scotth.tech/plugin-ironSource) to use the [IS Ad Quality SDK](https://www.is.com/adquality/).

### Platforms:
iOS 10+ and Android 5+. Note: this plugin is separate from the regular IS ad plugin. This plugin does NOT show or control ads.

### Functions:

#### isAdQuality.init(listener, params)
listener (function) — triggers event.phase ("init"), event.error (string), and event.isError (boolean)

params (table) — supported keys:
- iOSAppKey (string)(optional but required for iOS) — IS iOS App Key
- androidAppKey (string)(optional but required for Android) — IS Android App Key
- logLevel (string)(optional) — can be "error", "warning", "debug", or "verbose"
- testMode (boolean)(optional)
- userId (string)(optional)

#### isAdQuality.setUserId(userId)
userId (string) — change user ID.

#### isAdQuality.setUserConsent(hasUserConsent)
hasUserConsent (boolean) — set GDPR consent.

### Build Settings:

```lua
settings =
{
	plugins= {
		["plugin.isAdQuality"] =
		{
			publisherId="tech.scotth",
			marketplaceId = "insert marketplace account ID",
		},
	},
}
```

##### Helpful Links:
- [Get Plugin](https://solar2dmarketplace.com/plugins?IronSourceAdQuality_tech-scotth)
- [Example](https://github.com/scottrules44/isAdQuality-demo)
- [Support](https://forums.solar2d.com/c/corona-marketplace/13)
