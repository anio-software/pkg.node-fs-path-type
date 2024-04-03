import fs from "node:fs"
import {getTypeOfPath} from "../src/index.mjs"

const entries = fs.readdirSync("examples/files")

for (const entry of entries) {
	console.log(entry, await getTypeOfPath("examples", "files", entry))
}

console.log(await getTypeOfPath("/non/existing/path"))
