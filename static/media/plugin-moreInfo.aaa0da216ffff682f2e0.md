# More Info Plugin

This plugin grabs more system info from the device. (based on Corona [getInfo](https://docs.coronalabs.com/api/library/system/getInfo.html))

## Limitations

At this moment, iOS (and simulator) and Android.

## Functions

### `moreInfo.init(disableBluetoothChecking)`

- `disableBluetoothChecking` (boolean) (iOS only)

### `moreInfo.getBatteryLevel()`

- Returns: integer Battery Level

### `moreInfo.getBatteryState()`

- Returns: string Battery State (`"unknown"`, `"unplugged"`, `"charging"`, `"full"`)

### `moreInfo.getTotalSpace()`

- Returns: integer Total Space (in megabytes)

### `moreInfo.getTotalFreeSpace()`

- Returns: integer Total Free Space (in megabytes)

### `moreInfo.getNetworkStatus()`

- Returns: string Network Status (`"no internet"`, `"wifi"`, `"cellular"`)

### `moreInfo.getPlatform()`

- Returns: string Platform (`iOS`, `android`, `macOS`, `windows`)

### `moreInfo.isHeadsetPluggedIn()`

- Returns: `true` if plugged in (must be wired headphones)

### `moreInfo.getMaxTextureMemorySize()`

- Returns: number

### `moreInfo.getMaxTextureMemoryUnits()`

- Returns: number

### `moreInfo.isMusicPlaying()`

- Returns: boolean

### `moreInfo.isMuted(listener)`

- `listener(function)` returns `event.muted` (boolean)

### `moreInfo.isBluetoothEnabled()`

- Returns: `true` if Bluetooth is enabled (iOS only). Please wait 2 seconds after launch to get accurate data.

### `moreInfo.getKeyboardSize()`

- Returns: `width` (number), `height` (number)  
	*(Note: `coronaWindowMovesWhenKeyboardAppears` must be enabled on Android)*

### `moreInfo.getColorMode()`

- Returns: `"dark"` or `"light"`

### `moreInfo.getSettingFontSize()`

- Returns: number. This is the size of the text set in the Settings app on iOS and Android.  
	- `1` is Medium on iOS and Android. Below `1` is smaller, above `1` is bigger.  
	- On iOS:  
		- `0.8` = Extra Small  
		- `0.9` = Small  
		- `1` = Medium  
		- `1.1` = Large  
		- `1.2` = Extra Large  
		- `1.3` = Extra Extra Large  
		- `1.4` = Extra Extra Extra Large  

### `moreInfo.getTimeZone()`

- Returns:  
	- Time Zone: geopolitical region ID (string)  
	- Abbreviation (string) such as `"EDT"` (Eastern Daylight Time)  
	- Full timezone name (string) such as `"Eastern Daylight Time"`

### `moreInfo.getMemoryStats()`

- Returns:  
	- Device memory: `used` (number), `free` (number), `total` (number)

### `moreInfo.getAppSetId(listener)`

- `listener(function)` returns:  
	- `event.id` (string)  
	- `event.scope` (number)

## Android

Make sure you add the following permissions:

- `android.permission.ACCESS_NETWORK_STATE`

## `build.settings`

```lua
settings =
{
		plugins =
		{
				["plugin.moreInfo"] =
				{
						publisherId = "tech.scotth",
						marketplaceId = "insert marketplace account ID",
				},
		},
		android =
		{
				usesPermissions =
				{
						"android.permission.BLUETOOTH",
				},
				coronaWindowMovesWhenKeyboardAppears = true,
		},
}
```

## Helpful Links

- [Get Plugin](https://solar2dmarketplace.com/plugins?MoreInfo_tech-scotth)
- [Example](https://github.com/scottrules44/moreInfo-demo)
- [Support](https://forums.solar2d.com/c/corona-marketplace/13)