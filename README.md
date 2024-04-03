# @anio-fs/path-type

Determine the type of a path.

|Type|Return value|
|---|---|
|Regular File|`file`|
|Regular Directory|`dir`|
|Link to a file|`link->file`|
|Link to a directory|`link->dir`|
|Dangling link|`link->broken`|
|Non existing path|`false`|

```js
import fs from "node:fs"
import {getTypeOfPath} from "@anio-fs/path-type"

const entries = fs.readdirSync("examples/files")

for (const entry of entries) {
	console.log(entry, await getTypeOfPath("examples", "files", entry))
}

console.log(await getTypeOfPath("/non/existing/path"))
```
