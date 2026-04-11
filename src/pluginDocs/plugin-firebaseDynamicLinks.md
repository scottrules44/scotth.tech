# Firebase Dynamic Links Plugin

This plugin allows you to create short or long Dynamic Links with Firebase Dynamic Links for iOS (8+) and Android (5.0+).

### Functions:

#### firebaseDynamicLinks.init()
Initialize Firebase Dynamic Links.

#### firebaseDynamicLinks.shortenURL(url, listener)
Used to generate a shortened Dynamic Link URL.

- url (string) — URL to shorten
- listener (function) — returned values:
  - event.url (string)
  - event.isError (boolean)
  - event.error (string)

#### firebaseDynamicLinks.buildUrl(params)
Returns a URL with params.

- params (table) — params to pass in:
  - domain = string, (required) Your Dynamic Link URL prefix, which you can find in the Firebase console. A Dynamic Link domain looks like: `https://example.com/link` or `https://example.page.link`
  - link = string, (required) The link your app will open. Specify a URL that your app can handle, typically the app's content or payload, which initiates app-specific logic
  - **iOS Params**
  - iOSBundleID = string, (required for passing in iOS specific params) your app bundle id example: `com.example.ios`
  - iOSAppStoreID = string — Your app's App Store ID, used to send users to the App Store when the app isn't installed
  - iOSCustomScheme = string — Your app's custom URL scheme, if defined to be something other than your app's bundle ID
  - iOSFallbackURL = string — The link to open when the app isn't installed. Specify this to do something other than install your app from the App Store when the app isn't installed, such as open the mobile web version of the content, or display a promotional page for your app
  - iPadBundleID = string — The bundle ID of the iOS app to use on iPads to open the link. The app must be connected to your project from the Overview page of the Firebase console.
  - iPadFallbackURL = string — The link to open on iPads when the app isn't installed. Specify this to do something other than install your app from the App Store when the app isn't installed, such as open the web version of the content, or display a promotional page for your app.
  - iOSMinimumAppVersion = string — The version number of the minimum version of your app that can open the link. This flag is passed to your app when it is opened, and your app must decide what to do with it.
  - **Android Params**
  - androidPackageName = string — Android Package Name for linking
  - androidMinimumAppVersion = string — The versionCode of the minimum version of your app that can open the link. If the installed app is an older version, the user is taken to the Play Store to upgrade the app.
  - androidFallbackURL = string — The link to open when the app isn't installed. Specify this to do something other than install your app from the Play Store when the app isn't installed, such as open the mobile web version of the content, or display a promotional page for your app
  - **Analytics Params**
  - analyticsCampaign = string
  - analyticsMedium = string
  - analyticsSource = string
  - analyticsTerm = string
  - analyticsContent = string
  - **iTunesConnect Params**
  - iTunesConnectAffiliateToken = string
  - iTunesConnectCampaignToken = string
  - iTunesConnectProviderToken = string
  - **SocialMetaTag Params**
  - socialMetaTagTitle = string — the title to use when the Dynamic Link is shared in a social post
  - socialMetaTagDescriptionText = string — the description to use when the Dynamic Link is shared in a social post
  - socialMetaTagImageURL = string — the URL to an image related to this link. The image should be at least 300x200 px, and less than 300 KB
  - **Other Params**
  - navigationInfoForcedRedirectEnabled = boolean — if true, skip the app preview page when the Dynamic Link is opened, and instead redirect to the app or store. The app preview page (enabled by default) can more reliably send users to the most appropriate destination when they open Dynamic Links in apps
  - otherPlatformFallbackUrl = string — fallback URL

### Runtime Events:

- event.name = "firebaseDynamicLinks"
- event.url (string)
- event.minimumAppVersion (string)
- event.matchType (string) — "none", "weak", "unique", or "default"

```lua
local json = require "json"
Runtime:addEventListener("firebaseDynamicLinks", function(event)
	print(json.encode(e))
end)
```

### Setup:

Make sure you download and include `GoogleServices-Info.plist` and put it in the root folder of your Corona project. Also add your `google-services.json` to your root folder and set `useGoogleServicesJson = true` in build.settings. Also add `google_app_id` (App ID) string to the android section (see example below).

![](/pluginDocs/projectSettings.png)

![](/pluginDocs/androidJson.png)

![](/pluginDocs/iosPlist.png)

### Build Settings:

```lua
settings =
{
	android =
	{
		useGoogleServicesJson = true,
		manifestChildElements =
		{
			-- Array of strings
			[[
			<intent-filter>
				<action android:name="android.intent.action.VIEW"/>
				<category android:name="android.intent.category.DEFAULT"/>
				<category android:name="android.intent.category.BROWSABLE"/>
				<data
				    android:host="coronaplugin.page.link"
				    android:scheme="https"/>
			</intent-filter>
			]],
			--replace coronaplugin.page.link with your own link
		},
	},
	iphone =
	{
		entitlements = {
			["com.apple.developer.associated-domains"] = {"applinks:coronaplugin.page.link"},-- replace coronaplugin.page.link with your own firebase url
		}
		plist =
		{
			FirebaseAppDelegateProxyEnabled = false,
			CFBundleURLTypes ={ { CFBundleURLSchemes = { "iOSCustomScheme", "com.example.yourBundleIdHere" } }},
		},
	},
	plugins =
	{
		["plugin.firebaseDynamicLinks"] = {
			publisherId = "tech.scotth",
			marketplaceId = "(replace with Account ID in account page)",
		},
	},
}
```

### Common Mistakes:

If you get a page with "Invalid Dynamic Link" make sure the "link" you specify is in your domain's "Allowlist URL pattern" i.e `https://example.com` or `^https://example.com.*$` (allows subpages).

Using a custom domain? See [this link](https://firebase.google.com/docs/dynamic-links/custom-domains?hl=en&authuser=0).

##### Helpful Links:
- [Get Plugin](https://solar2dmarketplace.com/plugins?FirebaseDynamicLinks_tech-scotth)
- [Example](https://github.com/scottrules44/firebaseDynamicLinks-demo)
- [Support](https://forums.solar2d.com/c/corona-marketplace/13)
