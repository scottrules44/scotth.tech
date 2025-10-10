# Quick Action plugin

Quick Action Plugin(App shortcuts) allows you handle and set shortcuts for your app.

### Platforms:
only works with iOS 9+

### Limitations:
please note not all built in icons will work with ios devices running bellow ios 9.1. List of icons [here](https://developer.apple.com/reference/uikit/uiapplicationshortcuticontype)

### Functions:

#### quickAction.getShortcuts()

--return a array of tables with title, subtitle, and type inside each table

```
print(json.prettify( quickAction.getShortcuts()))
```

#### quickAction.setShortcuts(icons)

icons (required)(array)

Please insert tables into table. In each table should be type( used to as id for example play game), icon( should be " " for default which is a dot, an image file( Icons should be square, only black, and 35x35 pixels), or one of apples build in icons (see list [here](https://developer.apple.com/reference/uikit/uiapplicationshortcuticontype) and make sure the first letter is capitalized) ), title, and subtitle(optional)

If you want to clear all Dynamic Action(see guide below) just call quickAction.setShortcuts({})

```
local loadIcons = {
 {type = "com.CoolButton", title ="Cool Tile", subtitle= "Cool subtitle", icon = "Message"},
 {type = "com.CoolButton2", title ="Cool Tile2", subtitle= "Cool subtitle2", icon = "iCon1.png"},
}
quickAction.setShortcuts(loadIcons)
```

![Quick Action Example](/pluginDocs/quickAction1.png)

### Runtime listener:

To listen for actions when an app is opened (or in background) add a runtime listener to "quickAction". the listener will return localizedTitle, type, openType("background launch" or "fresh launch"),and subtitle

```
local function lis( e )
 print(e.localizedTitle, e.type, e.openType, e.subtitle)
end
Runtime:addEventListener("quickAction", lis)
```

### Dynamic Action Vs Static Actions:

Dynamic: If you make actions via quickAction.setShortcuts they are considered dynamic and can be deleted or changed

Static: actions that are defined in build.settings( see build.setting bellow for example) cannot be deleted or changed

### build.settings:

```
settings =
{
	iphone =
	{
	plist =
	{

	UIApplicationShortcutItems = {
	{ 
	UIApplicationShortcutItemTitle = "New message",
	UIApplicationShortcutItemType = "com.mycompany.myapp.newmessage",
	},
	{
	UIApplicationShortcutItemTitle = "Play",
	UIApplicationShortcutItemType = "com.mycompany.myapp.play",
	}
	},
	},
	}
	plugins= {
	["plugin.quickAction"] =
	{
	publisherId="tech.scotth",
	marketplaceId = "insert marketplace account ID",
	},
	}
}
```

##### Helpful Links:

[Get Plugin](https://solar2dmarketplace.com/plugins?QuickAction_tech-scotth)

[Example](https://github.com/scottrules44/quickAction-Sample)

[Support](https://forums.solar2d.com/c/corona-marketplace/13)