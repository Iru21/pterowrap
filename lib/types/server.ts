export default class Server {

    id: number
    external_id: string | number | null
    uuid: string
    identifier: string
    name: string
    description: string | null
    status: string
    suspended: boolean
    limits: { 
        memory: number,
        swap: number,
        disk: number,
        io: number,
        cpu: number
        threads: number | null
    }
    feature_limits: { 
        databases: number
        allocations: number
        backups: number
    }
    user: number
    node: number
    allocation: number
    nest: number
    egg: number
    pack: number
    container: any
    updated_at: string
    created_at: string
    raw: any

    constructor(raw: any) {
        this.id = raw.id
        this.external_id = raw.external_id
        this.uuid = raw.uuid
        this.identifier = raw.identifier
        this.name = raw.name
        this.description = raw.description == null ? "" : raw.description
        this.status = raw.status
        this.suspended = raw.suspended
        this.limits = {
            memory: raw.limits.memory,
            swap: raw.limits.swap,
            disk: raw.limits.disk,
            io: raw.limits.io,
            cpu: raw.limits.cpu,
            threads: raw.limits.threads,
        }
        this.feature_limits = {
            databases: raw.feature_limits.databases,
            allocations: raw.feature_limits.allocations,
            backups: raw.feature_limits.backups,
        }
        this.user = raw.user
        this.node = raw.node
        this.allocation = raw.allocation
        this.nest = raw.nest
        this.egg = raw.egg
        this.pack = raw.pack
        this.container = raw.container
        this.updated_at = raw.updated_at
        this.created_at = raw.created_at
        this.raw = raw
    }
}