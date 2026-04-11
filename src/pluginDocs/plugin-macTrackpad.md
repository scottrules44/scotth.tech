# Mac Trackpad Plugin

This plugin allows you to handle multitouch events on the Mac trackpad.

### Platforms:
MacOS only

### Functions:

#### macTrackpad.init(listener)
listener (function)(required) — returns the following events:

event.phase (string) — returns "began", "moved", "ended" (note: multiple event.phase values may be returned)
event.type (string) — returns "pressure", "magnify", or "rotation"
event.pressure (number) — returns number between 0–1 (only returned on event.type "pressure")
event.rotation (number) — returns degree of rotation (only returned on event.type "rotation")
event.magnification (number) — returns number between 0–1 (only returned on event.type "magnify")

### Build Settings:

```lua
settings =
{
	plugins =
	{
		["plugin.macTrackpad"] =
		{
			publisherId="tech.scotth",
			marketplaceId = "insert marketplace account ID",
		},
	},
}
```

##### Helpful Links:
- [Example](https://github.com/scottrules44/macTrackpad-demo)
- [Support](https://forums.solar2d.com/forum/654-corona-store-plugins/)
