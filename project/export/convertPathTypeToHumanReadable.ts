import type {PathType} from "./PathType.ts"

const translationMap = {
	"nonExisting"    : "Not Found",
	"file:regular"   : "Regular File",
	"file:fifo"      : "FIFO File",
	"file:block"     : "Block Device File",
	"file:character" : "Character Device File",
	"file:socket"    : "Socket File",
	"dir:regular"    : "Regular Directory",
	"link:file"      : "Symbolic link to a file",
	"link:dir"       : "Symbolic link to a directory",
	"link:broken"    : "Symbolic link broken"
} as const

type TranslationMap = typeof translationMap

export function convertPathTypeToHumanReadable<T extends PathType>(
	type: T
): TranslationMap[PathType] {
	return translationMap[type]
}
