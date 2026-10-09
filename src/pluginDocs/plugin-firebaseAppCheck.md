# Firebase App Check Plugin

This plugin adds [Firebase App Check](https://firebase.google.com/docs/app-check) to your Solar2D app on iOS (15+) / macOS, Android (5.0+), Web / HTML5, and Windows / Linux builds. App Check proves that requests to your Firebase backend (Firestore, Realtime Database, Cloud Storage, Cloud Functions, Firebase AI Logic) come from your real, untampered app. Once initialized, the other Firebase plugins attach App Check tokens automatically; you can also fetch tokens yourself and send them to your own server in the `X-Firebase-AppCheck` header.

> **Note**: Starting November 2, 2026 Firebase requires App Check for Firebase AI Logic, and enforcement is on by default for new Firebase AI Logic setups.

### Providers by platform

| Platform | `provider = "auto"` | Also available |
| --- | --- | --- |
| iOS / macOS | `deviceCheck` | `appAttest` (falls back to DeviceCheck on older OS), `debug` |
| Android | `playIntegrity` | `debug` |
| Web / HTML5 | `recaptchaEnterprise` (when `siteKey` is given) | `recaptchaV3`, `debug` |
| Solar2D Simulator (macOS) | `debug` | |
| Windows / Linux builds, Windows Simulator | `debug` (pure Lua) | `custom` (your backend mints tokens) |

The `debug` provider is for development, CI and the Simulator only. Never ship a release build with `provider = "debug"`.

### Functions:

#### firebaseAppCheck.init(options)
Initialize App Check. Call it **before** the `init()` of any other Firebase plugin, so the provider is registered before the first Firebase request. It configures the default Firebase app from `GoogleService-Info.plist` / `google-services.json` when no other plugin has done that yet.

- options.provider (string) — `"auto"` (default), `"deviceCheck"`, `"appAttest"`, `"playIntegrity"`, `"recaptchaEnterprise"`, `"recaptchaV3"`, `"debug"` or `"custom"`. Names that don't exist on the current platform fall back to that platform's default.
- options.debugToken (string) — optional. With the debug provider, use this token instead of a generated one so a token you registered once in the Firebase console keeps working (all platforms).
- options.autoRefresh (boolean) — optional. Enables or disables automatic token refresh.
- options.listener (function) — optional. Receives `phase = "init"` once, then `phase = "tokenChanged"` every time the SDK refreshes the token.
- options.siteKey (string) — Web only. reCAPTCHA Enterprise or reCAPTCHA v3 site key.
- options.firebaseConfig (table) — Web only. Firebase web config from the console (same table you pass to `firebaseAnalytics.init()`).
- options.tokenUrl (string) — Windows / Linux, `custom` provider. Your backend endpoint. The plugin POSTs JSON `{ appId, projectId, limitedUse, ...tokenRequestBody }` and expects `{ token, ttl }` (`ttl` as `"3600s"`, or `ttlMillis`, `expiresIn` seconds or `expiresAt` Unix seconds).
- options.tokenRequestBody (table) — optional extra fields sent to `tokenUrl`, for example the proof your backend checks.
- options.tokenRequestHeaders (table) — optional extra HTTP headers for `tokenUrl`.
- options.tokenProvider (function) — Windows / Linux, alternative to `tokenUrl`. Called as `tokenProvider( callback, context )`; call `callback( { token = ..., ttl = "3600s" } )` or `callback( { isError = true, error = "..." } )`.

#### firebaseAppCheck.getToken(listener [, forceRefresh])
Fetch the current App Check token (cached by the SDK until it is about to expire).

- listener (function) — receives one event with `phase = "token"`.
- forceRefresh (boolean) — optional, request a brand new token.

#### firebaseAppCheck.getLimitedUseToken(listener)
Fetch a limited-use token for backends that use replay protection. Not cached.

- listener (function) — receives one event with `phase = "limitedUseToken"`.

#### firebaseAppCheck.setAutoRefreshEnabled(enabled)
- enabled (boolean)

#### firebaseAppCheck.getDebugToken()
Returns the local debug token (string) or `nil`. Register it in the Firebase console under **App Check > Apps > Manage debug tokens**.

#### firebaseAppCheck.getProvider()
Returns the provider in use (string) or `nil` before `init()` has completed.

#### firebaseAppCheck.isSupported()
Returns `true` where tokens can be produced.

### Events:

- event.name (string) — `"firebaseAppCheck"`
- event.phase (string) — `"init"`, `"tokenChanged"`, `"token"` or `"limitedUseToken"`
- event.provider (string) — provider in use
- event.isError (boolean)
- event.error (string) — error message when `isError` is true
- event.errorCode (number) — iOS/macOS only, Firebase error code when available
- event.token (string) — the App Check token
- event.expiration (number) — token expiration as a Unix timestamp in seconds
- event.debugToken (string) — `init` only, present when the debug provider is used
- event.isSimulator (boolean) — `init` only

### Setup:

1. In the Firebase console open **App Check** and register each app: iOS/macOS with DeviceCheck (upload a DeviceCheck private key) or App Attest (add the entitlement below), Android with Play Integrity (the SHA-256 fingerprint of your signing key must be in the project; Play Integrity only attests apps installed from Google Play, use the debug provider for local builds), Web with a reCAPTCHA Enterprise site key.
2. Put `GoogleService-Info.plist` and `google-services.json` in the root folder of your project and set `useGoogleServicesJson = true` for Android, like the other Firebase plugins.
3. For development builds and the Simulator use the debug provider: run the app once, copy the printed debug token (also available through `firebaseAppCheck.getDebugToken()` and the `init` event) and add it under **Manage debug tokens**. Pass it back through `options.debugToken` so every machine uses the same token.
4. When ready, switch enforcement on for each Firebase service in the App Check console page.

On macOS (Solar2D Simulator and macOS builds) the plugin package contains `libFirebaseRuntime.dylib`, a Firebase runtime shared with the other tech.scotth Firebase plugins such as Firebase AI Logic; keep those plugins on the same release.

Windows and Linux builds have no attestation provider (Google has none for desktop). Use the debug provider while developing and the `custom` provider for shipping: your backend mints App Check tokens with the Firebase Admin SDK and the plugin fetches them from `tokenUrl`. A ready-made Cloud Function is included in the plugin repository under `backend/`.

### Build Settings:

```lua
settings =
{
	android =
	{
		useGoogleServicesJson = true,
	},
	iphone =
	{
		-- Only when using provider = "appAttest":
		entitlements =
		{
			["com.apple.developer.devicecheck.appattest-environment"] = "production",
		},
	},
	plugins = {
		["plugin.firebaseAppCheck"] =
		{
			publisherId = "tech.scotth",
			marketplaceId = "insert marketplace account ID",
		},
	},
}
```

### Example:

```lua
local appCheck = require( "plugin.firebaseAppCheck" )

appCheck.init( {
	provider = "auto",
	listener = function( event )
		if event.isError then
			print( "App Check " .. event.phase .. " failed: " .. event.error )
		elseif event.phase == "init" and event.debugToken then
			print( "Register this debug token in the Firebase console: " .. event.debugToken )
		end
	end,
} )

-- Other Firebase plugins go after appCheck.init():
-- firebaseAnalytics.init()

appCheck.getToken( function( event )
	if not event.isError then
		network.request( "https://example.com/api", "GET", print, {
			headers = { ["X-Firebase-AppCheck"] = event.token },
		} )
	end
end )
```

##### Helpful Links:
- [Get Plugin](https://solar2dmarketplace.com/plugins?FirebaseAppCheck_tech-scotth)
- [Firebase App Check docs](https://firebase.google.com/docs/app-check)
- [Support](https://forums.solar2d.com/c/corona-marketplace/13)
