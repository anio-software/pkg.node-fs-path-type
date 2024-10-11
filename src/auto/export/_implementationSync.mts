import {ContextInstanceType} from "@fourtune/realm-js"
import type {DependenciesType} from "./_DependenciesSyncType.d.mts"

import {PathType} from "../../export/PathType.mts"

export type ImplementationDocType = {
	/**
	 * @brief Synchronously get the type of a path.
	 * @description
	 * Determines the type of supplied path.
	 * Note: symbolic links are never resolved.
	 * @return
	 * The type of the path which can be the following values:
	 * 
	 * `nonExisting` - path does not exist
	 * 
	 * `regularFile` - path is a file
	 * 
	 * `regularDir` - path is a directory
	 * 
	 * `linkToFile` - path is a symbolic link and points to a file
	 * 
	 * `linkToDir` - path is a symbolic link and points to a directory
	 * 
	 * `brokenLink` - path is a symbolic link and points to a non existing path
	 */
	(paths : string[] | string) : PathType
}

import {stat, lstat} from "@anio-fs/api/sync"
import path from "node:path"
import fs from "node:fs"

function tryStat(path : string) : false | fs.Stats {
	try {
		return stat(path)
	} catch (e : unknown) {
		const error = e as NodeJS.ErrnoException

		if (error.code === "ENOENT") return false

		throw error
	}
}

function tryLinkStat(path : string) : false | fs.Stats {
	try {
		return lstat(path)
	} catch (e : unknown) {
		const error = e as NodeJS.ErrnoException

		if (error.code === "ENOENT") return false

		throw error
	}
}

export default function(context : ContextInstanceType, dependencies : DependenciesType, paths: string | string[]) : PathType {

	const path_to_check = Array.isArray(paths) ? path.join(...paths) : paths

	const r = (type : PathType) : PathType => {
		context.log.trace(`type of path "${path_to_check}" is "${type}".`)

		return type
	}

	//
	// try lstat first in case path is a symbolic link
	//
	const lstat = tryLinkStat(path_to_check)

	if (lstat === false) return r(PathType.nonExisting)

	if (lstat.isSymbolicLink()) {
		const stat = tryStat(path_to_check)

		if (stat === false) return r(PathType.brokenLink)
		if (stat.isDirectory()) return r(PathType.linkToDir)

		return r(PathType.linkToFile)
	}

	if (lstat.isDirectory()) return r(PathType.regularDir)

	return r(PathType.regularFile)
}
