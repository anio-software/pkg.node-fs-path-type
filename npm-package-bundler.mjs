export default {
	preprocessing: [{
		file: "./src/template.mjs",
		items: {
			"async function tryStat": "function tryStat",
			"return await fs_object[fn](path)": "return fs_object[fn](path)",
			"export default async function": "export default function",
			"await tryStat(": "tryStat("
		},
		output: "./src/auto/sync.mjs"
	}, {
		file: "./src/template.mjs",
		items: {},
		output: "./src/auto/async.mjs"
	}]
}
