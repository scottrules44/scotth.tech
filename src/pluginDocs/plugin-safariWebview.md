# Safari WebView Plugin

The Safari WebView plugin allows you to create faster and more feature-rich webviews.

### Platforms:
iOS 8 or later

### Functions:

#### safariWebview.newView(x, y, width, height, lis, enablePersistentWebViews)
Creates a new webview. Please note width and height are not aligned with Corona's width and height — adjust based on your needs.

enablePersistentWebViews (boolean)(optional)

lis (function) — listener callback with the following event properties:
- event.phase (string)
    - "finished"
    - "terminate"
    - "loading"
    - "began"
- event.url (string) — url of request
- event.title (string) — page title
- event.isError (boolean) — whether there was an error
- event.error (string) — what the error was

#### safariWebview.clearCacheAndStorage(lis)
Clear all webview storage and caches.

lis (function) — listener callback with the following event properties:
- event.phase (string)
    - "completed"

### Webview Properties:

x (number) — x position (Corona point)

y (number) — y position (Corona point)

rotation (number) — rotation of webview

width (number) — width of webview

allowsLinkPreview (boolean) — A Boolean value that determines whether pressing on a link displays a preview of the destination for the link

allowsBackForwardNavigationGestures (boolean) — A Boolean value indicating whether horizontal swipe gestures will trigger back-forward navigations

### Webview Methods:

myWebView:getEstimatedProgress() — returns number, an estimate of what fraction of the current navigation has been loaded (value between 0-1)

myWebView:destroy() — remove webview

myWebView:getUrl() — returns string, returns current url

myWebView:getTitle() — returns string, returns current title

myWebView:hasOnlySecureContent() — returns boolean, indicates whether all resources on the page have been loaded through securely encrypted connections

myWebView:isLoading() — returns boolean, indicates if loading

myWebView:canGoBack() — returns boolean, indicates whether there is a back item in the back-forward list that can be navigated to

myWebView:canGoForward() — returns boolean, indicates whether there is a forward item in the back-forward list that can be navigated to

myWebView:request(url) — url of page for webview

myWebView:goBack() — go back to previous webpage

myWebView:goForward() — go forward to next webpage

myWebView:reload() — reload webpage

myWebView:requestFromFile(path) — path to html file via [system.pathToFile()](https://docs.coronalabs.com/api/library/system/pathForFile.html)

myWebView:requestFromString(html) — html (string) code to render on webview

myWebView:stopLoading() — stop loading webview

Example:

```lua
local webview = require("plugin.safariWebview")
local json = require("json")
local view = webview.newView( display.contentCenterX, display.contentCenterY-100, 300, 300, function(e)
    print( json.prettify( e ))
end)
view:request("https://www.solar2d.com")
```

### Build Settings:

```lua
settings =
{
    plugins =
    {
        ["plugin.safariWebview"] =
        {
            publisherId = "tech.scotth",
            marketplaceId = "insert marketplace account ID",
        },
    },
}
```

##### Helpful Links:
- [Get Plugin](https://solar2dmarketplace.com/plugins?SafariWebview_tech-scotth)
- [Example](https://github.com/scottrules44/safariWebView-Demo)
- [Support](https://forums.solar2d.com/c/corona-marketplace/13)
