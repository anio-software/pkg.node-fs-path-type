import {stat, lstat} from "@anio-fs/api/sync"
import path from "node:path"
import {useContext} from "@fourtune/realm-js"
import type {ContextInstanceType, UsableContextType} from "@fourtune/realm-js"
import fs from "node:fs"
import PathType from "../../export/PathType.mts"
import fn from "./getTypeOfPathSync.mts"

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

function getTypeOfPathImplementation(context : ContextInstanceType, ...args : string[]) : PathType {
	const path_to_check = path.join(...args)

	//
	// try lstat first in case path is a symbolic link
	//
	const lstat = tryLinkStat(path_to_check)

	if (lstat === false) return PathType.nonExisting

	if (lstat.isSymbolicLink()) {
		const stat = tryStat(path_to_check)

		if (stat === false) return PathType.brokenLink
		if (stat.isDirectory()) return PathType.linkToDir

		return PathType.linkToFile
	}

	if (lstat.isDirectory()) return PathType.regularDir

	return PathType.regularFile
}

export default function(context_or_options : UsableContextType = {}) : typeof fn {
	const context = useContext(context_or_options)

	return function getTypeOfPathSync(...paths : string[]) : ReturnType<typeof fn> {
		const type = getTypeOfPathImplementation(context, ...paths)

		context.log.trace(`type of "${path.join(...paths)}" is "${type}"`)

		return type
	}
}
