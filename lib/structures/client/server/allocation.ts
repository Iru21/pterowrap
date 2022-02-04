import * as Types from "../../../types"
import ClientInstance from "../../../instance/client"
import Server from "../server"
import TaskManager from "../../../managers/client/server/taskmanager"

export default class Allocation {
    public id: number
    public ip: string
    public ip_alias?: string
    public port: number
    public notes?: string
    public is_default: boolean

    public raw: any

    constructor(private _client: ClientInstance, data: any, public _parentServer: Server) {
        const attributes = data.attributes

        this.id = attributes.id
        this.ip = attributes.ip
        this.ip_alias = attributes.ip_alias
        this.port = attributes.port
        this.notes = attributes.notes
        this.is_default = attributes.is_default

        this.raw = attributes
    }

    setNote(note: string): Promise<Allocation> {
        return new Promise(async (resolve, reject) => {
            try {
                const data = await this._client.call({ endpoint: `servers/${this._parentServer.identifier}/network/allocations/${this.id}`, method: "POST", body: { notes: note } })
                resolve(new Allocation(this._client, data, this._parentServer))
            } catch (e) {
                reject(e)
            }
        })
    }

    setPrimary(): Promise<Allocation> {
        return new Promise(async (resolve, reject) => {
            try {
                const data = await this._client.call({ endpoint: `servers/${this._parentServer.identifier}/network/allocations/${this.id}/primary`, method: "POST" })
                resolve(new Allocation(this._client, data, this._parentServer))
            } catch (e) {
                reject(e)
            }
        })
    }

    delete() {
        return new Promise(async (resolve, reject) => {
            try {
                resolve(await this._client.call({ endpoint: `servers/${this._parentServer.identifier}/network/allocations/${this.id}`, method: "DELETE" }))
            } catch (e) {
                reject(e)
            }
        })
    }
}
