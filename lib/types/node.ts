export default class Node {

    id: number
    uuid: string
    public: boolean
    name: string
    description: string
    locationId: number
    fqdn: string
    scheme: string
    behind_proxy: boolean
    maintenance_mode: boolean
    memory: number
    memory_overallocate: number
    disk: number
    disk_overallocate: number
    upload_size: number
    daemon_listen: number
    daemon_sftp: number
    daemon_base: string
    created_at: string
    updated_at: string
    allocated_resources: {
        memory: number,
        disk: number
    }
    raw: any

    constructor(raw : any) {
        this.id = raw.id;
        this.uuid = raw.uuid;
        this.public = raw.public;
        this.name = raw.name
        this.description = raw.description;
        this.locationId = raw.location_id
        this.fqdn = raw.fqdn
        this.scheme = raw.scheme
        this.behind_proxy = raw.behind_proxy;
        this.maintenance_mode = raw.maintenance_mode
        this.memory = raw.memory
        this.memory_overallocate = raw.memory_overallocate
        this.disk = raw.disk
        this.disk_overallocate = raw.disk_overallocate
        this.upload_size = raw.upload_size
        this.daemon_listen = raw.daemon_listen
        this.daemon_sftp = raw.daemon_sftp
        this.daemon_base = raw.daemon_base
        this.created_at = raw.created_at
        this.updated_at = raw.updated_at
        this.allocated_resources = {
            memory: raw.allocated_resources.memory,
            disk: raw.allocated_resources.disk,
        }
        this.raw = raw
    }
}