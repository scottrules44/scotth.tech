# Physics Body Editor Plugin

This plugin uses [Physics Body Editor](http://www.aurelienribon.com/blog/projects/physics-body-editor) to edit shapes of objects in Corona SDK. Click [here](https://forums.solar2d.com/t/physic-body-editor-plugin/336811) to learn how to install.

### Limitations:
Requires physics engine in Corona SDK to use (to see those limitations click [here](https://docs.coronalabs.com/guide/physics/limitations/index.html)). Also you have to install the Physics Body Editor.

### Functions:

#### physicsBodyEditor.loadShape(name, jsonFile, object, [friction], [density], [bounce], [filter], [directory])

#### name of object in json file
(required)(string) This is the name of the physics body you made in the Physics Body Editor.

#### json file
(required)(string) This is what you named the file.

#### object
(required)(Display Object) The display object you want to give the physics shape to.

#### friction
(optional)(number) What you would like the friction to be on the physics body. If set to nil it will be .3

#### density
(optional)(number) What you would like the density to be on the physics body. If set to nil it will be 1

#### bounce
(optional)(number) What you would like the bounce to be on the physics body. If set to nil it will be .2

#### filter
(optional)(table) Filter values. To find out more check out Corona SDK's guide [here](https://docs.coronalabs.com/daily/guide/physics/collisionDetection/index.html#collision-filtering)

#### directory
(optional)(constant) The path of the json file. Default is system.ResourceDirectory.

### Build Settings:

```lua
settings =
{
    plugins =
    {
        ["plugin.physicsBodyEditor"] =
        {
            publisherId = "tech.scotth",
            marketplaceId = "insert marketplace account ID",
        },
    },
}
```

##### Helpful Links:
- [Example](https://github.com/scottrules44/physics-body-editor-example/)
- [Forums Post and how to install](https://forums.solar2d.com/t/physic-body-editor-plugin/336811)
- [About Physics Bodies](https://docs.coronalabs.com/api/library/physics/addBody.html#multi-element-body)
- [Support](https://forums.solar2d.com)
- [Get Plugin](https://store.coronalabs.com/plugin/physics-body-editor)
