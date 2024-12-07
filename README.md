# @aniojs/node-fs-path-type

Determine the type of a path.

|Type|Return value|
|---|---|
|Regular File|`regularFile`|
|Regular Directory|`regularDir`|
|Link to a file|`linkToFile`|
|Link to a directory|`linktToDir`|
|Dangling link|`brokenLink`|
|Non existing path|`nonExisting`|

```js
import fs from "node:fs"
import {getTypeOfPath} from "@aniojs/node-fs-path-type"

const entries = fs.readdirSync("examples/files")

for (const entry of entries) {
	console.log(entry, await getTypeOfPath("examples", "files", entry))
}

console.log(await getTypeOfPath("/non/existing/path"))
```
