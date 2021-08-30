export default class Server {

    id: number
    externalId: string | number | null
    uuid: string
    identifier: string
    name: string
    description: string | null
    status: string
    isSuspended: boolean
    limits: { 
        memory: number,
        swap: number,
        disk: number,
        io: number,
        cpu: number
        threads: number | null
    }
    featureLimits: { 
        databases: number
        allocations: number
        backups: number
    }
    ownerId: number
    nodeId: number
    allocationId: number
    nestId: number
    eggId: number
    container: any
    updatedAt: string
    createdAt: string

    constructor(raw: any) {
        this.id = raw.id
        this.externalId = raw.external_id
        this.uuid = raw.uuid
        this.identifier = raw.identifier
        this.name = raw.name
        this.description = raw.description == null ? "" : raw.description
        this.status = raw.status
        this.isSuspended = raw.suspended
        this.limits = {
            memory: raw.limits.memory,
            swap: raw.limits.swap,
            disk: raw.limits.disk,
            io: raw.limits.io,
            cpu: raw.limits.cpu,
            threads: raw.limits.threads,
        }
        this.featureLimits = {
            databases: raw.feature_limits.databases,
            allocations: raw.feature_limits.allocations,
            backups: raw.feature_limits.backups,
        }
        this.ownerId = raw.user
        this.nodeId = raw.node
        this.allocationId = raw.allocation
        this.nestId = raw.nest
        this.eggId = raw.egg
        this.container = raw.container
        this.updatedAt = raw.updated_at
        this.createdAt = raw.created_at
    }
}