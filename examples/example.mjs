import fs from "node:fs"
import fsGetPathType from "../src/index.mjs"

const entries = fs.readdirSync("examples/files")

for (const entry of entries) {
	console.log(entry, await fsGetPathType("examples", "files", entry))
}

console.log(await fsGetPathType("/non/existing/path"))
