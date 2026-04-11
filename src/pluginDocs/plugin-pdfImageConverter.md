# Pdf Image Converter Plugin

This plugin allows you to convert image to a pdf and a pdf to an image.

### Platforms:
iOS and Android

### Functions:

#### pdfImageConverter.toImage(pdfFile, pageNum, imagePath)
Convert pdf to image.

pdfFile (string)(required) — path to import pdf file via [pathForFile](https://docs.coronalabs.com/api/library/system/pathForFile.html)

pageNum (number) — page number to render (default is 0)

imagePath (string)(required) — path to export image file via [pathForFile](https://docs.coronalabs.com/api/library/system/pathForFile.html)

#### pdfImageConverter.getPageTotal(pdfFile)
Returns pdf page total (number).

pdfFile (string)(required) — path to pdf file via [pathForFile](https://docs.coronalabs.com/api/library/system/pathForFile.html)

#### pdfImageConverter.toPdf(imagePath, pdfFile)
Convert image to pdf.

imagePath (string)(required) — path to import image file via [pathForFile](https://docs.coronalabs.com/api/library/system/pathForFile.html)

pdfFile (string)(required) — path to export pdf file via [pathForFile](https://docs.coronalabs.com/api/library/system/pathForFile.html)

#### pdfImageConverter.combinePdf(pdf1, pdf2, outputPDF)
Combines 2 pdfs.

pdf1 (string)(required) — path to combine first pdf file via [pathForFile](https://docs.coronalabs.com/api/library/system/pathForFile.html)

pdf2 (string)(required) — path to combine second pdf file via [pathForFile](https://docs.coronalabs.com/api/library/system/pathForFile.html)

outputPDF (string)(required) — path to export pdf file via [pathForFile](https://docs.coronalabs.com/api/library/system/pathForFile.html)

### Build Settings:

```lua
settings =
{
    plugins =
    {
        ["plugin.pdfImageConverter"] =
        {
            publisherId = "tech.scotth",
            marketplaceId = "insert marketplace account ID",
        },
    },
}
```

##### Helpful Links:
- [Get Plugin](https://solar2dmarketplace.com/plugins?PdfImageConverter_tech-scotth)
- [Example](https://github.com/scottrules44/pdfImageConverter-demo)
- [Support](https://forums.solar2d.com/c/corona-marketplace/13)
