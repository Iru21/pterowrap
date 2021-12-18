import * as Types from "../../types"
import ApplicationInstance from "../../instance/application"
import AllocationManager from "../../managers/application/allocationmanager"

export default class Node {
    public id: number
    public uuid: string
    public public: boolean
    public name: string
    public description: string
    public location_id: number
    public fqdn: string
    public scheme: "http" | "https"
    public behind_proxy: boolean
    public maintanance_mode: boolean
    public memory: number
    public memory_overallocate: number
    public disk: number
    public disk_overallocate: number
    public upload_size: number
    public daemon_listen: number
    public daemon_sftp: number
    public daemon_base: string
    public created_at: string
    public updated_at: string
    public allocated_resources: {
        memory: number
        disk: number
    }

    public allocations: AllocationManager

    public raw: any

    constructor(private _client: ApplicationInstance, data: any) {
        const attributes = data.attributes
        this.id = attributes.id
        this.uuid = attributes.uuid
        this.public = attributes.public
        this.name = attributes.name
        this.description = attributes.description
        this.location_id = attributes.location_id
        this.fqdn = attributes.fqdn
        this.scheme = attributes.scheme
        this.behind_proxy = attributes.behind_proxy
        this.maintanance_mode = attributes.maintanance_mode
        this.memory = attributes.memory
        this.memory_overallocate = attributes.memory_overallocate
        this.disk = attributes.disk
        this.disk_overallocate = attributes.disk_overallocate
        this.upload_size = attributes.upload_size
        this.daemon_listen = attributes.daemon_listen
        this.daemon_sftp = attributes.daemon_sftp
        this.daemon_base = attributes.daemon_base
        this.created_at = attributes.created_at
        this.updated_at = attributes.updated_at
        this.allocated_resources = attributes.allocated_resources

        this.raw = data

        this.allocations = new AllocationManager(this._client, this)
    }

    async retrieveWingsConfiguration(): Promise<object> {
        return new Promise(async (resolve, reject) => {
            try {
                resolve(await this._client.call({ endpoint: `nodes/${this.id}/configuration` }))
            } catch (e) {
                reject(e)
            }
        })
    }

    async update(params: Types.updateNodeParams): Promise<Node> {
        return new Promise(async (resolve, reject) => {
            try {
                resolve(new Node(this._client, await this._client.call({ endpoint: "nodes/" + this.id, method: "PATCH", body: params })))
            } catch (e) {
                reject(e)
            }
        })
    }

    async delete() {
        return new Promise(async (resolve, reject) => {
            try {
                resolve(await this._client.call({ endpoint: "nodes/" + this.id, method: "DELETE" }))
            } catch (e) {
                reject(e)
            }
        })
    }
}
