/* -------- required imports by template -------- */
import type {ContextInstanceType} from "@fourtune/realm-js"
import type {DependenciesType} from "#/auto/export/_DependenciesType.d.mts"

import type {ImplementationDocType} from "#/auto/export/_ImplementationDocType.d.mts"
/* -------- required imports by template -------- */

import path from "node:path"
import fs from "node:fs"
import {PathType} from "#/export/PathType.mts"
import {stat, lstat} from "@anio-fs/api/async"

async function tryStat(path : string) : Promise<false | fs.Stats> {
	try {
		return await stat(path)
	} catch (e : unknown) {
		const error = e as NodeJS.ErrnoException

		if (error.code === "ENOENT") return false

		throw error
	}
}

async function tryLinkStat(path : string) : Promise<false | fs.Stats> {
	try {
		return await lstat(path)
	} catch (e : unknown) {
		const error = e as NodeJS.ErrnoException

		if (error.code === "ENOENT") return false

		throw error
	}
}

export default async function(
	context : ContextInstanceType,
	dependencies : DependenciesType,
	/* add additional parameters here */
	paths : string[] | string
) : ReturnType<ImplementationDocType> {
	const path_to_check = Array.isArray(paths) ? path.join(...paths) : paths

	const r = (type : PathType) : PathType => {
		context.log.trace(`type of path "${path_to_check}" is "${type}".`)

		return type
	}

	//
	// try lstat first in case path is a symbolic link
	//
	const lstat = await tryLinkStat(path_to_check)

	if (lstat === false) return r(PathType.nonExisting)

	if (lstat.isSymbolicLink()) {
		const stat = await tryStat(path_to_check)

		if (stat === false) return r(PathType.brokenLink)
		if (stat.isDirectory()) return r(PathType.linkToDir)

		return r(PathType.linkToFile)
	}

	if (lstat.isDirectory()) return r(PathType.regularDir)

	return r(PathType.regularFile)
}
