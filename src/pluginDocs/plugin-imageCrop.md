# Image Crop Plugin

This plugin allows you to crop, compress, and set the resolution of images outside of the scope of Corona's APIs.

### Platforms:
iOS and Android

### Limitations:
On Android you cannot crop images greater than their width or height.

### Functions:

#### imageCrop.crop(pathOfImage, x, y, width, height, destinationPath)
pathOfImage (string) — path of image you would like to crop (via [system.pathForFile](https://docs.coronalabs.com/api/library/system/pathForFile.html))
x (number) — x point where to crop image
y (number) — y point where to crop image
width (number) — width at which to crop image
height (number) — height at which to crop image
destinationPath (string) — destination path for cropped image (via [system.pathForFile](https://docs.coronalabs.com/api/library/system/pathForFile.html))

#### imageCrop.setResolution(pathOfImage, width, height, destinationPath)
pathOfImage (string) — path of image you would like to scale (via [system.pathForFile](https://docs.coronalabs.com/api/library/system/pathForFile.html))
width (number) — width at which to scale image
height (number) — height at which to scale image
destinationPath (string) — destination path for scaled image (via [system.pathForFile](https://docs.coronalabs.com/api/library/system/pathForFile.html))

#### imageCrop.compress(pathOfImage, destinationPath)
pathOfImage (string) — path of image you would like to compress (via [system.pathForFile](https://docs.coronalabs.com/api/library/system/pathForFile.html))
destinationPath (string) — destination path for compressed image (via [system.pathForFile](https://docs.coronalabs.com/api/library/system/pathForFile.html))

### Build Settings:

```lua
settings =
{
	plugins = {
		["plugin.imageCrop"] =
		{
			publisherId="tech.scotth",
			marketplaceId = "insert marketplace account ID",
		},
	},
}
```

##### Helpful Links:
- [Get Plugin](https://solar2dmarketplace.com/plugins?ImageCrop_tech-scotth)
- [Example](https://github.com/scottrules44/imageCrop-demo)
- [Support](https://forums.solar2d.com/c/corona-marketplace/13)
