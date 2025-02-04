## About

This plugin allows you to scan a variety of image codes(including QR and barcodes/ean8 images) for iOS and Android.


## Functions

#### scanner.show(params)

params(table)(optional)

&nbsp;

-- scanFor(array of strings)options to scan for: "qr", "code39", "code39Mode43", "code93", "code128", "ean8", "pdf417", "aztec", "interleaved2Of5", "itf", "dataMatrix"

-- title(string)(iOS only)

-- hideCameraSwitch(boolean)(default false)

-- hideFlash(boolean)(default false)

-- hideCloseButton(boolean)(Android only)(default false)

-- closeTitle(string)(iOS only) text to show in place of "close" button text

-- focusViewQR(boolean)(default true) will show a square view(good for qr scanning) in focus view

-- cameraPosition(string)(default "back") "front" or "back" camera scanning

-- listener(function) will return callback event.status="gotCode", "close", "error". If status="gotCode" will return event.code(string data scanned) and status="error" event.error(string)

&nbsp;

```
local scanner = require "plugin.scanner"

scanner.show({closeAfterScan=true, hideCameraSwitch=true, listener=function  (e)
	if(e.status == "gotCode")then
		print("Got Code:"..e.code)
	else
		print(e.status)
	end
end})
```
&nbsp;

#### scanner.close()

Will close scanner if open

```
scanner.close()
```

### Build.settings
```
settings =
{
	plugins =
	{
		["plugin.scanner"] =
		{
			publisherId="tech.scotth",
			marketplaceId = "insert marketplace account ID",
		},
	},
}
```


### Helpful Links



[Get Scanner Plugin](https://solar2dmarketplace.com/plugins?Scanner_tech-scotth)

[Get Support In Forums](https://forums.solar2d.com/c/corona-marketplace/13)

[Check Demo](https://github.com/scottrules44/scanner-demo)
