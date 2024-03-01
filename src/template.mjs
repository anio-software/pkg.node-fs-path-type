import path from "node:path"

async function tryStat(fs_object, path, fn = "lstat") {
	try {
		const stat = await fs_object[fn](path)

		return stat
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

export default async function(fs_object, ...args) {
	const path_to_check = path.join(...args)

	const lstat = await tryStat(fs_object, path_to_check)

	if (lstat === false) return false

	if (lstat.isSymbolicLink()) {
		const stat = await tryStat(fs_object, path_to_check, "stat")

		if (stat === false) return "link->broken"
		if (stat.isDirectory()) return "link->dir"

		return "link->file"
	}

	if (lstat.isDirectory()) return "dir"

	return "file"
}
