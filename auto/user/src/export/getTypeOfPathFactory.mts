import {implementation} from "#~synthetic/getTypeOfPath.mts"
import type {RuntimeWrappedContextInstance} from "@fourtune/realm-js/runtime"
import {getProject} from "@fourtune/realm-js/v0/project"

// vvv--- types needed for implementation
import type {PathType} from "#~src/export/PathType.d.mts"
/* couldn't find the type 'Promise' at the top level */
// ^^^--- types needed for implementation

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
	const project = getProject()
	const local_context : RuntimeWrappedContextInstance = {
		...context,
		_package: {
			name: project.package_json.name,
			version: project.package_json.version,
			author: project.package_json.author,
			license: project.package_json.license
		}
	}

	return async function getTypeOfPath(paths: string[] | string) : Promise<PathType> {
		return await implementation(local_context, paths)
	}
}
