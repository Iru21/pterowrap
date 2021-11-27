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
        this.id = data.id
        this.uuid = data.uuid
        this.public = data.public
        this.name = data.name
        this.description = data.description
        this.location_id = data.location_id
        this.fqdn = data.fqdn
        this.scheme = data.scheme
        this.behind_proxy = data.behind_proxy
        this.maintanance_mode = data.maintanance_mode
        this.memory = data.memory
        this.memory_overallocate = data.memory_overallocate
        this.disk = data.disk
        this.disk_overallocate = data.disk_overallocate
        this.upload_size = data.upload_size
        this.daemon_listen = data.daemon_listen
        this.daemon_sftp = data.daemon_sftp
        this.daemon_base = data.daemon_base
        this.created_at = data.created_at
        this.updated_at = data.updated_at
        this.allocated_resources = data.allocated_resources

        this.raw = data

        this.allocations = new AllocationManager(this._client, this)
    }

    async retrieveWingsConfiguration(): Promise<object | null> {
        try {
            return await this._client.call({ endpoint: `nodes/${this.id}/configuration` })
        } catch {
            return null
        }
    }

    async update(params: Types.updateNodeParams): Promise<Node | null> {
        try {
            return new Node(this._client, (await this._client.call({ endpoint: "nodes/" + this.id, method: "PATCH", body: params })).attributes)
        } catch {
            return null
        }
    }

    async delete() {
        await this._client.call({ endpoint: "nodes/" + this.id, method: "DELETE" })
    }
}
