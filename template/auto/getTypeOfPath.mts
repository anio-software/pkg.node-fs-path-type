// Warning: this file was automatically created by fourtune vXXXXX
// You will find more information about the specific fourtune version used inside the file src/auto/VERSION.txt
// You should commit this file to source control
import {getTypeOfPathFactory as factory} from "./getTypeOfPathFactory.mts"
//import {getTypeOfPathSyncFactory as factory} from "./getTypeOfPathSyncFactory.mts"

/* ImplementationDocType is needed to make doctypes work in LSP */
import type {ImplementationDocType} from "./_implementation.mts"
//import type {ImplementationDocType} from "./_implementationSync.mts"

const impl = factory()

export const getTypeOfPath : ImplementationDocType = impl
//export const getTypeOfPathSync : ImplementationDocType = impl
