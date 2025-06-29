import {
	type EnkoreJSRuntimeContextOptions,
	createContext
} from "@anio-software/enkore.js-runtime"

import type {PathType} from "#~export/PathType.ts"

import path from "node:path"
import fs from "node:fs"
import {stat, lstat} from "@anio-software/pkg-private.node-consistent-fs/async"
//>import {stat, lstat} from "@anio-software/pkg-private.node-consistent-fs/sync"

async function tryStat(path: string): Promise<"error" | "nonExisting" | fs.Stats> {
//>function tryStat(path: string): "error" | "nonExisting" | fs.Stats {
	try {
		return await stat(path)
//>		return stat(path)
	} catch (e: unknown) {
		const error = e as NodeJS.ErrnoException

		if (error.code === "ENOENT") return "nonExisting"

		return "error"
	}
}

async function tryLinkStat(path: string): Promise<"error" | "nonExisting" | fs.Stats> {
//>function tryLinkStat(path: string): "error" | "nonExisting" | fs.Stats {
	try {
		return await lstat(path)
//>		return lstat(path)
	} catch (e: unknown) {
		const error = e as NodeJS.ErrnoException

		if (error.code === "ENOENT") return "nonExisting"

		return "error"
	}
}

/**
 * @brief Asynchronously get the type of a path.
//> * @brief Synchronously get the type of a path.
 * @description
 * Determines the type of supplied path.
 * Note: symbolic links are never resolved.
 * @return
 * The type of the path which can be the following values:
 * 
 * `nonExisting` - path does not exist
 * 
 * `error` - an error occurred
 * 
 * `file:regular` - path is a file
 * 
 * `dir:regular` - path is a directory
 * 
 * `link:file` - path is a symbolic link and points to a file
 * 
 * `link:dir` - path is a symbolic link and points to a directory
 * 
 * `link:broken` - path is a symbolic link and points to a non existing path
 * 
 * `link:error` - an error occurred while trying to resolve the symbolic link
 */
export async function __implementation(
//>export function __implementationSync(
	contextOptions: EnkoreJSRuntimeContextOptions,
	/* add additional parameters here */
	paths: string[] | string
): Promise<PathType> {
//>): PathType {
	const context = createContext(contextOptions, 0)

	const pathToCheck = Array.isArray(paths) ? path.join(...paths) : paths

	const r = (type: PathType): PathType => {
		context.log.trace(`type of path "${pathToCheck}" is "${type}".`)

		return type
	}

	//
	// try lstat first in case path is a symbolic link
	//
	const lstat = await tryLinkStat(pathToCheck)
//>	const lstat = tryLinkStat(pathToCheck)

	if (lstat === "nonExisting") return r("nonExisting")
	if (lstat === "error") return r("error")

	if (lstat.isSymbolicLink()) {
		const stat = await tryStat(pathToCheck)
//>		const stat = tryStat(pathToCheck)

		if (stat === "nonExisting") return r("link:broken")
		if (stat === "error") return r("link:error")
		if (stat.isDirectory()) return r("link:dir")

		return r("link:file")
	}

	if (lstat.isDirectory()) return r("dir:regular")

	if (lstat.isFIFO()) return r("file:fifo")
	if (lstat.isBlockDevice()) return r("file:block")
	if (lstat.isCharacterDevice()) return r("file:character")
	if (lstat.isSocket()) return r("file:socket")

	return r("file:regular")
}
