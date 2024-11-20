import {implementationSync as implementation} from "#~auto/getTypeOfPathSync.mts"
import type {AnioJsDependencies, Signature} from "#~auto/getTypeOfPathSync.mts"
import type {UserContext} from "@fourtune/realm-js/v0/runtime"
import {getProject} from "@fourtune/realm-js/v0/project"
import {useContext} from "@fourtune/realm-js/v0/runtime"

export function getTypeOfPathSyncFactory(user: UserContext = {}) : Signature {
	const project = getProject()
	const context = useContext(project, user)

	const dependencies : AnioJsDependencies = {}

	return function(...args: Parameters<Signature>) : ReturnType<Signature> {
		return implementation(context, dependencies, ...args)
	}
}
