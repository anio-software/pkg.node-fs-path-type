import {implementation, type AnioJsDependencies} from "#~auto/getTypeOfPathSync.mts"
import type {UserContext} from "@fourtune/realm-js/v0/runtime"
import {getProject} from "@fourtune/realm-js/v0/project"
import {useContext} from "@fourtune/realm-js/v0/runtime"
import type {PathType} from "#~src/export/PathType.d.mts"
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
declare function getTypeOfPathSync(
	paths: string[] | string
) : PathType

export function getTypeOfPathSyncFactory(user : UserContext = {}) : typeof getTypeOfPathSync {
	const project = getProject()
	const context = useContext(project, user)
	const dependencies : AnioJsDependencies = {}
	return function getTypeOfPathSync(paths: string[] | string) : PathType {
		return implementation(context, dependencies, paths)
	}
}
