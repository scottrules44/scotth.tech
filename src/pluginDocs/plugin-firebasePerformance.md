# Firebase Performance Plugin

This plugin adds [Firebase Performance Monitoring](https://firebase.google.com/docs/perf-mon) to your Solar2D app on iOS (15+), Android (6.0+), Web / HTML5, and Windows / Linux / macOS builds and the Solar2D Simulator. Measure how long anything in your app takes — a level load, a save, a network request — with custom traces, counters and attributes, and read the results in the Firebase console.

### Platform support

| Platform | Firebase SDK | Traces reach Firebase |
| --- | --- | --- |
| iOS device and Simulator (arm64 + x86_64) | Firebase Apple 12.18.0 | yes, plus automatic app-start, screen and network traces |
| Android | Firebase BoM 34.18.0 (`firebase-perf`) | yes, plus automatic app-start and screen traces |
| Web / HTML5 | Firebase JS 12.18.0 | yes, plus automatic page-load and network traces (needs a Web app id) |
| Windows / Linux / macOS builds, Solar2D Simulator | none (pure Lua) | measured locally; uploaded best effort or to your own backend |

Google ships Performance Monitoring for iOS, Android and the web only, so Windows, Linux, macOS and the Simulator run a pure-Lua implementation with the same API. See the Desktop section below.

### Functions:

#### firebasePerformance.init(options)
Initialize Firebase Performance. Everything in `options` is optional.

- options.appId, options.projectId, options.apiKey (string) — override the values read from `google-services.json` / `GoogleService-Info.plist`. On Web, pass the `appId` of your Firebase **Web** app.
- options.dataCollectionEnabled (boolean) — iOS and Web. Turn collection on or off at startup.
- options.instrumentationEnabled (boolean) — iOS and Web. Turn the SDK's automatic traces on or off.
- options.upload (string or boolean) — Windows / Linux / macOS / Simulator. `"auto"` (default), `true` or `false`. See Desktop below.
- options.uploadUrl (string) — Windows / Linux / macOS / Simulator. POST finished traces to your own backend instead of Firebase.
- options.uploadHeaders (table) — extra HTTP headers for `uploadUrl`.
- options.verbose (boolean) — Windows / Linux / macOS / Simulator. Print every finished trace with its duration.

Returns `true` when a Firebase configuration was found.

#### firebasePerformance.createTrace(name)
Create and start a trace. Returns **`false` when the trace was created** and `true` when a trace with that name is already running (this return value is kept from earlier versions of the plugin — see Return values below).

- name (string) — name of trace

#### firebasePerformance.startTrace(name)
The same thing with the usual meaning: returns `true` when the trace was started.

- name (string) — name of trace

#### firebasePerformance.stopTrace(name)
Stop a trace and send it to Firebase. Returns **`false` when the trace was stopped** and `true` when no trace with that name was running.

- name (string) — name of trace

#### firebasePerformance.stopAllTraces()
Stop every running trace. Returns the number stopped. Useful in an `applicationExit` handler — an unstopped trace is never reported.

#### firebasePerformance.doesTraceExist(name)
Returns boolean — tells you if a trace is running.

- name (string) — name of trace

#### firebasePerformance.getTraces()
Returns an array of the names of every running trace.

#### firebasePerformance.incrementTrace(name, metricName [, by])
Increment a counter on a running trace. Returns **`false` on success** and `true` on failure.

- name (string) — name of trace
- metricName (string) — name of the counter
- by (number)(optional) — amount to add, default `1`

#### firebasePerformance.incrementMetric(name, metricName [, by])
The same thing with the usual meaning: returns `true` on success.

#### firebasePerformance.setMetric(name, metricName, value)
Set a counter to an exact value.

- name (string) — name of trace
- metricName (string) — name of the counter
- value (number) — integer value

#### firebasePerformance.getMetric(name, metricName)
Returns the current value of a counter (number).

#### firebasePerformance.setAttribute(name, attribute, value)
Attach a string attribute to a trace. Attributes become filter dimensions in the Firebase console (up to 5 per trace).

- name (string) — name of trace
- attribute (string) — attribute name (truncated at 40 characters)
- value (string) — attribute value (truncated at 100 characters)

#### firebasePerformance.getAttribute(name, attribute)
Returns the value of one attribute (string) or `nil`.

#### firebasePerformance.getAttributes(name)
Returns a table of every attribute on the trace.

#### firebasePerformance.removeAttribute(name, attribute)
Remove one attribute.

#### firebasePerformance.startNetworkTrace(id, url [, method])
Start timing an HTTP request. Use it around `network.request` for the calls you care about.

- id (string) — your own id for this request, used to stop it later
- url (string) — the request URL
- method (string)(optional) — `"GET"` (default), `"POST"`, `"PUT"`, `"DELETE"`, `"HEAD"`, `"PATCH"`, `"OPTIONS"`, `"TRACE"` or `"CONNECT"`

#### firebasePerformance.setNetworkTrace(id, params)
Record the response before stopping the trace.

- id (string) — the id passed to `startNetworkTrace`
- params (table) — `{ responseCode=(number), requestPayloadSize=(number), responsePayloadSize=(number), responseContentType=(string) }`, all optional

#### firebasePerformance.stopNetworkTrace(id)
Stop a network trace and send it to Firebase.

#### firebasePerformance.doesNetworkTraceExist(id)
Returns boolean.

#### firebasePerformance.setPerformanceCollectionEnabled(enabled)
Turn collection on or off at runtime. The setting is remembered across launches on iOS and Android.

- enabled (boolean)

#### firebasePerformance.isPerformanceCollectionEnabled()
Returns boolean.

#### firebasePerformance.setInstrumentationEnabled(enabled)
iOS and Web only — turns the SDK's automatic traces (app start, screen rendering, network requests) on or off. On Android use the `firebase_performance_collection_enabled` manifest flag instead; on desktop there is no automatic instrumentation.

- enabled (boolean)

#### firebasePerformance.isInstrumentationEnabled()
Returns boolean.

#### firebasePerformance.isSupported()
Returns `true` where finished traces actually reach Firebase (or your own `uploadUrl`).

### Return values:

`createTrace`, `stopTrace` and `incrementTrace` return **`false` on success** and `true` on failure. That is how the plugin has always behaved and it is kept so existing projects keep working. `startTrace` and `incrementMetric` are the same operations with the usual meaning, and every function added since returns `true` on success.

### Setup:

Make sure you download and include `GoogleService-Info.plist` and put it in the root folder of your Solar2D project. Also add your `google-services.json` to your root folder and set `useGoogleServicesJson = true` in build.settings. The same `google-services.json` is what the Android, Windows, Linux, macOS and Web builds read, so one file covers everything except iOS.

Performance Monitoring has to be enabled once for the project in the Firebase console (**Release & Monitor > Performance**). Custom traces show up under **Custom traces** and network traces under **Network requests**; the first data can take a few minutes to appear, and up to 12 hours for the full dashboard.

![](/pluginDocs/projectSettings.png)

![](/pluginDocs/androidJson.png)

![](/pluginDocs/iosPlist.png)

### Web / HTML5:

`google-services.json` only carries Android app ids. Register a **Web** app in the Firebase console and pass its app id to `init()` so the data is attributed to it:

```lua
firebasePerformance.init({ appId = "1:1234567890:web:abcdef123456" })
```

The web SDK instruments page loads and network requests on its own and has no HTTP metric type, so `startNetworkTrace`/`stopNetworkTrace` record a *custom* trace carrying `url`, `httpMethod`, `httpResponseCode` and the payload sizes as attributes and counters.

### Desktop and Simulator (Windows / Linux / macOS):

Google has no desktop Performance Monitoring SDK, so these builds use a pure-Lua implementation with the same API. Traces are measured with `system.getTimer()` and what happens to a finished trace depends on `init({ upload = ... })`:

- `"auto"` (default) — upload to Firebase when the configured app id is a **Web** app id, otherwise measure locally and print one line saying so.
- `true` — always try to upload.
- `false` — never upload. Add `verbose = true` and every finished trace is printed with its duration, counters and attributes.
- `uploadUrl = "https://..."` — POST finished traces to your own backend as JSON: `{ appId, projectId, instanceId, traces = { { name, startTime, durationMs, metrics, attributes } } }`.

Uploading to Firebase registers an installation through the Firebase Installations REST API and posts the traces to the same logging transport the Firebase JS SDK uses. Google does not document that transport for desktop clients, so treat desktop uploads as best effort — they are batched, they fail quietly with a single warning, and they never block your app. For a shipping desktop build, `uploadUrl` is the supported path.

### Build Settings:

```lua
settings =
{
	android =
	{
		useGoogleServicesJson = true,
	},
	plugins = {
		["plugin.firebasePerformance"] =
		{
			publisherId = "tech.scotth",
			marketplaceId = "insert marketplace account ID",
		},
	},
}
```

### Example:

```lua
local firebasePerformance = require( "plugin.firebasePerformance" )

firebasePerformance.init()

-- A custom trace with a counter and an attribute
firebasePerformance.startTrace( "level load" )
firebasePerformance.setAttribute( "level load", "world", "forest" )
firebasePerformance.incrementMetric( "level load", "sprites", 128 )
firebasePerformance.stopTrace( "level load" )

-- Timing a network.request
local url = "https://example.com/highscores"
firebasePerformance.startNetworkTrace( "highscores", url, "GET" )
network.request( url, "GET", function( event )
	firebasePerformance.setNetworkTrace( "highscores", {
		responseCode = event.status,
		responsePayloadSize = event.response and #event.response or 0,
	} )
	firebasePerformance.stopNetworkTrace( "highscores" )
end )

-- An unstopped trace is never reported, so close them out on exit
Runtime:addEventListener( "system", function( event )
	if event.type == "applicationExit" or event.type == "applicationSuspend" then
		firebasePerformance.stopAllTraces()
	end
end )
```

##### Helpful Links:
- [Get Plugin](https://solar2dmarketplace.com/plugins?FirebasePerformance_tech-scotth)
- [Example](https://github.com/scottrules44/firebasePerformance-demo)
- [Firebase Performance docs](https://firebase.google.com/docs/perf-mon)
- [Support](https://forums.solar2d.com/c/corona-marketplace/13)
