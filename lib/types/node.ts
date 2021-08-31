export default class Node {

    id: number
    uuid: string
    isPublic: boolean
    name: string
    description: string
    locationId: number
    fqdn: string
    scheme: string
    isBehindProxy: boolean
    inMaintenanceMode: boolean
    memory: number
    memoryOverallocate: number
    disk: number
    diskOverallocate: number
    uploadSize: number
    daemonListen: number
    daemonSFTP: number
    daemonBase: string
    createdAt: string
    updatedAt: string
    allocatedResources: {
        memory: number,
        disk: number
    }
    raw: any

    constructor(raw : any) {
        this.id = raw.id;
        this.uuid = raw.uuid;
        this.isPublic = raw.public;
        this.name = raw.name
        this.description = raw.description;
        this.locationId = raw.location_id
        this.fqdn = raw.fqdn
        this.scheme = raw.scheme
        this.isBehindProxy = raw.behind_proxy;
        this.inMaintenanceMode = raw.maintenance_mode
        this.memory = raw.memory
        this.memoryOverallocate = raw.memory_overallocate
        this.disk = raw.disk
        this.diskOverallocate = raw.disk_overallocate
        this.uploadSize = raw.upload_size
        this.daemonListen = raw.daemon_listen
        this.daemonSFTP = raw.daemon_sftp
        this.daemonBase = raw.daemon_base
        this.createdAt = raw.created_at
        this.updatedAt = raw.updated_at
        this.allocatedResources = {
            memory: raw.allocated_resources.memory,
            disk: raw.allocated_resources.disk,
        }
        this.raw = raw
    }
}