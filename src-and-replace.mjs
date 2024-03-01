export default [{
	file: "./src/template.mjs",
	items: {
		"export default async function": "export default function",
		"async function tryStat": "function tryStat",
		"await fs_object[fn](path)": "fs_object[fn](path)",
		"await tryStat(": "tryStat("
	},
	output: "./src/auto/sync.mjs"
}, {
	file: "./src/template.mjs",
	items: {},
	output: "./src/auto/async.mjs"
}]
