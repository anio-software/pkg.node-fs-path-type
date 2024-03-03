import path from "node:path"

function tryStat(fs_object, path, fn = "lstat") {
	try {
		return fs_object[fn](path)
	} catch (error) {
		//
		// ENOENT means no such entry
		//
		if (error.code === "ENOENT") {
			return false
		}

		// re-throw every other error
		throw error
	}
}

export default function(fs_object, ...args) {
	const path_to_check = path.join(...args)

	const lstat = tryStat(fs_object, path_to_check)

	if (lstat === false) return false

	if (lstat.isSymbolicLink()) {
		const stat = tryStat(fs_object, path_to_check, "stat")

		if (stat === false) return "link->broken"
		if (stat.isDirectory()) return "link->dir"

		return "link->file"
	}

	if (lstat.isDirectory()) return "dir"

	return "file"
}
