# HC Module Plugin

This plugin allows you to detect accelerometer data from HC-05 chip (note this plugin is only used for accelerometer data).

### Platforms:
Android Only

### Functions:

#### hcModule.init(listener)
Start searching.

listener (function) — fires events:
- event.type = "device found" — event.address = bluetooth device address, event.name = bluetooth device name
- event.type = "data" — accelerometerX, accelerometerY, accelerometerZ, angleX, angleY, angleZ, angularVelocityX, angularVelocityY, angularVelocityZ

#### hcModule.isConnected()
Returns boolean true if connected.

#### hcModule.disconnect()
Disconnect from device.

#### hcModule.connect(address)
Connect to device with mac address (string).

### Build Settings:

```lua
settings =
{
	plugins =
	{
		["plugin.hcModule"] =
		{
			publisherId="tech.scotth",
			marketplaceId = "insert marketplace account ID",
		},
	},
}
```

##### Helpful Links:
- [Get Plugin](https://solar2dmarketplace.com/plugins?HcModule_tech-scotth)
- [Example](https://github.com/scottrules44/hcModule-demo)
- [Support](https://forums.solar2d.com/c/corona-marketplace/13)
