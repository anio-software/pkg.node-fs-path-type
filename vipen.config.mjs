import {generateFromTemplate} from "vipen/autogenerate"

const asyncToSync = {
	"async function tryStat": "function tryStat",
	"return await fs_object[fn](path)": "return fs_object[fn](path)",
	"export default async function": "export default function",
	"await tryStat(": "tryStat("
}

export default {
	realm: "js",
	type: "package",

	autogenerate: {
		"sync.mjs": generateFromTemplate("src/template.mjs", asyncToSync),
		"async.mjs": generateFromTemplate("src/template.mjs", {})
	}
}
