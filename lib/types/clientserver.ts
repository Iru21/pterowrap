export default class ClientServer {

    server_owner: boolean
    identifier: string
    uuid: string
    name: string
    description: string | null
    limits: {
        memory: number
        swap: number
        disk: number
        io: number
        cpu: number
    }
    feature_limits: {
        databases: number
        allocations: number
    }

    constructor(raw: any) {
        this.server_owner = raw.server_owner;
        this.identifier = raw.identifier;
        this.uuid = raw.uuid;
        this.name = raw.name;
        this.description = raw.description;
        this.limits = raw.limits
        this.feature_limits = raw.feature_limits
    }

}