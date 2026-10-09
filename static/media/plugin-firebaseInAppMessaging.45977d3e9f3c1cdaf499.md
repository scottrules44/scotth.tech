# Firebase In-App Messaging Plugin

This plugin brings [Firebase In-App Messaging](https://firebase.google.com/docs/in-app-messaging) to Solar2D. Campaigns you create in the Firebase console are shown inside your app on iOS (15+) and Android (6.0+), targeted by Analytics audiences, user properties and contextual triggers.

Everything around the campaigns — the Firebase installation id, the targeting calls and the programmatic triggers — also works on HTML5, Windows, Linux and the Solar2D Simulator, so the same code runs everywhere without platform branches.

**Platforms**

- **iOS 15+** — Firebase iOS SDK 12.18.0, campaigns are displayed.
- **Android 6.0+** — Firebase Android BoM 34.18.0, campaigns are displayed.
- **HTML5** — Firebase JS SDK (installations and analytics). Firebase has no web SDK for In-App Messaging, so no campaign is displayed.
- **Windows, Linux, Windows Simulator, macOS Simulator** — pure Lua over the Firebase REST APIs. No campaign is displayed.

`isSupported()` tells you at runtime whether campaigns can be shown on the current platform.

### Setup:

1. In the Firebase console open **Engage → In-App Messaging** and create a campaign.
2. Download `GoogleService-Info.plist` and `google-services.json` from the console and put both in the root folder of your project. Set `useGoogleServicesJson = true` in the `android` section of `build.settings`.
3. Call `firebaseInAppMessaging.init()` early. In-App Messaging fetches campaigns when the app starts and shows the ones whose trigger has fired.
4. To test one campaign on a device, call `getInstanceId()`, copy `event.installationId` from the console output and add it as a test device to the campaign in the Firebase console.

![](/pluginDocs/projectSettings.png)

![](/pluginDocs/androidJson.png)

![](/pluginDocs/iosPlist.png)

### Functions:

#### firebaseInAppMessaging.init( [options] )
Configures Firebase (when no other Firebase plugin has done it) and starts In-App Messaging. A listener function can also be passed directly: `firebaseInAppMessaging.init( onMessage )`.

- options.listener (function) — receives every message lifecycle event.
- options.messagesSuppressed (boolean) — start with campaign display suppressed.
- options.automaticDataCollectionEnabled (boolean) — turn data collection on or off. The SDK persists this across restarts and it has higher priority than the `FirebaseInAppMessagingAutomaticDataCollectionEnabled` key in `build.settings`.
- options.customDisplay (boolean) — render campaigns yourself in Lua instead of using the built-in UI, see below.
- options.apiSecret (string) — Windows and Linux only. With a Google Analytics Measurement Protocol secret, `setUserId()`, `setUserProperty()` and `triggerEvent()` are forwarded to the same Firebase project as your mobile builds.

#### firebaseInAppMessaging.setListener( listener )
Replaces the listener set by `init()`.

#### firebaseInAppMessaging.setUserId( id )
Sets the Analytics user id used for campaign targeting. Pass `nil` to clear it.

#### firebaseInAppMessaging.setUserProperty( name, value )
Sets an Analytics user property, the other half of campaign targeting. Pass `nil` as the value to clear it.

#### firebaseInAppMessaging.triggerEvent( name )
Shows any campaign with this contextual trigger right away, without going through Analytics. On the web and desktop the name is logged as an analytics event instead, and a `trigger` event reports whether it was forwarded.

#### firebaseInAppMessaging.setMessagesSuppressed( enabled )
Stops or resumes campaign display at runtime — useful during a level, a cutscene or a purchase flow. Suppressed campaigns are shown at the next opportunity, not dropped.

#### firebaseInAppMessaging.areMessagesSuppressed()
Returns the current suppression flag.

#### firebaseInAppMessaging.setAutomaticDataCollectionEnabled( enabled )
Controls whether the SDK collects data on startup. Use it to honour a consent prompt.

#### firebaseInAppMessaging.isAutomaticDataCollectionEnabled()
Returns the current data collection flag.

#### firebaseInAppMessaging.getInstanceId( listener )
Delivers one `instanceId` event with `event.installationId` (also available as `event.instanceID`, the old name) and `event.token`. This is the id the Firebase console asks for when you add a test device. `firebaseInAppMessaging.getInstallationId( listener )` is the same function under its current Firebase name.

#### firebaseInAppMessaging.setCustomDisplay( enabled )
Switches custom display on or off after `init()`.

#### firebaseInAppMessaging.messageClicked( [url] )
Custom display only: the player tapped the message's action. Optionally pass the action url, which is then opened.

#### firebaseInAppMessaging.messageDismissed( [dismissType] )
Custom display only: the player closed the message. `dismissType` is `"click"` (default), `"swipe"` or `"auto"`.

#### firebaseInAppMessaging.displayError( [message] )
Custom display only: the message could not be rendered.

Exactly one of those three ends a message. Without it Firebase considers the campaign to still be on screen and shows nothing else.

#### firebaseInAppMessaging.isSupported()
`true` where Firebase can display campaigns (iOS and Android), `false` on the web and desktop.

### Events:

- event.name (string) — `"firebaseInAppMessaging"`
- event.phase (string) — `"init"`, `"display"`, `"impression"`, `"click"`, `"dismiss"`, `"error"`, `"instanceId"` or `"trigger"`
- event.isError (boolean), event.error (string)
- event.messageId (string), event.campaignName (string), event.isTestMessage (boolean)
- event.messageType (string) — `"modal"`, `"banner"`, `"imageOnly"` or `"card"`
- event.triggerType (string) — `"appForeground"` or `"analyticsEvent"` (iOS)
- event.appData (table) — the custom key/value data set on the campaign
- event.actionText (string), event.actionUrl (string) — on `click` events
- event.dismissType (string) — on `dismiss` events: `"swipe"`, `"click"`, `"auto"`, or `"unknown"` on Android, which does not report the gesture
- event.installationId, event.instanceID, event.token (strings) — on `instanceId` events

`display` events (custom display only) carry the renderable content as well:

- event.title (string), event.body (string)
- event.textColor (string), event.backgroundColor (string) — `"#RRGGBB"`
- event.image, event.landscapeImage (tables) — `url`, and on iOS also `filename` plus `baseDir = "temporary"` for the copy the SDK already downloaded, so it goes straight into `display.newImage()`
- event.primaryAction, event.secondaryAction (tables) — `text`, `textColor`, `backgroundColor`, `url`
- event.actionUrl (string) — banner and image-only campaigns

### Example:

```lua
local fiam = require( "plugin.firebaseInAppMessaging" )

local function onMessage( event )
    if event.isError then
        print( "error: " .. tostring( event.error ) )
    elseif event.phase == "impression" then
        print( "shown: " .. tostring( event.campaignName ) )
    elseif event.phase == "click" then
        print( "clicked: " .. tostring( event.actionUrl ) )
    elseif event.phase == "instanceId" then
        print( "test device id: " .. tostring( event.installationId ) )
    end
end

fiam.init( { listener = onMessage } )

-- The id to register as a test device in the Firebase console
fiam.getInstanceId( onMessage )

-- Targeting
fiam.setUserId( "player-3547347" )
fiam.setUserProperty( "tier", "gold" )

-- Do not interrupt gameplay
fiam.setMessagesSuppressed( true )

-- Show a campaign with the "level_complete" contextual trigger
fiam.setMessagesSuppressed( false )
fiam.triggerEvent( "level_complete" )
```

### Custom display:

With `customDisplay` the campaign is not rendered by Firebase. The content arrives in a `display` event and you draw it with your own display objects, then report what the player did. Impressions, clicks and dismissals are still counted in the Firebase console.

```lua
local fiam = require( "plugin.firebaseInAppMessaging" )

local function onMessage( event )
    if event.phase ~= "display" then return end

    local card = display.newGroup()
    display.newRoundedRect( card, display.contentCenterX, display.contentCenterY, 260, 200, 12 )

    if event.image and event.image.filename then
        -- iOS: the image is already downloaded, no network request needed
        local image = display.newImage( card, event.image.filename, system.TemporaryDirectory )
        image.x, image.y = display.contentCenterX, display.contentCenterY - 50
    end

    display.newText( { parent = card, text = event.title or "", x = display.contentCenterX, y = display.contentCenterY + 20 } )

    card:addEventListener( "tap", function()
        card:removeSelf()
        fiam.messageClicked( event.primaryAction and event.primaryAction.url )
        return true
    end )
end

fiam.init( { listener = onMessage, customDisplay = true } )
```

### Build Settings:

```lua
settings =
{
	android =
	{
		useGoogleServicesJson = true,
		usesPermissions =
		{
			"android.permission.INTERNET",
			"android.permission.ACCESS_NETWORK_STATE",
		},
	},
	plugins =
	{
		["plugin.firebaseInAppMessaging"] =
		{
			publisherId = "tech.scotth",
			marketplaceId = "insert marketplace account ID",
		},
	},
}
```

##### Helpful Links:
- [Get Plugin](https://solar2dmarketplace.com/plugins?FirebaseInAppMessaging_tech-scotth)
- [Example](https://github.com/scottrules44/firebaseInAppMessaging-demo)
- [Support](https://forums.solar2d.com/c/corona-marketplace/13)
