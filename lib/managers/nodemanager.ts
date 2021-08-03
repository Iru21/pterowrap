import Client from "../client";
import Node from "../types/node";

export default class NodeManager {

    private client: Client;

    constructor(_client: Client) {
        this.client = _client;
    }

    async list(handlePagination: boolean = false): Promise<Node[]> {
        if(this.check()) throw new Error("Tried calling application endpoint from client type!")
        let current_page = (await this.client.call("nodes"))
        let returner = []
        if(handlePagination) {
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
        } else {
            returner = current_page.data
        }
        return returner
    }

    private check(): boolean {
        return this.client.api_type != "ADMIN"
    }
}