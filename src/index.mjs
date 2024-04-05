import sync_impl from "./auto/sync.mjs"
import async_impl from "./auto/async.mjs"

export function getTypeOfPath(...paths) {
	return async_impl(...paths)
}

export function getTypeOfPathSync(...paths) {
	return sync_impl(...paths)
}
