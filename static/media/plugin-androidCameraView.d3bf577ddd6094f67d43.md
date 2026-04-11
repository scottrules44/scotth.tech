# Android Camera View Plugin

This plugin allows you to show one camera preview as a native object on Android.

### Platforms:
Android 4.3+. Please note this plugin allows you to display one camera view.

### Functions:

#### androidCameraView.enableFlash(enable)
Note: camera view must be displayed first.

enable (boolean)(optional) — default is true, use false to disable

#### androidCameraView.hasFlash()
Returns boolean.

#### androidCameraView.capturePhoto(path, listener, quality)
Note: camera view must be displayed first.

path (string) — path to save the .jpg photo via [system.pathForFile](https://docs.coronalabs.com/api/library/system/pathForFile.html)

listener (function)(optional) — returns event.status == "complete" when photo is taken

quality (number)(optional) — value between 1–100, default is 100

#### androidCameraView.getCameraSize()
Returns numbers width, height.

#### androidCameraView.newView(params)
Returns an androidCameraView object (see below).

params (table) — contains the following params:
- x (number) — x point of camera view
- y (number) — y point of camera view
- width (number) — width of camera view
- height (number) — height of camera view
- frontCamera (boolean)(optional) — should use front camera (default is false)

### androidCameraView Properties:

x (number) — x point of camera view (example: myView.x = 20)

y (number) — y point of camera view (example: myView.y = 20)

width (number) — width of camera view (example: myView.width = 100)

height (number) — height of camera view (example: myView.height = 100)

### androidCameraView Methods:

:destroy() — destroy the camera view

:hide() — hide the camera view

:unhide() — unhide the camera view

:setRotation(rotation) — rotate the camera view; rotation (number) degrees to rotate the view

### Build Settings:

```lua
settings =
{
    android =
    {
        usesPermissions =
        {
            "android.permission.INTERNET",
            "android.permission.CAMERA",
        },
    },
    plugins =
    {
        ["plugin.androidCameraView"] =
        {
            publisherId = "tech.scotth",
            marketplaceId = "insert marketplace account ID",
        },
    },
}
```

[View Example on GitHub Gist](https://gist.github.com/scottrules44/08ac90337bb98c9ad927eec62387b838)

##### Helpful Links:
- [Get Plugin](https://solar2dmarketplace.com/plugins?AndroidCameraView_tech-scotth)
- [Example](https://github.com/scottrules44/androidCameraView-demo)
- [Support](https://forums.solar2d.com/c/corona-marketplace/13)
