import * as Types from "../../types"
import ClientInstance from "../../instance/client"
import Server from "./server"

export default class Database {
    public id: string
    public host: {
        adress: string
        port: number
    }
    public name: string
    public username: string
    public connections_from: string
    public max_connections: number
    public relationships: {
        [key: string]: any
    }

    public raw: any

    constructor(private _client: ClientInstance, data: any, public _parentServer: Server) {
        const attributes = data.attributes
        this.id = attributes.id
        this.host = attributes.host
        this.name = attributes.name
        this.username = attributes.username
        this.connections_from = attributes.connections_from
        this.max_connections = attributes.max_connections
        this.relationships = attributes.relationships ? attributes.relationships : {}

        this.raw = attributes
    }

    rotatePassword(): Promise<Database> {
        return new Promise(async (resolve, reject) => {
            try {
                resolve(new Database(this._client, (await this._client.call({ endpoint: `servers/${this._parentServer.identifier}/databases/${this.id}/rotate-password`, method: "POST" })).data, this._parentServer))
            } catch (e) {
                reject(e)
            }
        })
    }

    delete() {
        return new Promise(async (resolve, reject) => {
            try {
                resolve(await this._client.call({ endpoint: `servers/${this._parentServer.identifier}/databases/${this.id}`, method: "DELETE" }))
            } catch (e) {
                reject(e)
            }
        })
    }
}
