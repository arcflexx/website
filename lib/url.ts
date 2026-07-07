export function encodeSlash(value: string): string {
	return value.replace(/\//g, "%2F");
}

