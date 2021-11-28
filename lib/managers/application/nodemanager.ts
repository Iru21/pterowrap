import ApplicationInstance from "../../instance/application"

import handlePagination from "../../utils/handlepagination"
import * as Types from "../../types"
import Node from "../../structures/application/node"

export default class NodeManager {
    constructor(private client: ApplicationInstance) {}

    async list(options: Types.requestParameters = {}): Promise<Node[]> {
        return await handlePagination(this.client, "nodes", options, Node)
    }

    async get(id: number, options: Types.requestParameters = {}): Promise<Node | null> {
        try {
            return new Node(this.client, await this.client.call({ endpoint: "nodes/" + id, parameters: options }))
        } catch {
            return null
        }
    }

    async create(params: Types.createNodeParams): Promise<Node> {
        return new Node(this.client, await this.client.call({ endpoint: "nodes", method: "POST", body: params }))
    }
}
