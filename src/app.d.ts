/// <reference types="@sveltejs/kit" />

type ArtItem = {
	fileName: string,
	description: string,
	artistLink: string,
}
type ArtList = Array<ArtItem>

// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
// and what to do when importing types
declare namespace App {
	interface Locals {
		token: string
	}
	// interface Platform {}
	interface Session {
		token?: string
	}
	// interface Stuff {}
}

declare namespace svelte.JSX {
	interface HTMLAttributes<T> {
        show?: BoolString
    }
	interface Headers {
		cookie: Record<string, string>
	}
}

declare module '@fortawesome/free-solid-svg-icons/index.es' {
	export * from '@fortawesome/free-solid-svg-icons'
}

declare module '@fortawesome/free-brands-svg-icons/index.es' {
	export * from '@fortawesome/free-brands-svg-icons'
}

declare module 'svelte-image-gallery'