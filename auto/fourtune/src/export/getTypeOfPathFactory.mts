import {
	getProjectPackageJSON,
	getFourtuneConfiguration
} from "@fourtune/realm-js/v0/project"

import type {UserContext} from "@fourtune/realm-js/v0/runtime"
import {useContext} from "@fourtune/realm-js/v0/runtime"

import type {DependenciesType} from "#~auto/fourtune/async.sync/getTypeOfPath/DependenciesType.d.mts"

import implementation from "#~auto/fourtune/async.sync/getTypeOfPath/implementation.mts"

/* needed to make doctypes work in LSP */
import type {ImplementationDocType} from "#~auto/fourtune/async.sync/getTypeOfPath/ImplementationDocType.d.mts"


/* ImplementationDocType is needed to make doctypes work in LSP */
export function getTypeOfPathFactory(user : UserContext = {}) : ImplementationDocType {
	const project = {
		package_json: getProjectPackageJSON(),
		fourtune_configuration: getFourtuneConfiguration()
	}

	const context = useContext(project, user)

	const dependencies : DependenciesType = {}

	return async function getTypeOfPath(...args: Parameters<ImplementationDocType>) : ReturnType<ImplementationDocType> {
		return await implementation(context, dependencies, ...args)
	}
}
