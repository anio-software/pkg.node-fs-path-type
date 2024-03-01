import createFSObject from "@anio-js-foundation/node-fs-api"

import sync_impl from "./auto/sync.mjs"
import async_impl from "./auto/async.mjs"

const async_fs = createFSObject({sync: false})
const sync_fs = createFSObject({sync: true})

function nodeFsGetPathType(...args) {
	return async_impl(async_fs, ...args)
}

nodeFsGetPathType.sync = function(...args) {
	return sync_impl(sync_fs, ...args)
}

export default nodeFsGetPathType
