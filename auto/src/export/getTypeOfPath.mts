import {getTypeOfPathFactory as factory} from "#~auto/export/getTypeOfPathFactory.mts"

/* ImplementationDocType is needed to make doctypes work in LSP */
import type {ImplementationDocType} from "#~auto/ImplementationDocType.d.mts"

const impl = factory()

export const getTypeOfPath : ImplementationDocType = impl
