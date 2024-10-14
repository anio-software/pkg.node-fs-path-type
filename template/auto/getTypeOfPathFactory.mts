// Warning: this file was automatically created by fourtune vXXXXX
// You will find more information about the specific fourtune version used inside the file src/auto/VERSION.txt
// You should commit this file to source control
import type {UserContextType} from "@fourtune/realm-js"
import {useContext} from "@fourtune/realm-js"

import type {DependenciesType} from "#/auto/DependenciesType.d.mts"
//import type {DependenciesType} from "#/auto/DependenciesSyncType.d.mts"

import implementation from "#/auto/implementation.mts"
//import implementation from "#/auto/implementationSync.mts"

/* needed to make doctypes work in LSP */
import type {ImplementationDocType} from "#/auto/ImplementationDocType.d.mts"
//import type {ImplementationDocType} from "#/auto/ImplementationSyncDocType.d.mts"


/* ImplementationDocType is needed to make doctypes work in LSP */
export function getTypeOfPathFactory(user : UserContextType = {}) : ImplementationDocType {
//export function getTypeOfPathSyncFactory(user : UserContextType = {}) : ImplementationDocType {
	const context = useContext(user)

	const dependencies : DependenciesType = {}

	return async function getTypeOfPath(...args: Parameters<ImplementationDocType>) : ReturnType<ImplementationDocType> {
//	return function getTypeOfPathSync(...args: Parameters<ImplementationDocType>) : ReturnType<ImplementationDocType> {
		return await implementation(context, dependencies, ...args)
//		return implementation(context, dependencies, ...args)
	}
}
