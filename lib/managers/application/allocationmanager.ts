import ApplicationInstance from "../../instance/application"

import handlePagination from "../../utils/handlepagination"
import * as Types from "../../types"
import Node from "../../structures/application/node"
import Allocation from "../../structures/application/allocation"

export default class AllocationManager {
    constructor(private client: ApplicationInstance, public node: Node) {}

    async list(options: Types.requestParameters = {}): Promise<Allocation[]> {
        return new Promise(async (resolve, reject) => {
            try {
                resolve(await handlePagination(this.client, `nodes/${this.node.id}/allocations`, options, Allocation, this.node))
            } catch (e) {
                reject(e)
            }
        })
    }

    async create(params: Types.createAllocationParams) {
        return new Promise(async (resolve, reject) => {
            try {
                resolve(await this.client.call({ endpoint: `nodes/${this.node.id}/allocations`, method: "POST", body: params }))
            } catch (e) {
                reject(e)
            }
        })
    }
}
