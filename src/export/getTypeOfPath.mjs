import factory from "../auto/export/getTypeOfPathFactory.mjs"

const impl = factory()

export default async function getTypeOfPath(...args) {
	// @ts-ignore:next-line
	return await impl(...args)
}
