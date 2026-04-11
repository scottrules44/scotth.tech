# StoreView Plugin

The Store View plugin presents a store that allows the user to purchase other media from the Apple App Store. For example, your app might display the store view to allow the user to purchase another app, a book, etc. This is all done via a popup, so your users don't need to leave your app.

### Platforms:
iOS devices running iOS 7 or later. It does not work on the iOS simulator.

### Functions:

#### storeView.init(listener)

listener (function) — returns the following events:

- Init (Dispatched upon the plugin successfully initialising): event.phase = "init", event.name = "store", and event.type = "storeView"
  - loaded (Dispatched upon the StoreView popup loading successfully. This means that the StoreView is ready to be displayed instantly via storeView.show()):
  - event.phase = "loaded", event.name = "store", and event.type = "storeView"
    - Hidden (Dispatched upon the StoreView popup hiding successfully after previously being displayed. This means that the StoreView is closed and ready to be loaded again via storeView.load()):
    - event.phase = "hidden", event.name = "store", and event.type = "storeView"
      - Failed (Dispatched upon the StoreView popup failing to load. Potential reasons for failure: Lack of internet connectivity, incorrect app id, and/or incorrect tokens):
      - event.phase = "hidden", event.name = "store", and event.type = "storeView"

```lua
-- Require the StoreView plugin
local storeView = require("plugin.storeView")
local json = require("json")

-- StoreView event listener
local function storeViewEventListener(event)
    print(json.prettify(event))
end

-- Initialize StoreView
storeView.init(storeViewEventListener)
```

#### storeView.load(appId, [tokens])

appId (string)(required) — This is the iTunes app id for your app. You can retrieve your iTunes app id via iTunes connect, or by snipping it from the iTunes store url for your app. For example this is Angry Birds store url https://itunes.apple.com/ie/app/angry-birds/id343200656?mt=8 — The app id is every character after id and before the ? symbol. In this example, the app id is: "343200656".

tokens (table) — This is an optional set of tokens used for tracking purposes. In order to get your tokens, you need to join the [iTunes App Store Affiliate Program](https://affiliate.itunes.apple.com/resources/documentation/itunes_app_store_affiliate_program/).

Contains the following key values:

- campaign (string) — This is your campaign token. This token allows you to track the effectiveness of your Affiliate Program link and your App Analytics campaign. For more information about the Affiliate Program, see the [Affiliate Program](https://www.apple.com/itunes/affiliates/). For more information about iTunes Connect Analytics, see [Viewing App Analytics](https://developer.apple.com/library/content/documentation/LanguagesUtilities/Conceptual/iTunesConnect_Guide/ViewingAnalytics/ViewingAnalytics.html#//apple_ref/doc/uid/TP40011225-CH39) in [iTunes Connect Developer Guide](https://developer.apple.com/library/content/documentation/LanguagesUtilities/Conceptual/iTunesConnect_Guide/Chapters/About.html#//apple_ref/doc/uid/TP40011225).
  - affiliate (string) — This is your affiliate token. You receive an affiliate identifier when you sign up for the Affiliate Program. The affiliate associated with this view controller is paid a commission for any items purchased using the controller.
    - provider (string) — This is your provider token. Use your own provider token when cross promoting your own apps. This token lets you track the effectiveness of the cross promotion effort separate from any affiliate campaign that shares the same campaign token. When promoting apps for other developers, use their provider token instead. See [Viewing App Analytics](https://developer.apple.com/library/content/documentation/LanguagesUtilities/Conceptual/iTunesConnect_Guide/ViewingAnalytics/ViewingAnalytics.html#//apple_ref/doc/uid/TP40011225-CH39) in the [iTunes Connect Developer Guide](https://developer.apple.com/library/content/documentation/LanguagesUtilities/Conceptual/iTunesConnect_Guide/Chapters/About.html#//apple_ref/doc/uid/TP40011225).
      - advertisingPartner (string) — This is your advertisingPartner token. This must be set if using the provider token above.

```lua
-- Require the StoreView plugin
local storeView = require("plugin.storeView")
local json = require("json")

-- StoreView event listener
local function storeViewEventListener(event)
    print(json.prettify(event))
end

-- Initialize StoreView
storeView.init(storeViewEventListener)

-- Set your advertising tokens
local tokens =
{
    campaign = "CAMPAIGN_TOKEN_HERE",
    affiliate = "AFFILIATE_TOKEN_HERE",
    provider = "PROVIDER_TOKEN_HERE",
    advertisingPartner = "ADVERTISING_PARTNER_TOKEN_HERE",
}

-- Load a StoreView popup
storeView.load("343200656", tokens)
```

#### storeView.show()

This function is responsible for showing the StoreView popup that was previously loaded via storeView.load().

```lua
-- Require the StoreView plugin
local storeView = require("plugin.storeView")
local json = require("json")

-- StoreView event listener
local function storeViewEventListener(event)
    print(json.prettify(event))
end

-- Show the StoreView popup (must be loaded first)
storeView.show()
```

### Build Settings:

```lua
settings =
{
    plugins =
    {
        ["plugin.storeView"] =
        {
            publisherId = "tech.scotth",
            marketplaceId = "insert marketplace account ID",
        },
    },
}
```

### Credits:

This plugin was made and created by [Infuse Dreams](http://infusedreams.com) aka [Danny Glover](https://twitter.com/infusedreams).

##### Helpful Links:
- [Get Plugin](https://solar2dmarketplace.com/plugins?StoreView_tech-scotth)
- [Example](https://github.com/scottrules44/storeView-demo)
- [Support](https://forums.solar2d.com/c/corona-marketplace/13)
