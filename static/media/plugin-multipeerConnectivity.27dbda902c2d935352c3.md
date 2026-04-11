# Multipeer Connectivity Plugin

This plugin allows your application to communicate with other iOS devices via WiFi and/or Bluetooth.

### Platforms:
iOS 10+ only. Requires setup in build.settings.

### Functions:

#### multipeerConnectivity.init(listener)
listener (required) — see multipeerConnectivity events below

#### multipeerConnectivity.startSearch(deviceName, appName)
Search for a host.

deviceName (string) — unique device name, used in discovery and for sending messages
appName (string) — the name of the app for discovery (must be configured in build.settings)

#### multipeerConnectivity.stopSearch()
Stop searching for a host.

#### multipeerConnectivity.startHost(deviceName, appName)
Host a session.

deviceName (string) — unique device name, used in discovery and for sending messages
appName (string) — the name of the app for discovery (must be configured in build.settings)

#### multipeerConnectivity.stopHost()
Stop hosting.

#### multipeerConnectivity.sendInvite(deviceNameToSendInvite)
Send (as a searcher) an invite to a host to join a session.

deviceName (string) — unique device name of the host to invite

#### multipeerConnectivity.acceptInvite(deviceNameToAcceptInvite)
Accept an invite (as host) from a searcher to join a session.

#### multipeerConnectivity.sendMessage(message, deviceNameToSend)
message (string) — message to send to device
deviceNameToSend (string) — the name of the device to send the message to

#### multipeerConnectivity.disconnect()
Disconnect from a session.

#### multipeerConnectivity.listUsers()
Returns an array of strings of deviceNames currently connected to the session.

### Events:

- event.status
  - "hostFound" — (searcher) found a host
  - "hostLost" — (searcher) lost a found host
  - "searcherInviteRecived" — (host) got an invite from a searcher
  - "stateChanged" — a device connection changed
  - "messageSent"
  - "errorSendingMessage"
  - "gotMessage"
- event.status == "hostFound"
  - event.deviceName (string)
- event.status == "hostLost"
  - event.deviceName (string)
- event.status == "searcherInviteRecived"
  - event.deviceName (string)
- event.status == "stateChanged"
  - event.deviceName (string)
  - event.state (string) — "connected", "connecting", "notConnected"
- event.status == "messageSent"
  - event.isError (boolean) — false
- event.status == "errorSendingMessage"
  - event.isError (boolean) — true
  - event.error (string) — description of error
- event.status == "gotMessage"
  - event.message (string) — message from device sent via .sendMessage()
  - event.deviceName (string)

### Build Settings:

In order for this plugin to work properly you need to set NSBonjourServices in your plist in build.settings (see below) with your app name (can be whatever you want but it's a good idea to make it specific and not have special characters).

```lua
settings =
{
    iphone =
    {
        plist =
        {
            NSBonjourServices = {"_appNameHere._tcp", "_appNameHere._udp"}, --replace appNameHere with a name for your app
        },
    },
    plugins = {
        ["plugin.multipeerConnectivity"] =
        {
            publisherId = "tech.scotth",
            marketplaceId = "(replace with Account ID in account page)"
        },
    }
}
```

##### Helpful Links:
- [Get Plugin](https://solar2dmarketplace.com/plugins?MultipeerConnectivity_tech-scotth)
- [Example](https://github.com/scottrules44/multipeerConnectivity-demo)
- [Support](https://forums.solar2d.com/c/corona-marketplace/13)
