import {stat, lstat} from "@anio-fs/api/async"
import path from "node:path"

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

export default async function(...args) {
	const path_to_check = path.join(...args)

	//
	// try lstat first in case path is a symbolic link
	//
	const lstat = await tryLinkStat(path_to_check)

	if (lstat === false) return false

	if (lstat.isSymbolicLink()) {
		const stat = await tryStat(path_to_check)

		if (stat === false) return "link->broken"
		if (stat.isDirectory()) return "link->dir"

		return "link->file"
	}

	if (lstat.isDirectory()) return "dir"

	return "file"
}
