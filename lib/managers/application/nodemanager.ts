import ApplicationInstance from "../../instance/ApplicationInstance"
import Node from "../../structures/application/Node"

import * as Types from "../../utils/Types"
import Util from "../../utils/Util"

export default class NodeManager {
    constructor(private client: ApplicationInstance) {}

    list(options: Types.requestParameters = {}): Promise<Node[]> {
        return new Promise(async (resolve, reject) => {
            try {
                resolve(await Util.handlePagination(this.client, "nodes", options, Node))
            } catch (e) {
                reject(e)
            }
        })
    }

    get(id: number, options: Types.requestParameters = {}): Promise<Node> {
        return new Promise(async (resolve, reject) => {
            try {
                resolve(new Node(this.client, await this.client.call({ endpoint: "nodes/" + id, parameters: options })))
            } catch (e) {
                reject(e)
            }
        })
    }

    create(params: Types.createNodeParams): Promise<Node> {
        return new Promise(async (resolve, reject) => {
            try {
                resolve(new Node(this.client, await this.client.call({ endpoint: "nodes", method: "POST", body: params })))
            } catch (e) {
                reject(e)
            }
        })
    }
}
