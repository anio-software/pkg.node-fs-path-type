import {implementation as implementation} from "#~auto/getTypeOfPath.mts"
import type {AnioJsDependencies, Signature} from "#~auto/getTypeOfPath.mts"
import type {UserContext} from "@fourtune/realm-js/v0/runtime"
import {getProject} from "@fourtune/realm-js/v0/project"
import {useContext} from "@fourtune/realm-js/v0/runtime"

export function getTypeOfPathFactory(user: UserContext = {}) : Signature {
	const project = getProject()
	const context = useContext(project, user)

	const dependencies : AnioJsDependencies = {}

	return async function(...args: Parameters<Signature>) : ReturnType<Signature> {
		return await implementation(context, dependencies, ...args)
	}
}
