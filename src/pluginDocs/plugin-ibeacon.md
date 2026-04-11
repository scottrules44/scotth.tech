# iBeacon Plugin

This plugin allows you to find iBeacons nearby and create a beacon from your device.

### Platforms:
iOS 7.0+ only (not simulator — iBeacon is not testable in the simulator).

### Limitations:
Please use two devices to test the demo project.

### Functions:

#### ibeacon.search(uuids, listener)
uuids (array)(required) — UUIDs to search for, e.g. `{"00000000-0000-0000-0000-000000000000", "00000000-0000-0000-0000-000000000001"}`

listener (function)(required) — event data:
- event.accuracy (string) — possible values:
  - "best"
  - "kilometer"
  - "hundred meters"
  - "three kilometers"
  - "nearest ten meters"
  - "best for navigation"
  - "unknown"
- event.major (integer) — the most significant value in the beacon
- event.minor (integer) — the least significant value in the beacon
- event.uuid (string) — the UUID of the beacon
- event.proximity (string) — how close the user is:
  - "immediate"
  - "near"
  - "far"
  - "unknown"
- event.rssi (number) — the received signal strength of the beacon, measured in decibels

```lua
local function iBeaconLis( e )
    print( "Beacon Found" )
    print( "--------------" )
    print( "accuracy:"..e.accuracy )
    print( "uuid:"..e.uuid )
    print( "accuracy:"..e.accuracy )
    print( "major:"..e.major )
    print( "minor:"..e.minor )
    print( "--------------" )
end
ibeacon.search({"00000000-0000-0000-0000-000000000000", "00000000-0000-0000-0000-000000000001"},iBeaconLis)
```

#### ibeacon.setTimer(seconds)
seconds (integer)(required) — how often the device should search.

```lua
ibeacon.setTimer(10)
```

#### ibeacon.stopUUIDSearch(uuid)
uuid (string)(required) — stop search for a particular UUID.

```lua
ibeacon.stopUUIDSearch("00000000-0000-0000-0000-000000000000")
```

#### ibeacon.stopAllSearchs()
Stop all searching for beacons.

```lua
ibeacon.stopAllSearchs()
```

#### ibeacon.startTransmitting(uuid, major, minor)
Turns device into an iBeacon.

uuid (string)(optional) — the UUID to broadcast
major (integer)(required) — the major to broadcast
minor (integer)(required) — the minor to broadcast

```lua
ibeacon.startTransmitting("00000000-0000-0000-0000-000000000000", 10001, 69)
--or 
ibeacon.startTransmitting(10001, 69) -- uses device uuid
```

#### ibeacon.stopTransmitting()
Stop device broadcasting.

```lua
ibeacon.stopTransmitting()
```

#### ibeacon.canAccess()
Used to check if location services is on. Returns string: "services disabled", "denied", "authorized", or "not determined".

```lua
print(ibeacon.canAccess())
```

### Build Settings:

```lua
settings =
{
	iphone =
	{
		plist =
		{
			NSLocationAlwaysUsageDescription = "ibeacon stuff",
		},
	},
	plugins = {
		["plugin.ibeacon"] =
		{
			publisherId="tech.scotth",
			marketplaceId = "insert marketplace account ID",
		},
	},
}
```

##### Helpful Links:
- [Get Plugin](https://solar2dmarketplace.com/plugins?IbeaconPlugin_tech-scotth)
- [Example](https://github.com/scottrules44/ibeacon-demo)
- [Support](https://forums.solar2d.com/c/corona-marketplace/13)
