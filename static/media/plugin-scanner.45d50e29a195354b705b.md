## About

This plugin allows you to scan a varity of image code(including qr and barcodes/ean8 images) for iOS and Android

## Functions

#### scanner.show(params)
params(table)(optional)
<ul>
	<li>scanFor(array of strings)options to scan for: "qr", "code39", "code39Mode43", "code93", "code128", "ean8", "pdf417", "aztec", "interleaved2Of5", "itf", "dataMatrix"</li>
	<li>title(string)(iOS only)</li>
	<li>hideCameraSwitch(boolean)(default false)</li>
	<li>hideFlash(boolean)(default false)</li>
	<li>focusViewQR(boolean)(default true) will show a square view(good for qr scanning) in focus view</li>
	<li>closeTitle(string)(iOS only) text to show close button</li>
	<li>cameraPosition(string)(default "back") "front" or "back" camera scanning</li>
	<li>listener(function) will return callback event.status="gotCode", "close", "error". If status="gotCode" will return event.code(string data scanned) and status="error" event.error(string)</li>
</ul>

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
<ul>
	<li>[Get Scanner Plugin](https://solar2dmarketplace.com/plugins?IronSourceAdQuality_tech-scotth)</li>
	<li>[Get Support In Forum](https://forums.solar2d.com/c/corona-marketplace/13)</li>
	<li>[Check Demo](https://forums.solar2d.com/c/corona-marketplace/13)</li>
</ul>