import factory from "../auto/export/getTypeOfPathSyncFactory.mjs"

const impl = factory()

export default function getTypeOfPathSync(...args) {
	// @ts-ignore:next-line
	return impl(...args)
}
