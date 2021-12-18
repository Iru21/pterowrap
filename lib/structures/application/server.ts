import * as Types from "../../types"
import ApplicationInstance from "../../instance/application"
import DatabaseManager from "../../managers/application/databasemanager"

export default class Server {
    public id: number
    public external_id: string
    public uuid: string
    public name: string
    public description: string
    public suspended: boolean
    public limits: {
        memory: number
        disk: number
        swap: number
        cpu: number
        io: number
        threads: number | null
        oom_disabled: boolean
    }
    public feature_limits: {
        databases: number
        allocations: number
        backups: number
    }
    public user: number
    public node: number
    public allocation: number
    public nest: number
    public egg: number
    public container: {
        [key: string]: any
    }
    public updated_at: string
    public created_at: string
    public relationships: {
        [key: string]: any
    }

    public raw: any

    public databases: DatabaseManager

    constructor(private _client: ApplicationInstance, data: any) {
        const attributes = data.attributes
        this.id = attributes.id
        this.external_id = attributes.external_id
        this.uuid = attributes.uuid
        this.name = attributes.name
        this.description = attributes.description
        this.suspended = attributes.suspended
        this.limits = attributes.limits
        this.feature_limits = attributes.feature_limits
        this.user = attributes.user
        this.node = attributes.node
        this.allocation = attributes.allocation
        this.nest = attributes.nest
        this.egg = attributes.egg
        this.container = attributes.container
        this.updated_at = attributes.updated_at
        this.created_at = attributes.created_at
        this.relationships = attributes.relationships ? attributes.relationships : {}
        this.raw = attributes

        this.databases = new DatabaseManager(this._client, this)
    }

    updateDetails(params: Types.updateServerDetailsParams): Promise<Server> {
        return new Promise(async (resolve, reject) => {
            try {
                resolve(new Server(this._client, await this._client.call({ endpoint: `servers/${this.id}/details`, method: "PATCH", body: params })))
            } catch (e) {
                reject(e)
            }
        })
    }

    updateBuild(params: Types.updateServerBuildParams): Promise<Server> {
        return new Promise(async (resolve, reject) => {
            try {
                resolve(new Server(this._client, await this._client.call({ endpoint: `servers/${this.id}/build`, method: "PATCH", body: params })))
            } catch (e) {
                reject(e)
            }
        })
    }

    updateStartup(params: Types.updateServerStartupParams): Promise<Server> {
        return new Promise(async (resolve, reject) => {
            try {
                resolve(new Server(this._client, await this._client.call({ endpoint: `servers/${this.id}/startup`, method: "PATCH", body: params })))
            } catch (e) {
                reject(e)
            }
        })
    }

    suspend() {
        return new Promise(async (resolve, reject) => {
            try {
                resolve(await this._client.call({ endpoint: `servers/${this.id}/suspend`, method: "POST" }))
            } catch (e) {
                reject(e)
            }
        })
    }

    unsuspend() {
        return new Promise(async (resolve, reject) => {
            try {
                resolve(await this._client.call({ endpoint: `servers/${this.id}/unsuspend`, method: "POST" }))
            } catch (e) {
                reject(e)
            }
        })
    }

    reinstall() {
        return new Promise(async (resolve, reject) => {
            try {
                resolve(await this._client.call({ endpoint: `servers/${this.id}/reinstall`, method: "POST" }))
            } catch (e) {
                reject(e)
            }
        })
    }

    delete(force: boolean = false) {
        return new Promise(async (resolve, reject) => {
            try {
                if (!force) resolve(new Server(this._client, await this._client.call({ endpoint: `servers/${this.id}`, method: "DELETE" })))
                else resolve(await this._client.call({ endpoint: `servers/${this.id}/force`, method: "DELETE" }))
            } catch (e) {
                reject(e)
            }
        })
    }
}
