import {generateFactoryFiles} from "@fourtune/realm-js/v0/autogenerate"

export default {
	realm: "js",
	type: "package",

	autogenerate: {
		...generateFactoryFiles({
			source_file: "src/__getTypeOfPathXXX.as.mts",
			export_name: "getTypeOfPathXXX",
			destination: "src/export"
		})
	}
}
