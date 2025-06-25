import fs from "node:fs"
import {getTypeOfPath, getTypeOfPathSync} from "../products/project/dist/default/index.mjs"

const entries = fs.readdirSync("examples/files")

for (const entry of entries) {
	console.log(entry, await getTypeOfPath(["examples", "files", entry]))
	console.log(entry, getTypeOfPathSync(["examples", "files", entry]))
}

console.log(await getTypeOfPath("/non/existing/path"))
