# WebView2 Plugin

A drop-in replacement for `native.newWebView()` that uses each platform's current web engine and adds the features the built-in web view never had: running JavaScript with results back in Lua, two-way messaging, transparent pages, progress and title events, and a warm-up call that makes the first page load much faster.

- **Windows** — Microsoft Edge **WebView2** (Chromium) instead of the IE11 `WebBrowser` control. ES2020+, WebGL, modern CSS, no IE quirks.
- **macOS** — **WKWebView** instead of the deprecated legacy `WebView`.
- **iOS** — **WKWebView** (same code as macOS).
- **Android** — `android.webkit.WebView` (Chromium), hardware accelerated.
- **HTML5** — `<iframe>` overlay (experimental).

The plugin returns a **real Corona display object**, so everything you already do with `native.newWebView()` keeps working: `x`, `y`, `width`, `height`, `alpha`, `isVisible`, `anchorX/Y`, `contentBounds`, `removeSelf()`, `group:insert()`, transitions, Composer scene groups, `addEventListener("urlRequest", ...)` and so on.

### Functions:

#### webview2.newWebView(left, top, width, height [, listener])
#### webview2.newWebView(options)
Creates a web view and returns a display object (an invisible rectangle the native view follows). Same signature and coordinates as `native.newWebView()`; `x`/`y` is the center. The optional `listener` is added as a `"urlRequest"` listener. Returns `nil` when width or height is not positive.

The table form accepts:
- left, top, width, height (number) — required geometry (or `x`, `y` for the center)
- parent (group) — display group to insert the object into
- listener (function) — `"urlRequest"` listener
- url, baseDirectory — load this URL right away
- html, baseDirectory — load this HTML string right away
- hasBackground (boolean) — `false` for a transparent web view (default `true`)
- userAgent (string) — custom user agent
- isVisible (boolean) — start hidden when `false`
- javaScriptEnabled (boolean) — default `true`
- devToolsEnabled (boolean) — allow developer tools / inspector (default `false`)
- allowsInlineMediaPlayback (boolean) — iOS, default `true`
- mediaPlaybackRequiresUserAction (boolean) — default `false`
- allowsBackForwardNavigationGestures (boolean) — iOS/macOS/Windows swipe navigation, default `false`
- isScrollEnabled (boolean) — iOS/Android, default `true`
- zoomEnabled (boolean) — Windows/Android pinch and Ctrl+wheel zoom, default `true`
- contextMenuEnabled (boolean) — Windows right-click menu, default `true`
- statusBarEnabled (boolean) — Windows link status bar, default `false`

#### webview2.isAvailable()
`true` when a web engine is available. On Windows this checks that the WebView2 Runtime is installed.

#### webview2.getVersion()
Engine version string (WebView2 runtime version, WebKit build, Android WebView package) or `nil`.

#### webview2.warmUp()
Starts the web engine before the first web view is needed, so the first `newWebView()` and its page come up sooner. Call it a screen ahead (for example while a menu is showing), and call `setOptions()` before it. Safe to call repeatedly. Returns `true` when warming started or the engine is already running.

Measured first page of the first web view: iOS Simulator about 740 ms cold → about 30 ms after `warmUp()`; Android emulator about 350 ms → about 100 ms.

On iOS and macOS the first `newWebView()` takes the warm-up view over when created with default `javaScriptEnabled`, `devToolsEnabled`, `allowsInlineMediaPlayback` and `mediaPlaybackRequiresUserAction`. `webView:getNativeProperty("warmUpAdopted")` reports whether that happened.

#### webview2.setOptions(options)
Engine-wide options; call before the first web view is created (and before `warmUp()`).
- userDataFolder (string) — Windows: WebView2 profile folder. Default `system.ApplicationSupportDirectory/WebView2`
- browserExecutableFolder (string) — Windows: fixed-version WebView2 runtime folder
- additionalBrowserArguments (string) — Windows: extra Chromium switches
- language (string) — Windows: UI language, e.g. `"en-US"`
- inspectable (boolean) — iOS 16.4+ / macOS 13.3+: make every view inspectable from Safari

#### webview2.deleteCookies(), webview2.clearCache()
Library-wide variants (cookies and cache are shared between views anyway).

#### webview2.getWebViews()
Array of the live web view objects.

#### webview2.replaceNativeWebView(), webview2.restoreNativeWebView()
Opt-in: make `native.newWebView()` create plugin web views so existing code switches engines without edits.

#### webview2.sync()
Force an immediate re-sync of native view frames (normally automatic every frame).

### Web View Methods:

webView:request(url [, baseDirectory | baseURL]) — as Corona; `baseDirectory` may be `system.ResourceDirectory` etc. or a URL string

webView:load(html [, baseDirectory | baseURL]) — alias `loadHTML`; works on every platform (previously Apple only)

webView:stop(), webView:reload()

webView:back(), webView:forward() — returns boolean

webView:resize(width, height) — actually works now (or just set `width`/`height`)

webView:deleteCookies(), webView:clearCache()

webView:evaluateJS(javascript [, callback]) — run JavaScript and get the result in Lua; aliases `evaluateJavaScript`, `injectJS`. The callback event has:
- event.result — decoded value (string, number, boolean, table or nil)
- event.rawResult (string) — as returned by the engine (JSON on Windows/Android)
- event.error (string) — error message when the script threw
- event.isError (boolean)

webView:postMessage(value) — send a string or table to JavaScript

webView:openDevTools() — Windows opens DevTools; Apple enables Web Inspector; Android enables `chrome://inspect`

webView:setUserAgent(ua), webView:setHasBackground(bool), webView:setBounces(bool) — apply immediately (assigning the property applies on the next frame, so use the setter when you change it and load in the same frame)

webView:getNativeProperty(key), webView:setNativeProperty(key, value) — pass-through to the platform web view, see Native Properties

webView:getNativeViewHandle() — lightuserdata (`WKWebView *`, `ICoreWebView2 *`) or `nil`

Plus every display object method: `removeSelf`, `toFront`, `toBack`, `translate`, `scale`, `addEventListener`, ...

### Web View Properties:

hasBackground (boolean) — `false` = transparent page background (Windows supports only fully opaque or fully transparent)

bounces (boolean) — iOS scroll bounce

userAgent (string) — custom user agent; `nil` restores the default

canGoBack, canGoForward (boolean) — read-only, history state

url (string) — read-only, current URL

title (string) — read-only, document title

isLoading (boolean) — read-only

progress (number) — read-only, 0..1 (Windows reports coarse steps)

isWebView2 (boolean) — always `true`, handy to tell plugin views from `native.newWebView()` objects

All display object properties also apply: `x`, `y`, `width`, `height`, `alpha` (not on Windows), `isVisible`, `anchorX/Y`, `xScale/yScale`, ...

### Events:

#### "urlRequest" (Corona-compatible)
- event.url (string) — requested/loaded URL
- event.type (string) — `"link"`, `"form"`, `"history"`, `"reload"`, `"formResubmit"`, `"other"` or `"loaded"`
- event.errorMessage, event.errorCode — present when the load failed (no `type` in that case, as in Corona)
- event.httpStatusCode (number) — Windows only, on `"loaded"` for `http(s)` responses

`window.close()` from JavaScript arrives as `url = "window.close"`, `type = "other"`.

#### "message"
JavaScript called `solar2d.postMessage(value)`.
- event.message (string) — the posted string (objects are JSON-stringified)
- event.data — `message` decoded as JSON when possible, otherwise `nil`

#### "progress"
- event.progress (number) — 0..1

#### "titleChanged"
- event.title (string)

### JavaScript Bridge:

A small script is injected into every page:

```js
solar2d.postMessage( value )            // string or JSON-able object -> Lua "message" event
solar2d.onMessage = function ( m ) {}   // receives webView:postMessage( value ) payloads
window.addEventListener( 'solar2dmessage', e => console.log( e.detail ) )   // same payload
solar2d.platform                        // 'windows' | 'ios' | 'macos' | 'android' | 'html5'
```

### Native Properties:

`getNativeProperty` / `setNativeProperty` reach the platform object directly:
- **Windows** — `ICoreWebView2Settings` booleans by name (`IsScriptEnabled`, `AreDevToolsEnabled`, `AreDefaultContextMenusEnabled`, `IsStatusBarEnabled`, `IsZoomControlEnabled`, `IsPinchZoomEnabled`, `IsSwipeNavigationEnabled`, ...), `UserAgent`, `ZoomFactor`, `DefaultBackgroundColor`, read-only `Source`, `DocumentTitle`, `BrowserVersionString`
- **iOS/macOS** — Key-Value Coding on the `WKWebView`, its configuration, preferences and (iOS) scroll view, e.g. `allowsLinkPreview`, `customUserAgent`, `minimumFontSize`, `scrollEnabled`
- **Android** — reflection on `WebSettings` then `WebView`, e.g. `javaScriptEnabled`, `textZoom`, `cacheMode`, `builtInZoomControls`

Unsupported keys print a warning and return `nil`/`false`.

### Build Settings:

```lua
settings =
{
	plugins =
	{
		["plugin.webview2"] =
		{
			publisherId = "tech.scotth",
		},
	},
}
```

### Example:

```lua
local webview2 = require( "plugin.webview2" )

webview2.warmUp()   -- call a screen ahead for a faster first page

local webView = webview2.newWebView( 0, 0, 320, 480 )   -- same signature as native.newWebView
webView:addEventListener( "urlRequest", function( event )
	if event.type == "loaded" then print( "loaded", event.url ) end
end )
webView:request( "https://solar2d.com" )

-- run JavaScript and get the result back
webView:evaluateJS( "document.title", function( event )
	print( event.result )
end )

-- JavaScript -> Lua
webView:addEventListener( "message", function( event )
	print( "JS said", event.message )
end )

-- Lua -> JavaScript
webView:postMessage( { score = 100 } )

webView.hasBackground = false   -- transparent page over your scene
```

### Notes:

- Windows needs the Evergreen **WebView2 Runtime**, preinstalled on Windows 11 and most Windows 10 machines; `webview2.isAvailable()` tells you.
- `rotation` is not applied to the native view (same as the built-in web view on Windows, macOS and Android); position, size, scale and groups are.
- Windows: `alpha` other than 1 is ignored; `hasBackground = false` works.
- macOS/iOS: cookies and cache are shared with the process-wide `WKWebsiteDataStore`.
- `target="_blank"` links open in the same view on every platform.

##### Helpful Links:
- [Get Plugin](https://solar2dmarketplace.com/plugins?WebView2_tech-scotth)
- [Microsoft Edge WebView2](https://learn.microsoft.com/en-us/microsoft-edge/webview2/)
- [WKWebView](https://developer.apple.com/documentation/webkit/wkwebview)
- [Support](https://forums.solar2d.com/c/corona-marketplace/13)
