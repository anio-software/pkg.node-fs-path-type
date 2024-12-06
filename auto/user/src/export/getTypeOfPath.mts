import {createContext} from "@fourtune/realm-js/v0/runtime"

// vvv--- types needed for implementation
import type {PathType} from "#~src/export/PathType.d.mts"
/* couldn't find the type 'Promise' at the top level */
// ^^^--- types needed for implementation

import {getTypeOfPathFactory as factory} from "#~auto/export/getTypeOfPathFactory.mts"

const fn = factory(createContext())

/**
 * @brief Asynchronously get the type of a path.
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
export async function getTypeOfPath(paths: string[] | string) : Promise<PathType> {
	return await fn(paths)
}
