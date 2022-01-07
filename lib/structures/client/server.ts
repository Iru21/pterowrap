import * as Types from "../../types"
import ClientInstance from "../../instance/client"
import DatabaseManager from "../../managers/client/databasemanager"
import FileManager from "../../managers/client/filemanager"
import ScheduleManager from "../../managers/client/schedulemanager"
import NetworkManager from "../../managers/client/networkmanager"

export default class Server {
    public server_owner: boolean
    public identifier: number
    public internal_id: number
    public uuid: string
    public name: string
    public node: number
    public sftp_details: {
        ip: string
        port: number
    }
    public description: string
    public invocation: string
    public is_suspended: boolean
    public is_installing: boolean
    public is_transferring: boolean
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
    public relationships: {
        [key: string]: any
    }

    public databases: DatabaseManager
    public files: FileManager
    public schedules: ScheduleManager
    public networks: NetworkManager

    public raw: any

    constructor(private _client: ClientInstance, data: any) {
        const attributes = data.attributes
        this.server_owner = attributes.server_owner
        this.identifier = attributes.identifier
        this.internal_id = attributes.internal_id
        this.uuid = attributes.uuid
        this.name = attributes.name
        this.description = attributes.description
        this.node = attributes.node
        this.sftp_details = attributes.sftp_details
        this.invocation = attributes.invocation
        this.is_suspended = attributes.is_suspended
        this.is_installing = attributes.is_installing
        this.is_transferring = attributes.is_transferring
        this.limits = attributes.limits
        this.feature_limits = attributes.feature_limits
        this.relationships = attributes.relationships ? attributes.relationships : {}

        this.raw = attributes

        this.databases = new DatabaseManager(this._client, this)
        this.files = new FileManager(this._client, this)
        this.schedules = new ScheduleManager(this._client, this)
        this.networks = new NetworkManager(this._client, this)
    }

    retrieveWebsocketCredentials(): Promise<Types.websocketCredentials> {
        return new Promise(async (resolve, reject) => {
            try {
                resolve((await this._client.call({ endpoint: `servers/${this.identifier}/websocket` })).data)
            } catch (e) {
                reject(e)
            }
        })
    }

    retireveResourceUsage(): Promise<Types.resourceUsage> {
        return new Promise(async (resolve, reject) => {
            try {
                resolve((await this._client.call({ endpoint: `servers/${this.identifier}/resources` })).attributes)
            } catch (e) {
                reject(e)
            }
        })
    }

    sendCommand(command: string) {
        return new Promise(async (resolve, reject) => {
            try {
                resolve(await this._client.call({ endpoint: `servers/${this.identifier}/command`, method: "POST", body: { command } }))
            } catch (e) {
                reject(e)
            }
        })
    }

    sendPowerAction(action: Types.powerAction) {
        return new Promise(async (resolve, reject) => {
            try {
                resolve(await this._client.call({ endpoint: `servers/${this.identifier}/power`, method: "POST", body: { action } }))
            } catch (e) {
                reject(e)
            }
        })
    }
}
