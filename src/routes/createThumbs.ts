import type { RequestHandler } from '@sveltejs/kit'
import { join as pathJoin, parse as parsePath } from 'path'
import { filesBase } from '$lib/config'
import gm from 'gm'
import crypto from 'crypto'

export const POST: RequestHandler = async ({ request }) => {
    let paths: string[]
    let thumbFileNames: Record<string, string> = {}
    try {
        paths = (await request.json() as string[])
            .map(p => pathJoin(filesBase, p))
        console.log('generating', thumbFileNames)
        await Promise.all(paths.map(p => new Promise((resolve, reject) => {
            console.log(`generating thumbnail for ${p}`)
            const base = parsePath(p).base
            const thumbFileName = `/thumbs/${crypto.createHash('md5').update(p).digest('hex')}.webp`
            gm(p)
                .resize(512, 512, '^')
                .gravity('Center')
                .extent(512, 512)
                .write(thumbFileName, error => {
                    if (error) {
                        console.error(error)
                        reject(error)
                    }
                    
                    thumbFileNames[base] = thumbFileName
                    resolve(thumbFileName)
                })
        })))
    } catch (err) {
        console.error(err)
    }

    return {
        status: 200,
        body: thumbFileNames
    }
}