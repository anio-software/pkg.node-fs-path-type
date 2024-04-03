declare type PathType = false | "file" | "dir" | "link->file" | "link->dir" | "link->broken"

/**
 * @brief Asynchronously get the type of a path.
 * @description
 * Determines the type of supplied path.
 * Note: symbolic links are never resolved.
 * @return
 * The type of the path which can be the following values:
 * 
 * `false` - path does not exist
 * 
 * `file` - path is a file
 * 
 * `dir` - path is a directory
 * 
 * `link->file` - path is a symbolic link and points to a file
 * 
 * `link->dir` - path is a symbolic link and points to a directory
 * 
 * `link->broken` - path is a symbolic link and points to a non existing path
 */
export function getTypeOfPath(...paths : string[]) : Promise<PathType>

/**
 * @brief Synchronously get the type of a path.
 * @description
 * Determines the type of supplied path.
 * Note: symbolic links are never resolved.
 * @return
 * The type of the path which can be the following values:
 * 
 * `false` - path does not exist
 * 
 * `file` - path is a file
 * 
 * `dir` - path is a directory
 * 
 * `link->file` - path is a symbolic link and points to a file
 * 
 * `link->dir` - path is a symbolic link and points to a directory
 * 
 * `link->broken` - path is a symbolic link and points to a non existing path
 */
export function getTypeOfPathSync(...paths : string[]) : PathType
