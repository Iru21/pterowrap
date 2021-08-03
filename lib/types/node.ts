export default class Node {

    id: Number
    uuid: string
    isPublic: boolean
    name: string
    description: string
    locationId: Number
    fqdn: string
    scheme: string
    isBehindProxy: boolean
    inMaintenanceMode: boolean
    memory: Number
    memoryOverallocate: Number
    disk: Number
    diskOverallocate: Number
    uploadSize: Number
    daemonListen: Number
    daemonSFTP: Number
    daemonBase: string
    createdAt: string
    updatedAt: string
    allocatedResources: {
        memory: Number,
        disk: Number
    }

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
    }
}