import fs from "@anio-fs/api"

import sync_impl from "./auto/sync.mjs"
import async_impl from "./auto/async.mjs"

export function getTypeOfPath(...paths) {
	return async_impl(fs.async, ...paths)
}

export function getTypeOfPathSync(...paths) {
	return sync_impl(fs.sync, ...paths)
}
