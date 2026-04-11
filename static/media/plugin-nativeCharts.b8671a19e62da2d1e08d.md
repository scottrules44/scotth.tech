# Native Charts Plugin

This plugin allows you to create and display charts with native objects.

### Limitations:
Only works on iOS and Android. The plugin uses native objects, so all charts are rendered on top of Corona Display Objects (display.*).

### Functions:

#### nativeCharts.newChart(chartType, params)
Returns a chartObj.

chartType (string)(required) — supported types: "pie", "line", and "bar"
params (table) — x (number), y (number), width (number), height (number), listener (function) (see Events section)

### ChartObj Functions:

#### chartObj:setData(dataSet)
Set chart data.

##### dataSet for "pie" chartType:
dataSet tables inside array can have: colors (array of hex color strings), color (string hex color), axisDependency (string "left" or "right"), label (string), enableLabelOutside (boolean), valueTextSize (number), valueTextColor (string hex color), data (array of tables).
data tables inside array can have: value (number), label (string), data (string passed into Events)

```lua
--Pie Chart Set Data Example
local pieChart = nativeCharts.newChart("pie", {listener=chartCallback, x=display.contentCenterX, y=display.contentCenterY, width=200, height=200})
pieChart:setData({{colors={"#046681", "#337AFF"}, label="Cool Pie Chart", data={{value=20, label="Profit", data="profitPart"}, {value=80, label="Losses", data="lossesPart"}}}})
```

#### dataSet for "line" chartType:
dataSet tables inside array can have: colors (array of hex color strings), color (string hex color), alpha (number), barBorderWidth (number), formLineWidth (number), barBorderColor (string hex), barShadowColor (string hex), axisDependency (string "left" or "right"), label (string), valueTextSize (number), valueTextColor (string hex color), data (array of tables).
data tables inside array can have: x (number), y (number), data (string passed into Events)

```lua
--Line Chart Set Data Example
local lineChart = nativeCharts.newChart("line", {listener=chartCallback, x=display.contentCenterX, y=display.contentCenterY, width=150, height=200})
lineChart:setData({{color="#046681", lineWidth=2, circleColor="#09FF7D", label="Mexico", data={{x=20, y=20}, {x=30, y=30}, {x=50, y=50, data="mexicoBigNumber"}}}, {color="#337AFF", lineWidth=1.5, circleColor="#FF0909", label="USA", data={{x=10, y=10}, {x=20, y=15}, {x=30, y=20}}}})
```

#### dataSet for "bar" chartType:
dataSet tables inside array can have: colors (array of hex color strings), color (string hex color), circleColor (string hex color), lineWidth (number), alpha (number), axisDependency (string "left" or "right"), mode (string "stepped", "cubicBezier", "horizontalBezier", default: "linear"), label (string), valueTextSize (number), valueTextColor (string hex color), data (array of tables).
data tables inside array can have: x (number), y (number), data (string passed into Events)

```lua
--Bar Chart Set Data Example
local barChart = nativeCharts.newChart("bar", {listener=chartCallback, x=display.contentCenterX, y=display.contentCenterY, width=150, height=200})
barChart:setData({{color="#046681", barBorderWidth=2, formLineWidth=5, label="2020", data={{x=20, y=20}, {x=30, y=30}, {x=40, y=50, data="bigNumber2020"}}}, {color="#FF0909", barBorderWidth=2, formLineWidth=5, label="2021", data={{x=22, y=30}, {x=32, y=40}, {x=42, y=60}}}})
```

#### chartObj:setProperties(props)
Set chart properties.

props (table) for "pie": pieHoleRadiusPercent (number 0-1), pieHoleColor (string hex color), pieHoleVisible (boolean), enableRotation (boolean), rotation (number), pieShowPercentValue (boolean)

props (table) for "line" and "bar": gridLines (boolean, true is default), dragEnabled (boolean, true is default), pinchZoomEnabled (boolean, true is default), enableRightAxisGridLines (boolean), enableRightAxisLabels (boolean), setRightAxisLabelSize (number), setRightAxisLabelColor (string hex), setRightAxisMin (number), setRightAxisMax (number), setRightAxisLabels (table with key=number, value=label string), enableLeftAxisGridLines (boolean), enableLeftAxisLabels (boolean), setLeftAxisLabelSize (number), setLeftAxisLabelColor (string hex), setLeftAxisMin (number), setLeftAxisMax (number), setLeftAxisLabels (table with key=number, value=label string)

props (table) for all charts: enableXAxisGridLines (boolean), setXAxisLabelSize (number), enableXAxisLabels (boolean), setXAxisLabelColor (string hex), setXAxisMin (number), setXAxisMax (number), setXAxisLabels (table with key=number, value=label string), legendEnabled (boolean), backgroundColor (string hex), legendTextColor (string hex), legendFontSize (number), chartDescription (string), chartDescriptionEnabled (boolean), chartDescriptionColor (string hex), enableInteraction (boolean)

```lua
--Pie Chart
local pieChart = nativeCharts.newChart("pie", {listener=chartCallback, x=display.contentCenterX, y=display.contentCenterY, width=200, height=200})
pieChart:setData({{colors={"#046681", "#337AFF"}, label="Cool Pie Chart", data={{value=20, label="Profit", data="profitPart"}, {value=80, label="Losses", data="lossesPart"}}}})
pieChart:setProperties({pieHoleRadiusPercent=0, pieHoleColor="#ffffff", pieHoleVisible=false, rotation=190, enableRotation=false, pieShowPercentValue=true}) -- radius between 0-1


--Line Chart
local lineChart = nativeCharts.newChart("line", {listener=chartCallback, x=display.contentCenterX, y=display.contentCenterY, width=150, height=200})
lineChart:setData({{color="#046681", lineWidth=2, circleColor="#09FF7D", label="Mexico", data={{x=20, y=20}, {x=30, y=30}, {x=50, y=50, data="mexicoBigNumber"}}}, {color="#337AFF", lineWidth=1.5, circleColor="#FF0909", label="USA", data={{x=10, y=10}, {x=20, y=15}, {x=30, y=20}}}})
lineChart:setProperties({gridLines=false, pinchZoomEnabled=false, dragEnabled=false, enableRightAxisGridLines=false, setRightAxisLabelSize=20, setRightAxisLabelColor="#337AFF", setRightAxisMin=2, setRightAxisMax=100, setRightAxisLabels={[20]="test1", [40]="test2", [60]="test3"}, enableLeftAxisGridLines=false, setLeftAxisLabelSize=20, setLeftAxisLabelColor="#337AFF", setLeftAxisMin=2, setLeftAxisLabels={[20]="test1", [40]="test2", [60]="test3"}})

--Bar Chart
local barChart = nativeCharts.newChart("bar", {listener=chartCallback, x=display.contentCenterX, y=display.contentCenterY, width=150, height=200})
barChart:setData({{color="#046681", barBorderWidth=2, formLineWidth=5, label="2020", data={{x=20, y=20}, {x=30, y=30}, {x=40, y=50, data="bigNumber2020"}}}, {color="#FF0909", barBorderWidth=2, formLineWidth=5, label="2021", data={{x=22, y=30}, {x=32, y=40}, {x=42, y=60}}}})
barChart:setProperties({gridLines=false, pinchZoomEnabled=false, dragEnabled=false, enableRightAxisGridLines=true, enableRightAxisLabels=true, setRightAxisLabelSize=8, setRightAxisLabelColor="#337AFF", setRightAxisMin=2, setRightAxisMax=100, setRightAxisLabels={[20]="test1", [40]="test2", [60]="test3"}, enableLeftAxisGridLines=true, enableLeftAxisLabels=true, setLeftAxisLabelSize=8, setLeftAxisLabelColor="#337AFF", setLeftAxisMin=2, setLeftAxisLabels={[20]="test1", [40]="test2", [60]="test3"}})
```

#### chartObj:clearSelection()
Clear the selection for the chart.

#### chartObj:destroy()
Destroy/remove the chart.

### Events:

The following user interaction event data are returned for the listener set in .newChart:
- event.phase (string) — either "selected" or "unselected"
- event.data (string) — set in data tables in chartObj:setData()
- event.description (string)

If the chart type is "pie": event.value (number), event.label (string)
If the chart type is "line" or "bar": event.x (number), event.y (number)

Note: no other event data is returned when event.phase == "unselected"

### Build Settings:

```lua
settings =
{
    plugins =
    {
        ["plugin.nativeCharts"] =
        {
            publisherId = "tech.scotth",
            marketplaceId = "insert marketplace account ID",
        },
    },
}
```

##### Helpful Links:
- [Get Plugin](https://solar2dmarketplace.com/plugins?NativeCharts_tech-scotth)
- [Example](https://github.com/scottrules44/nativeCharts-demo)
- [Support](https://forums.solar2d.com/c/corona-marketplace/13)
