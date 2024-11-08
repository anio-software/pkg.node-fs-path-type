import {getTypeOfPathSyncFactory as factory} from "#~auto/export/getTypeOfPathSyncFactory.mts"

/* ImplementationDocType is needed to make doctypes work in LSP */
import type {ImplementationDocType} from "#~auto/ImplementationSyncDocType.d.mts"

const impl = factory()

export const getTypeOfPathSync : ImplementationDocType = impl
