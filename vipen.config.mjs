import {searchAndReplace, copyFile} from "vipen/processing"

const asyncToSync = {
	"async function tryStat": "function tryStat",
	"return await fs_object[fn](path)": "return fs_object[fn](path)",
	"export default async function": "export default function",
	"await tryStat(": "tryStat("
}

export default {
	realm: "js",
	type: "package",

	preprocessing: [
		searchAndReplace("src/template.mjs", asyncToSync, "src/auto/sync.mjs"),
		copyFile("src/template.mjs", "src/auto/async.mjs")
	]
}
