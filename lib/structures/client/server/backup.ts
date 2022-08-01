import * as Types from "../../../utils/Types"
import ClientInstance from "../../../instance/ClientInstance"
import Server from "../Server"

export default class Backup {
    public uuid: string
    public name: string
    public ignored_files: string[]
    public sha256_hash: string
    public bytes: number
    public created_at: string
    public completed_at: string

    public raw: any

    constructor(private _client: ClientInstance, data: any, public _parentServer: Server) {
        const attributes = data.attributes
        this.uuid = attributes.uuid
        this.name = attributes.name
        this.ignored_files = attributes.ignored_files
        this.sha256_hash = attributes.sha256_hash
        this.bytes = attributes.bytes
        this.created_at = attributes.created_at
        this.completed_at = attributes.completed_at

        this.raw = attributes
    }

    retrieveDownloadLink(): Promise<string> {
        return new Promise(async (resolve, reject) => {
            try {
                resolve(await this._client.call({ endpoint: `servers/${this._parentServer.identifier}/backups/${this.uuid}/download` }))
            } catch (e) {
                reject(e)
            }
        })
    }

    delete() {
        return new Promise(async (resolve, reject) => {
            try {
                resolve(await this._client.call({ endpoint: `servers/${this._parentServer.identifier}/backups/${this.uuid}`, method: "DELETE" }))
            } catch (e) {
                reject(e)
            }
        })
    }
}
