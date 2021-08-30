import AdminInstance from "../instances/admininstance";
import Allocation from "../types/allocation";
import Node from "../types/node";

type NodeParams = {
    name: string
    description: string | null
    location_id: number
    public: boolean | null
    fqdn: string
    scheme: string
    behind_proxy: string
    memory: number
    memory_overallocate: number
    disk: number
    disk_overallocate: number
    daemonBase: string
    daemonListen: number
    daemonSFTP: number
    inMaintenanceMode: boolean
    uploadSize: number
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
        if(params.public == null) params.public = true

        const returnedNode = new Node((await this.client.call("nodes", 'POST', params)))
        return returnedNode
    }

    async edit(id: Number, params: NodeParams): Promise<Node> {
        if(params.description == null) params.description = ""
        if(params.public == null) params.public = true

        const returnedNode = new Node((await this.client.call("nodes/" + id, 'PATCH', params)))
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