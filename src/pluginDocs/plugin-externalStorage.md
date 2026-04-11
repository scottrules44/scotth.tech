# External Storage Plugin

This plugin allows you to manage files outside the app sandbox and onto the phone's storage.

### Limitations:
Android only. Handles external storage only.

### Functions:

#### externalStorage.requestExternalStorage(listener)
Presents a popup where a user can grant the app external storage access.

- `listener` (function)(optional) — returns `event.status` of `"permission granted"` or `"permission denied"`

```lua
externalStorage.requestExternalStorage(function (event)
    print(event.status)
end)
```

#### externalStorage.hasAccessToExternalStorage()
Returns `true` or `false` depending on whether the app has external storage access.

```lua
print(externalStorage.hasAccessToExternalStorage())
```

#### externalStorage.getFile(pathExternal, pathCorona, shouldLookAtRoot)
Transfer a file from external storage into Corona. Returns `"could not find file"`, `"could not save file"`, or `"file saved"`.

- `pathExternal` (string) — path of the file to get, e.g. `"/test.txt"`
- `pathCorona` (path) — destination path via [system.pathForFile](https://docs.coronalabs.com/api/library/system/pathForFile.html)
- `shouldLookAtRoot` (boolean)(optional) — default is `false`; if `true`, checks root instead of External Storage (recommended for SD cards)

```lua
local pathDocs = system.pathForFile("test.txt", system.DocumentsDirectory)
print(externalStorage.getFile("/test.txt", pathDocs))
```

#### externalStorage.copyFile(pathCorona, pathExternal, shouldLookAtRoot)
Transfer a file from the app to external storage. Returns `"could not find file"`, `"could not save file"`, or `"file saved"`.

- `pathCorona` (path) — source path via [system.pathForFile](https://docs.coronalabs.com/api/library/system/pathForFile.html)
- `pathExternal` (string) — destination path, e.g. `"/folder1/test.txt"`
- `shouldLookAtRoot` (boolean)(optional) — default is `false`; if `true`, checks root instead of External Storage (recommended for SD cards)

```lua
local pathCorona = system.pathForFile("test.txt")
print(externalStorage.copyFile(pathCorona, "hello123.txt"))
```

#### externalStorage.deleteFile(pathExternal, shouldLookAtRoot)
Delete a file in external storage. Returns `true` if deleted, `false` if not.

- `pathExternal` (string) — path of the file to delete, e.g. `"/test123.txt"`
- `shouldLookAtRoot` (boolean)(optional) — default is `false`; if `true`, checks root instead of External Storage (recommended for SD cards)

```lua
print(externalStorage.deleteFile("/test.txt"))
```

#### externalStorage.listFiles(pathExternal, shouldLookAtRoot)
Returns an array of file paths in a given external storage directory.

- `pathExternal` (string) — directory to list, e.g. `"/Music"`
- `shouldLookAtRoot` (boolean)(optional) — default is `false`; if `true`, checks root instead of External Storage (recommended for SD cards)

```lua
print("----------------")
print(json.encode(externalStorage.listFiles("/folder")))
print("----------------")
```

#### externalStorage.doesFileExist(pathExternal, shouldLookAtRoot)
Returns `true` if a file exists in external storage, `false` if not.

- `pathExternal` (string) — path to check, e.g. `"/dir/myFile.pdf"`
- `shouldLookAtRoot` (boolean)(optional) — default is `false`; if `true`, checks root instead of External Storage (recommended for SD cards)

```lua
print(externalStorage.doesFileExist("/test.png"))
```

#### externalStorage.makeFolder(pathExternal, shouldLookAtRoot)
Create a folder in external storage.

- `pathExternal` (string) — path and name for the new folder, e.g. `"/newFolder"`

#### externalStorage.isSdCardConnected()
Returns a boolean: `true` if an SD card is connected, `false` if not.

#### externalStorage.sdCardPath()
Returns the path of the SD card, for use with copy, delete, get, and list file APIs above.

#### externalStorage.isSdCardWriteable()
Returns a boolean indicating whether the SD card can be written to.

#### externalStorage.totalSpace()
Returns the total space on the phone in MB (number).

#### externalStorage.spaceAvailable()
Returns the free space on the phone in MB (number).

```lua
print("MB of total space"..externalStorage.totalSpace().."/".."MB of available space"..externalStorage.spaceAvailable())
print("SD card hooked up and readable and writable?"..externalStorage.isSdCardConnected())
print("path of sd card:"..externalStorage.sdCardPath())
```

#### externalStorage.getExternalFilesDir(type)
Returns the absolute path to the directory on the primary shared/external storage device.

- `type` (string) — the type of files directory to return

#### externalStorage.rename(pathExternal, newName, shouldLookAtRoot)
Rename a file in external storage.

- `pathExternal` (string) — path to the file to rename
- `newName` (string) — new filename
- `shouldLookAtRoot` (boolean)(optional) — if `true`, looks at root

### Properties:
The following return strings that can be used with the copy, delete, get, and list file APIs above:

- `externalStorage.dcim`
- `externalStorage.download`
- `externalStorage.movies`
- `externalStorage.ringtones`
- `externalStorage.podcasts`
- `externalStorage.music`

### Support for Android 12:
Make sure your app requests permission via `externalStorage.requestExternalStorage(listener)` and check access with `externalStorage.hasAccessToExternalStorage()`.

### Build Settings:

```lua
settings =
{
    android = {
        usesPermissions = {
            "android.permission.WRITE_EXTERNAL_STORAGE",
            "android.permission.READ_EXTERNAL_STORAGE",
            "android.permission.MANAGE_EXTERNAL_STORAGE",
        }
    },
    plugins = {
        ["plugin.externalStorage"] =
        {
            publisherId = "tech.scotth",
            marketplaceId = "insert marketplace account ID",
        },
    },
}
```

##### Helpful Links:
- [Get Plugin](https://solar2dmarketplace.com/plugins?ExternalStorage_tech-scotth)
- [Example](https://github.com/scottrules44/externalStorage-demo)
- [Support](https://forums.solar2d.com/c/corona-marketplace/13)
