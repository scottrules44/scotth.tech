# Image to Text Plugin

This plugin allows you to use OCR to get text from an image.

### Platforms:
iOS and Android

### Limitations:
Only works on iOS and Android.

### How Do I Add a Traineddata or Language?

On iOS, due to limitations of the Tesseract API on iOS, you are limited to:
- "chi_sim" aka Chinese Simplified
- "eng" aka English
- "fra" aka French
- "jpn" aka Japanese
- "kor" aka Korean
- "por" aka Portuguese
- "rus" aka Russian
- "spa" aka Spanish

If you want to use your own traineddata on iOS, please use [Corona Enterprise](https://coronalabs.com/products/enterprise/) and contact me for Plugin Binaries. If you are using Android you need to load the traineddata manually. Traineddata used for iOS can be found [here](https://github.com/scottrules44/Traineddata-for-image-To-text-plugin) and can also be used for Android. In order to load traineddata on Android, the data is moved to the phone's hard drive (required by the Tesseract API on Android) and placed in `phoneHardDrivePath/OCRFolder`. To load traineddata, use the following snippet:

```lua
if system.getInfo( "environment" ) == "device" and system.getInfo( "platform" ) == "android" then
	imageToText.transferLanguage( system.pathForFile( "eng.traineddata" ))
	--print(json.encode(imageToText.listLanguages()))
	--imageToText.deleteLanguage("eng")
  end
```

### Functions:

#### imageToText.init(listener)
listener (function) — returns event.response with the converted text.

#### imageToText.convert(pathToImage, language)
pathToImage (path) — path to PNG or JPEG via [system.pathForFile()](https://docs.coronalabs.com/api/library/system/pathForFile.html)
language (string) — the language or traineddata to scan for in the image

#### imageToText.listLanguages()
Returns an array of strings of languages loaded on the app (note: .traineddata extension is not included).

#### imageToText.transferLanguage(path)
(Used for Android)

path (path) — path to .traineddata to be loaded for converting via [system.pathForFile()](https://docs.coronalabs.com/api/library/system/pathForFile.html)

Also returns a string for status: "file saved", "could not find language folder", "could not save file to language folder", or "unable to create language directory".

#### imageToText.deleteLanguage(language)
(Used for Android)

language (string) — language or traineddata to be removed from phone hard drive (note: should not include .traineddata in string).

### Build Settings:

```lua
settings =
{
	excludeFiles =
	{
		ios = { "eng.traineddata" },
		osx = { "eng.traineddata" },
		win32 = { "eng.traineddata" },
		tvos = { "eng.traineddata" },
	},
	android =
	{
		usesPermissions =
		{
			"android.permission.WRITE_EXTERNAL_STORAGE",
			"android.permission.READ_EXTERNAL_STORAGE",
		},
	},
	plugins =
	{
		["plugin.imageToText"] =
		{
			publisherId="tech.scotth",
			marketplaceId = "insert marketplace account ID",
		},
	},
}
```

##### Helpful Links:
- [Get Plugin](https://solar2dmarketplace.com/plugins?ImageToText_tech-scotth)
- [Example](https://github.com/scottrules44/imageToText-demo)
- [Support](https://forums.solar2d.com/c/corona-marketplace/13)
