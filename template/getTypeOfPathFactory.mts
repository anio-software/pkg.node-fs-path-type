import {stat, lstat} from "@anio-fs/api/async"
//import {stat, lstat} from "@anio-fs/api/sync"
import path from "node:path"
import {useContext} from "@fourtune/realm-js"
import type {ContextInstanceType, UsableContextType} from "@fourtune/realm-js"
import fs from "node:fs"
import {PathType} from "../../export/PathType.mts"
import {getTypeOfPath as fn} from "./getTypeOfPath.mts"
//import {getTypeOfPathSync as fn} from "./getTypeOfPathSync.mts"

async function tryStat(path : string) : Promise<false | fs.Stats> {
//function tryStat(path : string) : false | fs.Stats {
	try {
		return await stat(path)
//		return stat(path)
	} catch (e : unknown) {
		const error = e as NodeJS.ErrnoException

		if (error.code === "ENOENT") return false

		throw error
	}
}

async function tryLinkStat(path : string) : Promise<false | fs.Stats> {
//function tryLinkStat(path : string) : false | fs.Stats {
	try {
		return await lstat(path)
//		return lstat(path)
	} catch (e : unknown) {
		const error = e as NodeJS.ErrnoException

		if (error.code === "ENOENT") return false

		throw error
	}
}

async function getTypeOfPathImplementation(context : ContextInstanceType, path_to_check : string) : Promise<PathType> {
//function getTypeOfPathImplementation(context : ContextInstanceType, path_to_check : string) : PathType {
	//
	// try lstat first in case path is a symbolic link
	//
	const lstat = await tryLinkStat(path_to_check)
//	const lstat = tryLinkStat(path_to_check)

	if (lstat === false) return PathType.nonExisting

	if (lstat.isSymbolicLink()) {
		const stat = await tryStat(path_to_check)
//		const stat = tryStat(path_to_check)

		if (stat === false) return PathType.brokenLink
		if (stat.isDirectory()) return PathType.linkToDir

		return PathType.linkToFile
	}

	if (lstat.isDirectory()) return PathType.regularDir

	return PathType.regularFile
}

export function getTypeOfPathFactory(context_or_options : UsableContextType = {}) : typeof fn {
//export function getTypeOfPathSyncFactory(context_or_options : UsableContextType = {}) : typeof fn {
	const context = useContext(context_or_options)

	return async function getTypeOfPath(paths : string[] | string) : ReturnType<typeof fn> {
//	return function getTypeOfPathSync(paths : string[] | string) : ReturnType<typeof fn> {
		const full_path = Array.isArray(paths) ? path.join(...paths) : paths

		const type = await getTypeOfPathImplementation(context, full_path)
//		const type = getTypeOfPathImplementation(context, full_path)

		context.log.trace(`type of "${full_path}" is "${type}"`)

		return type
	}
}
