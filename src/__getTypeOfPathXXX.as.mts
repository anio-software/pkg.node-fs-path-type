import type {ContextInstance} from "@fourtune/realm-js/v0/runtime"
import type {PathType} from "#~src/export/PathType.d.mts"

export type Signature = {
	/**
	 * @brief Asynchronously get the type of a path.
//>	 * @brief Synchronously get the type of a path.
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
	(paths : string[] | string) : Promise<PathType>
//>	(paths : string[] | string) : PathType
}

export type AnioJsDependencies = {}

import path from "node:path"
import fs from "node:fs"
import {stat, lstat} from "@anio-fs/api/async"
//>import {stat, lstat} from "@anio-fs/api/sync"

async function tryStat(path : string) : Promise<false | fs.Stats> {
//>function tryStat(path : string) : false | fs.Stats {
	try {
		return await stat(path)
//>		return stat(path)
	} catch (e : unknown) {
		const error = e as NodeJS.ErrnoException

		if (error.code === "ENOENT") return false

		throw error
	}
}

async function tryLinkStat(path : string) : Promise<false | fs.Stats> {
//>function tryLinkStat(path : string) : false | fs.Stats {
	try {
		return await lstat(path)
//>		return lstat(path)
	} catch (e : unknown) {
		const error = e as NodeJS.ErrnoException

		if (error.code === "ENOENT") return false

		throw error
	}
}

export async function implementation(
//>export function implementationSync(
	context : ContextInstance,
	dependencies : AnioJsDependencies,
	/* add additional parameters here */
	paths : string[] | string
) : ReturnType<Signature> {
	const path_to_check = Array.isArray(paths) ? path.join(...paths) : paths

	const r = (type : PathType) : PathType => {
		context.log.trace(`type of path "${path_to_check}" is "${type}".`)

		return type
	}

	//
	// try lstat first in case path is a symbolic link
	//
	const lstat = await tryLinkStat(path_to_check)
//>	const lstat = tryLinkStat(path_to_check)

	if (lstat === false) return r("nonExisting")

	if (lstat.isSymbolicLink()) {
		const stat = await tryStat(path_to_check)
//>		const stat = tryStat(path_to_check)

		if (stat === false) return r("brokenLink")
		if (stat.isDirectory()) return r("linkToDir")

		return r("linkToFile")
	}

	if (lstat.isDirectory()) return r("regularDir")

	return r("regularFile")
}
