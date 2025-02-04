## About

This plugin allows you to set alternate App Icons for iOS.


## Functions

#### appIcon.setIcon(name, listener)

name(string)

&nbsp;

listener(function) will return event.isError (boolean) and event.error (string)

&nbsp;

```
local appIcon = require "plugin.appIcon"

appIcon.setIcon( "alternateIconName", function(e)
    if(e.isError)then
        print("Error Setting Icon:",e.error )
    else
        print( "New Icon Set" )
    end
end )
```
&nbsp;

### Build.settings
```
settings =
{
	plugins =
	{
		["plugin.appIcon"] =
		{
			publisherId="tech.scotth",
			marketplaceId = "insert marketplace account ID",
		},
	},
	iphone =
	{
		plist =
		{
			CFBundleIcons = {
				CFBundleAlternateIcons={
					alternateIcon={ -- name we call in code
						CFBundleIconFiles={"altIcon"}, -- altIcon.png in root project
						UIPrerenderedIcon = false
					},
					alternateIcon2={ -- name we call in code
						CFBundleIconFiles={"altIcon2"}, -- altIcon2.png in root project
						UIPrerenderedIcon = false
					},
				},
			},
		},
	},
}
```


### Helpful Links

[Get Scanner Plugin](https://solar2dmarketplace.com/plugins?AppIcon_tech-scotth)

[Get Support In Forums](https://forums.solar2d.com/c/corona-marketplace/13)

[Check Demo](https://github.com/scottrules44/appIconPlugin-sample)
