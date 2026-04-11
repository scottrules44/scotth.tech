# Helpshift Plugin

This plugin allows you access [Helpshift](https://www.helpshift.com) for player support for FAQ and contact support.

### Platforms:
iOS and Android

### Limitations:
Only works on Android and iOS.

### Functions:

#### helpshift.init(API_KEY, DOMAIN, APP_ID)

```lua
local helpshift = require("plugin.helpshift")
helpshift.init("API_KEY", "DOMAIN","APP_ID")
```

#### helpshift.showFaqs(params)
params (optional)(table) — you can find all configuration params [here](https://developers.helpshift.com/ios/sdk-configuration/)

#### helpshift.showConversation(params)
params (optional)(table) — you can find all configuration params [here](https://developers.helpshift.com/ios/sdk-configuration/)

#### helpshift.showFaqSection(section, params)
section (required)(string) — show FAQs from a particular FAQ section.
params (optional)(table) — you can find all configuration params [here](https://developers.helpshift.com/ios/sdk-configuration/)

#### helpshift.registerDeviceToken(token)
token (required)(string) — push notification token from device.

[Check out Corona's guide on handling notifications](https://docs.coronalabs.com/guide/events/appNotification/index.html)

Check out this sample for Registering Device:

```lua
local notifications = require( "plugin.notifications" )
notifications.registerForPushNotifications()
local json = require("json")
local function notificationListener( event )
    if ( event.type == "remoteRegistration" ) then 
				helpshift.registerDeviceToken(event.token)
    else -- handle data
    	print( json.prettify( event.custom))
    end
end
local launchArgs = ...
if ( launchArgs and launchArgs.notification ) then
    notificationListener( launchArgs.notification )
end

Runtime:addEventListener( "notification", notificationListener
```

#### helpshift.getNotificationCount()
Returns integer for number of notifications. Make sure push notifications are set up in your account to send notifications.

### Build Settings:

```lua
settings =
{
	android =
    {
        permissions =
        {
            { name = ".permission.C2D_MESSAGE", protectionLevel = "signature" },
        },
        usesPermissions =
        {
            "android.permission.INTERNET",
            "android.permission.GET_ACCOUNTS",
            "android.permission.RECEIVE_BOOT_COMPLETED",
            "com.google.android.c2dm.permission.RECEIVE",
            ".permission.C2D_MESSAGE",
        },
    },
    plugins =
    {
        ["plugin.notifications"] =
        {
            publisherId = "com.coronalabs"
        },
		["plugin.helpshift"] =
		{
			publisherId="tech.scotth",
			marketplaceId = "insert marketplace account ID",
		},
    },
}
```

##### Helpful Links:
- [Get Plugin](https://solar2dmarketplace.com/plugins?HelpshiftPlugin_tech-scotth)
- [Example](https://github.com/scottrules44/helpshift-demo)
- [Support](https://forums.solar2d.com/c/corona-marketplace/13)
