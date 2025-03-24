### Wifi Manager Plugin

This plugin allows you to connect to WiFi manually on Android.

### Limitations:

Only works on iOS (these functions only work on iOS: `connectNetwork`, `addNetwork`, `disconnect`, `isEnabled`, `enableLocation`, `isLocationEnabled`) and Android.

### Functions:

`wifiManager.isEnabled()` - returns `boolean`, `true` if WiFi is enabled, `false` if not.

`wifiManager.setEnabled(enable)`

*   `enable (boolean)` - `true` to turn WiFi on, `false` to turn it off.

`wifiManager.addNetwork(networkType, ssid, password)`

*   `networkType (string)` - The type of WiFi (options: "WPA2", "WPA", "WEP", or "NONE").
*   `ssid (string)` - The name of the WiFi network.
*   `password (string) (optional)` - Password for the WiFi network.

`wifiManager.disableNetwork(ssid)` - returns `boolean` (true for error), `string` ("network disabled" or "network not found").

*   `ssid (string)` - The name of the WiFi network.

`wifiManager.connectNetwork(ssid, networkLis)`

*   `ssid (string)` - The name of the WiFi network.
*   `networkLis (function)` - Will return an event on network connection with `event.type` as one of: "disconnecting", "suspended", "disconnected", "connecting", "unknown", or "connected". Also returns `event.didFail (boolean)`.

`wifiManager.removeNetwork(ssid)` - returns `boolean` (true for error), `string` ("cannot connect to network" or "connected").

*   `ssid (string)` - The name of the WiFi network.

`wifiManager.disconnect()`

`wifiManager.listNetworks()` - Returns an array of tables containing:

*   `ssid (string)`
*   `bssid (string)`

`wifiManager.startScan()` - Required before calling `getScanResults()`.

`wifiManager.getScanResults()` - Returns an array of tables containing:

*   `ssid (string)`
*   `capabilities (string)`
*   `frequency (number)`
*   `level (number)`
*   `bssid (string)`

`wifiManager.getCurrentNetwork()` - Returns:

*   `ssid (string)`
*   `bssid (string)`

`wifiManager.getMacAddress()` - Returns `string`.

`wifiManager.ping()` - Returns `boolean` (`true` if connected).

### Build Settings

```lua
settings =
{
	plugins =
	{
		["plugin.wifiManager"] =
		{
			publisherId = "tech.scotth",
			marketplaceId = "insert marketplace account ID",
		},
	},
}
```   

##### Helpful Links:

[Get Plugin](https://solar2dmarketplace.com/plugins?WifiManager_tech-scotth)

[Example](https://github.com/scottrules44/wifiManager-demo)

[Support](https://forums.solar2d.com/c/corona-marketplace/13)