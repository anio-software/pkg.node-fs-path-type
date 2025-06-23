# @anio-software/pkg.node-fs-path-type

Determine the type of a path.

|Type|Return value|
|---|---|
|Regular file|`file:regular`|
|FIFO file|`file:fifo`|
|Block device|`file:block`|
|Character device|`file:character`|
|Socket file|`file:socket`|
|Regular directory|`dir:regular`|
|Link to a file|`link:file`|
|Link to a directory|`link:dir`|
|Dangling link|`link:broken`|
|Non existing path|`nonExisting`|
|Error|`error`|


```js
import fs from "node:fs"
import {getTypeOfPath} from "@aniojs/node-fs-path-type"

const entries = fs.readdirSync("examples/files")

for (const entry of entries) {
	console.log(entry, await getTypeOfPath("examples", "files", entry))
}

console.log(await getTypeOfPath("/non/existing/path"))
```
