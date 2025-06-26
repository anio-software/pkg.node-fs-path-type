import type {PathType} from "./PathType.ts"

export type ValidPathType = Exclude<
	PathType, "error" | "nonExisting" | "link:error"
>
