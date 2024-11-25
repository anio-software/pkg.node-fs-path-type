import {useContext, type UserContext} from "@fourtune/realm-js/v0/runtime"
import {getProject} from "@fourtune/realm-js/v0/project"
import type {AnioJsDependencies} from "#~auto/getTypeOfPath.mts"
import {implementation} from "#~auto/getTypeOfPath.mts"
import type {ContextInstance} from "@fourtune/realm-js/v0/runtime"
import type {PathType} from "#~src/export/PathType.d.mts"

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
export type Signature = (
	/* add additional parameters here */
	paths: string[] | string
) => Promise<PathType>

export function getTypeOfPathFactory(user: UserContext = {}) : Signature {
	const project = getProject()
	const context = useContext(project, user)
	const dependencies : AnioJsDependencies = {}

	return async function getTypeOfPath(paths : string[] | string) {
		return await implementation(context, dependencies, paths)
	}
}
