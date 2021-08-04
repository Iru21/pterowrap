import AdminInstance from "../instances/admininstance";
import Allocation from "../types/allocation";
import Node from "../types/node";

type NodeParams = {
    name: string
    description: string | null
    locationId: Number
    isPublic: boolean | null
    fqdn: string
    scheme: string
    isBehindProxy: string
    memory: Number
    memoryOverallocate: Number
    disk: Number
    diskOverallocate: Number
    daemonBase: string
    daemonListen: Number
    daemonSFTP: Number
    inMaintenanceMode: boolean
    uploadSize: Number
}

type AllocationParams = {
    ip: string
    alias: string | null
    ports: string[]
}
export default class NodeManager {

    private client: AdminInstance;

    constructor(_client: AdminInstance) {
        this.client = _client;
    }

    async list(): Promise<Node[]> {
        let current_page = (await this.client.call("nodes"))
        let returner = []
        const pages = current_page.meta.pagination.total_pages
        let attIterator = 0
        for (let i = 0; i < pages; i++) {
            for(let j = 0; j < current_page.data.length; j++) {
                returner[attIterator] = new Node(current_page.data[j].attributes)
                attIterator++
            }
            let next_link = current_page.meta.pagination.links.next
            if(next_link) {
                next_link = next_link.replace(this.client.url, "")
                current_page = (await this.client.call("nodes"))
            }
        }
        return returner
    }

    async get(id: Number): Promise<Node> {
        return new Node((await this.client.call("nodes/" + id)).attributes)
    }

    async create(params: NodeParams): Promise<Node> {
        if(params.description == null) params.description = ""
        if(params.isPublic == null) params.isPublic = true

        const options = {
            name: params.name,
            description: params.description,
            location_id: params.locationId,
            public: params.isPublic,
            fqdn: params.fqdn,
            scheme: params.scheme,
            behind_proxy: params.isBehindProxy,
            memory: params.memory,
            memory_overallocate: params.memoryOverallocate,
            disk: params.disk,
            disk_overallocate: params.diskOverallocate,
            daemon_base: params.daemonBase,
            daemon_sftp: params.daemonSFTP,
            daemon_listen: params.daemonListen,
            maintenance_mode: params.inMaintenanceMode,
            upload_size: params.uploadSize
        }
        const returnedNode = new Node((await this.client.call("nodes", 'POST', options)))
        return returnedNode
    }

    async edit(id: Number, params: NodeParams): Promise<Node> {
        if(params.description == null) params.description = ""
        if(params.isPublic == null) params.isPublic = true

        const options = {
            name: params.name,
            description: params.description,
            location_id: params.locationId,
            public: params.isPublic,
            fqdn: params.fqdn,
            scheme: params.scheme,
            behind_proxy: params.isBehindProxy,
            memory: params.memory,
            memory_overallocate: params.memoryOverallocate,
            disk: params.disk,
            disk_overallocate: params.diskOverallocate,
            daemon_base: params.daemonBase,
            daemon_sftp: params.daemonSFTP,
            daemon_listen: params.daemonListen,
            maintenance_mode: params.inMaintenanceMode,
            upload_size: params.uploadSize
        }
        const returnedNode = new Node((await this.client.call("nodes/" + id, 'PATCH', options)))
        return returnedNode
    }

    async delete(id: Number) {
        this.client.call("nodes/" + id, 'DELETE')
    }

    async listAllocations(nodeId: Number): Promise<Allocation[]> {
        let current_page = (await this.client.call("nodes/" + nodeId + "/allocations"))
        let returner = []
        const pages = current_page.meta.pagination.total_pages
        let attIterator = 0
        for (let i = 0; i < pages; i++) {
            for(let j = 0; j < current_page.data.length; j++) {
                returner[attIterator] = new Allocation(current_page.data[j].attributes)
                attIterator++
            }
            let next_link = current_page.meta.pagination.links.next
            if(next_link) {
                next_link = next_link.replace(this.client.url, "")
                current_page = (await this.client.call("nodes/" + nodeId + "/allocations"))
            }
        }
        return returner
    } 

    createAllocation(nodeId: Number, params: AllocationParams) {
        if(params.ports.length < 1) throw new Error("Insufficient port number to create allocation!")
        this.client.call("nodes/" + nodeId + "/allocations", "POST", params)
    }

    deleteAllocation(nodeId: string, allocationId: Number) {
        this.client.call("nodes/" + nodeId + "/allocations/" + allocationId , 'DELETE')
    }
}