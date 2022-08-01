import * as Types from "../../utils/Types"
import ApplicationInstance from "../../instance/ApplicationInstance"
import Server from "./Server"

export default class Database {
    public id: number
    public server: number
    public host: number
    public database: string
    public username: string
    public remote: string
    public max_connections: number
    public created_at: string
    public updated_at: string
    public relationships: any

    public raw: any

    constructor(private _client: ApplicationInstance, data: any, public _parentServer: Server) {
        const attributes = data.attributes
        this.id = attributes.id
        this.server = attributes.server
        this.host = attributes.host
        this.database = attributes.database
        this.username = attributes.username
        this.remote = attributes.remote
        this.max_connections = attributes.max_connections
        this.created_at = attributes.created_at
        this.updated_at = attributes.updated_at
        this.relationships = data.relationships ? data.relationships : {}
        this.raw = attributes
    }

    resetPassword() {
        return new Promise(async (resolve, reject) => {
            try {
                resolve(
                    await this._client.call({
                        endpoint: `servers/${this._parentServer.id}/databases/${this.id}/reset_password`,
                        method: "POST",
                    })
                )
            } catch (e) {
                reject(e)
            }
        })
    }

    delete() {
        return new Promise(async (resolve, reject) => {
            try {
                resolve(await this._client.call({ endpoint: `servers/${this._parentServer.id}/databases/${this.id}`, method: "DELETE" }))
            } catch (e) {
                reject(e)
            }
        })
    }
}
