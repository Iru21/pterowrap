import ClientInstance from "../../../instance/client"

import handlePagination from "../../../utils/handlepagination"
import * as Types from "../../../types"
import Server from "../../../structures/client/server"
import File from "../../../structures/client/server/file"

export default class FileManager {
    constructor(private client: ClientInstance, public _parentServer: Server) {}

    list(options: Types.requestParameters = {}): Promise<File[]> {
        return new Promise(async (resolve, reject) => {
            try {
                const list = await this.client.call({ endpoint: `servers/${this._parentServer.identifier}/files/list`, parameters: options })
                const r: File[] = []
                for (let i = 0; i < list.data.length; i++) {
                    const dir = options.other?.find((o) => o.key == "directory")?.value || "/"
                    r.push(new File(this.client, list.data[i], dir, this._parentServer))
                }
                resolve(r)
            } catch (e) {
                reject(e)
            }
        })
    }

    get(path: string): Promise<File | null> {
        return new Promise(async (resolve, reject) => {
            try {
                const pathtoarr = path.split("/")
                pathtoarr.pop()
                let pathto = pathtoarr.join("/") + "/"
                pathto = pathto.replace(/\//g, "%2F")

                const files = await this.list({ other: [{ key: "directory", value: pathto }] })
                const filename = path.substring(path.lastIndexOf("/") + 1)
                const found = files.find((f) => f.name == filename) || null
                resolve(found)
            } catch (e) {
                reject(e)
            }
        })
    }

    create(path: string, data: any): Promise<File> {
        return new Promise(async (resolve, reject) => {
            try {
                await this.client.call({
                    endpoint: `servers/${this._parentServer.identifier}/files/write?file=${path.replace(/\//g, "%2F")}`,
                    body: data,
                    method: "POST",
                })
                const f = await this.get(path)
                resolve(f!)
            } catch (e) {
                reject(e)
            }
        })
    }

    createFolder(path: string): Promise<File> {
        return new Promise(async (resolve, reject) => {
            try {
                const pathtoarr = path.split("/")
                pathtoarr.pop()
                await this.client.call({
                    endpoint: `servers/${this._parentServer.identifier}/files/create-folder`,
                    method: "POST",
                    body: {
                        root: pathtoarr.join("/") + "/",
                        name: path.substring(path.lastIndexOf("/") + 1),
                    },
                })
                const f = await this.get(path)
                resolve(f!)
            } catch (e) {
                reject(e)
            }
        })
    }

    retrieveUploadURL() {
        return new Promise(async (resolve, reject) => {
            try {
                resolve(
                    (
                        await this.client.call({
                            endpoint: `servers/${this._parentServer.identifier}/files/upload`,
                        })
                    ).attributes.url
                )
            } catch (e) {
                reject(e)
            }
        })
    }
}
