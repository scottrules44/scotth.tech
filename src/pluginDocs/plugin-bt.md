# Bluetooth Plugin

This plugin allows you to search, connect, send, and communicate with Bluetooth devices.

### Platforms:
Android and iOS (not simulator)

### Limitations:
You must request location permission on Android 6.0+:

```lua
native.showPopup( "requestAppPermission", {
    appPermission = "Location", urgency = "Critical", listener = function ( e )
    end} )
```

### Functions:

#### bt.init(listener)
Handles all events.

- event.type == "discovery finished" — returned when .search() is complete
- event.type == "device found" — device found during .search()
  - event.deviceName (string) — name of device found
  - event.deviceID (string) — mac address on Android, UDID on iOS
  - event.deviceState (string) — state of device: "connected", "connecting", or "not connected"
- event.type == "device paired" — device paired via .connect()
  - event.deviceName (string) — name of device found
  - event.deviceID (string) — mac address on Android, UDID on iOS
  - event.deviceState (string) — state of device: "connected", "connecting", or "not connected"
- event.type == "device unpaired"
  - event.deviceName (string) — name of device found
  - event.deviceID (string) — mac address on Android, UDID on iOS
  - event.deviceState (string) — state of device: "connected", "connecting", or "not connected"
- event.type == "error"
  - event.error (string) — error message
- event.type == "connected" — connected to device
  - event.deviceName (string) — name of device found
  - event.deviceID (string) — mac address on Android, UDID on iOS
  - event.deviceState (string) — state of device: "connected", "connecting", or "not connected"
- event.type == "message" — message received
  - event.message (string) — message received
- event.type == "connection error"
  - event.deviceName (string) — name of device found
  - event.deviceID (string) — mac address on Android, UDID on iOS
  - event.deviceState (string) — state of device: "connected", "connecting", or "not connected"
  - event.error (string) — error message

#### bt.isEnabled()
Returns boolean — true if Bluetooth is enabled.

#### bt.search()
Search for Bluetooth devices.

#### bt.send(message, deviceID)
Send a message to a device. deviceID is only supported on iOS.

#### bt.enable(enabled)
Enable Bluetooth (Android only).

enabled (boolean) — if true, Bluetooth will be enabled; if false, Bluetooth will be disabled

#### bt.connect(deviceID)
Connect to device with deviceID (string).

#### bt.disconnect(deviceID)
Disconnect from device with deviceID (string).

#### bt.getDevices()
Get configured devices. Returns an array of tables (only works on Android).

- event.deviceName (string) — name of device found
- event.deviceID (string) — mac address on Android, UDID on iOS
- event.deviceState (string) — returns "connected"

### Build Settings:

```lua
settings =
{
    plugins =
    {
        ["plugin.bt"] =
        {
            publisherId = "tech.scotth",
            marketplaceId = "insert marketplace account ID",
        },
    },
}
```

##### Helpful Links:
- [Get Plugin](https://solar2dmarketplace.com/plugins?BluetoothPlugin_tech-scotth)
- [Example](https://github.com/scottrules44/bluetooth-demo)
- [Support](https://forums.solar2d.com/c/corona-marketplace/13)
