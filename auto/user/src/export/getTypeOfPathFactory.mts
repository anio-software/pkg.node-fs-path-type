import {implementation, type AnioJsDependencies} from "#~auto/getTypeOfPath.mts"
import type {RuntimeWrappedContextInstance} from "@fourtune/realm-js/runtime"

// vvv types needed for function signature
import type {PathType} from "#~src/export/PathType.d.mts"
// ^^^ types needed for function signature

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
declare function getTypeOfPath(
	paths: string[] | string
) : Promise<PathType>

/**
 * @brief
 * Create an instance of the function 'getTypeOfPath'.
 *
 * @param user
 * Options object (see @fourtune/realm-js/v0/runtime) or an already
 * created context with createContext().
 * This parameter is optional.
 *
 * @return
 * An instance of the function 'getTypeOfPath'.
 */
export function getTypeOfPathFactory(context: RuntimeWrappedContextInstance) : typeof getTypeOfPath {
	const dependencies : AnioJsDependencies = {}

	return async function getTypeOfPath(paths: string[] | string) : Promise<PathType> {
		return await implementation(context, dependencies, paths)
	}
}
