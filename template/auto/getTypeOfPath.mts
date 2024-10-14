// Warning: this file was automatically created by fourtune vXXXXX
// You will find more information about the specific fourtune version used inside the file src/auto/VERSION.txt
// You should commit this file to source control
import {getTypeOfPathFactory as factory} from "#/auto/export/getTypeOfPathFactory.mts"
//import {getTypeOfPathSyncFactory as factory} from "#/auto/export/getTypeOfPathSyncFactory.mts"

/* ImplementationDocType is needed to make doctypes work in LSP */
import type {ImplementationDocType} from "#/auto/ImplementationDocType.d.mts"
//import type {ImplementationDocType} from "#/auto/ImplementationSyncDocType.d.mts"

const impl = factory()

export const getTypeOfPath : ImplementationDocType = impl
//export const getTypeOfPathSync : ImplementationDocType = impl
