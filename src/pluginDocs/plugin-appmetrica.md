# Appmetrica Plugin

This plugin allows you to log events and set up push notifications with [Appmetrica](https://appmetrica.yandex.com).

### Platforms:
iOS

### Functions:

#### appmetrica.init(apiKey)
Setup Appmetrica.

apiKey (string) — API key from the Appmetrica dashboard

#### appmetrica.setUserProfileID(userID)
Set user ID.

userID (string) — set user ID for device user

#### appmetrica.setLocationTracking(enableLocation)
Enable location tracking.

enableLocation (boolean) — enable location tracking

#### appmetrica.setVersion(version)
Set version number.

version (number) — version of app

#### appmetrica.setGender(gender)
Set gender for profile.

gender (string) — set as "male" or "female"

#### appmetrica.setAge(age)
Set age for profile.

age (number) — set age of user

#### appmetrica.setName(name)
Set name for profile.

name (string) — set name of user

#### appmetrica.setDidUserEnableNotification(boolean)
Set whether the user has enabled notifications.

didUserEnableNotification (boolean)

#### appmetrica.setCustomUserInfo(key, value)
Set custom data for user.

key (string) — custom key for user

value (string) — custom value for user

#### appmetrica.reportEvent(eventName, data)
eventName (string) — event name

data (table) — data for the event

#### appmetrica.reportError(errorName, errorReason)
errorName (string) — error name

errorReason (table) — error reason

#### appmetrica.setupPush(isDevelopmentMode)
isDevelopmentMode (boolean)(optional) — use in development mode (default is false)

```lua
appmetrica.setupPush(true) -- using development mode
local function appmetricaListener( event )
    native.showAlert( "appmetrica event", json.encode(event), {"Ok"} )
end

Runtime:addEventListener( "appmetrica", appmetricaListener )

local launchArgs = ...

if ( launchArgs and launchArgs.notification ) then
    -- handle like any other cold open (see https://docs.coronalabs.com/guide/events/appNotification/index.html#launch-arguments)
end
```

### Runtime Event:

Set up a runtime listener like so: `Runtime:addEventListener( "appmetrica", listener )`

Returns:
- event.name = "appmetrica"
- event.type = "remotePush" or "didRegisterPush"
- event.isError (boolean)
- event.error — string or nil
- event.data (occurs when event.type = "remotePush") (table) — contains APS data in table format, see [Apple docs](https://developer.apple.com/documentation/usernotifications/setting_up_a_remote_notification_server/generating_a_remote_notification?language=objc)

### Build Settings:

```lua
settings =
{
    plugins =
    {
        ["plugin.appmetrica"] =
        {
            publisherId = "tech.scotth",
            marketplaceId = "insert marketplace account ID",
        },
    },
}
```

##### Helpful Links:
- [Get Plugin](https://solar2dmarketplace.com/plugins?Appmetrica_tech-scotth)
- [Example](https://github.com/scottrules44/appmetrica-sample)
- [Support](https://forums.solar2d.com/c/corona-marketplace/13)
