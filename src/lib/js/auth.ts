import { session } from '$app/stores'
import { get } from 'svelte/store'

export const login = (username: string, password: string) =>
    fetch('/login', {
        method: 'POST',
        headers: { 'Accept': 'application/json' },
        body: JSON.stringify({username, password})
    })

export const logout = (fetch: Function) => 
    fetch('/logout', {
        method: 'POST',
        headers: { 'Accept': 'application/json' }
    })

export const isLoggedIn = (sess?: App.Session) => {
    return (sess || get(session))?.token ? true : false
}