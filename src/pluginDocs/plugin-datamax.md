# Datamax Plugin

This plugin allows you to print PDFs and images to Datamax printers.

### Platforms:
iOS

### Functions:

#### dataMax.getPrinters()
Returns an array of tables, each containing `name` (string) and `modelNumber` (string) keys.

#### dataMax.print(name, modelNumber, printerType, filePath, headWidth, listener, isPdf)
Send a file to a Datamax printer.

- `name` (string) — name of the printer to print to
- `modelNumber` (string) — model number of the printer to print to
- `printerType` (string) — `"apex"`, `"legacy"`, or `"DPL"`
- `filePath` (string) — path of the file to print (via [system.pathForFile()](https://docs.coronalabs.com/api/library/system/pathForFile.html))
- `headWidth` (number) — width to print the item at
- `listener` (function) — returns `event.status`: `"could not find printer"`, `"invalid printer type"`, or `"paper sent to printer"`

### Build Settings:

```lua
settings =
{
    iphone =
    {
        plist =
        {
            UISupportedExternalAccessoryProtocols = {"com.datamaxoneil.spp", "com.AmpedRFTech.Demo"},
        },
    },
    plugins =
    {
        ["plugin.dataMax"] =
        {
            publisherId = "tech.scotth",
        },
    },
}
```

##### Helpful Links:
- [Get Plugin](https://solar2dmarketplace.com/plugins?Datamax_tech-scotth)
- [Example](https://github.com/scottrules44/dataMax-demo)
- [Support](https://forums.solar2d.com/c/corona-marketplace/13)
