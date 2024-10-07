import {generateSyncAsyncVariant} from "fourtune/autogenerate"

export default {
	realm: "js",
	type: "package",

	autogenerate: {
		"export/getTypeOfPathFactory.mts": generateSyncAsyncVariant("template/getTypeOfPathFactory.mts", "async"),
		"export/getTypeOfPathSyncFactory.mts": generateSyncAsyncVariant("template/getTypeOfPathFactory.mts", "sync"),

		"export/getTypeOfPath.mts": generateSyncAsyncVariant("template/getTypeOfPath.mts", "async"),
		"export/getTypeOfPathSync.mts": generateSyncAsyncVariant("template/getTypeOfPath.mts", "sync")
	}
}
