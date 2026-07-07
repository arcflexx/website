export function encodeSlash(value: string | null | undefined): string {
	return String(value ?? "").replace(/\//g, "%2F");
}

