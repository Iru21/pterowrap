import AdminInstance from "../instances/admininstance";
import Allocation from "../types/allocation";
import Node from "../types/node";

import { NodeParams, AllocationParams } from "../arguments"
export default class NodeManager {

    private client: AdminInstance;

    constructor(_client: AdminInstance) {
        this.client = _client;
    }

    async list(): Promise<Node[]> {
        let current_page = (await this.client.call("nodes"))
        const returner = []
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

    async get(id: number): Promise<Node | null> {
        try {
            return new Node((await this.client.call("nodes/" + id)).attributes)
        } catch { return null }
    }

    async create(params: NodeParams): Promise<Node> {
        if(params.description == null) params.description = ""
        if(params.public == null) params.public = true

        if(!(await this.client.locations.get(params.location_id))) throw new Error("Invalid location id!")

        const returnedNode = new Node((await this.client.call("nodes", 'POST', params)))
        return returnedNode
    }

    async edit(id: number, params: NodeParams): Promise<Node | null> {
        try {
            if(params.description == null) params.description = ""
            if(params.public == null) params.public = true

            const returnedNode = new Node((await this.client.call("nodes/" + id, 'PATCH', params)))
            return returnedNode
        } catch { return null }
    }

    async delete(id: number) {
        this.client.call("nodes/" + id, 'DELETE')
    }

    async listAllocations(nodeId: number): Promise<Allocation[]> {
        let current_page = (await this.client.call("nodes/" + nodeId + "/allocations"))
        const returner = []
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

    createAllocation(nodeId: number, params: AllocationParams) {
        if(params.ports.length < 1) throw new Error("Insufficient port number to create allocation!")
        this.client.call("nodes/" + nodeId + "/allocations", "POST", params)
    }

    deleteAllocation(nodeId: string, allocationId: number) {
        this.client.call("nodes/" + nodeId + "/allocations/" + allocationId , 'DELETE')
    }

}