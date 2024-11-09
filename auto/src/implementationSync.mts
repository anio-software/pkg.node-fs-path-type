/* -------- required imports by template -------- */
import type {ContextInstance} from "@fourtune/realm-js/v0/runtime"
import type {DependenciesType} from "#~auto/DependenciesSyncType.d.mts"

import type {ImplementationDocType} from "#~auto/ImplementationSyncDocType.d.mts"
/* -------- required imports by template -------- */

import path from "node:path"
import fs from "node:fs"
import type {PathType} from "#~src/export/PathType.d.mts"
import {stat, lstat} from "@anio-fs/api/sync"

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

export default function(
	context : ContextInstance,
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
	const lstat = tryLinkStat(path_to_check)

	if (lstat === false) return r("nonExisting")

	if (lstat.isSymbolicLink()) {
		const stat = tryStat(path_to_check)

		if (stat === false) return r("brokenLink")
		if (stat.isDirectory()) return r("linkToDir")

		return r("linkToFile")
	}

	if (lstat.isDirectory()) return r("regularDir")

	return r("regularFile")
}
