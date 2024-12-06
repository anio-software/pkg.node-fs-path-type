import {createContext} from "@fourtune/realm-js/v0/runtime"

// vvv--- types needed for implementation
import type {PathType} from "#~src/export/PathType.d.mts"
// ^^^--- types needed for implementation

import {getTypeOfPathSyncFactory as factory} from "#~auto/export/getTypeOfPathSyncFactory.mts"

const fn = factory(createContext())

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
export function getTypeOfPathSync(paths: string[] | string) : PathType {
	return fn(paths)
}
