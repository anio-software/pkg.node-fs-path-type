import {stat, lstat} from "@anio-fs/api/async"
import path from "node:path"
import {useContext} from "@fourtune/realm-js"

async function tryStat(path) {
	try {
		return await stat(path)
	} catch (error) {
		if (error.code === "ENOENT") return false

		throw error
	}
}

async function tryLinkStat(path) {
	try {
		return await lstat(path)
	} catch (error) {
		if (error.code === "ENOENT") return false

		throw error
	}
}

/**
 * @param {import("@fourtune/realm-js").ContextInstanceType} context
 */
async function getTypeOfPathImplementation(context, ...args) {
	const path_to_check = path.join(...args)

	//
	// try lstat first in case path is a symbolic link
	//
	const lstat = await tryLinkStat(path_to_check)

	if (lstat === false) return "nonExisting"

	if (lstat.isSymbolicLink()) {
		const stat = await tryStat(path_to_check)

		if (stat === false) return "brokenLink"
		if (stat.isDirectory()) return "linkToDir"

		return "linkToFile"
	}

	if (lstat.isDirectory()) return "dir"

	return "file"
}

export default function(context_or_options = {}) {
	const context = useContext(context_or_options)

	return async function getTypeOfPath(...paths) {
		return await getTypeOfPathImplementation(context, ...paths)
	}
}
