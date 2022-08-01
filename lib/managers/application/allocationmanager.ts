import ApplicationInstance from "../../instance/ApplicationInstance"

import * as Types from "../../utils/Types"
import Node from "../../structures/application/Node"
import Util from "../../utils/Util"
import Allocation from "../../structures/application/Allocation"

export default class AllocationManager {
    constructor(private client: ApplicationInstance, public _parentNode: Node) {}

    list(options: Types.requestParameters = {}): Promise<Allocation[]> {
        return new Promise(async (resolve, reject) => {
            try {
                resolve(await Util.handlePagination(this.client, `nodes/${this._parentNode.id}/allocations`, options, Allocation, this._parentNode))
            } catch (e) {
                reject(e)
            }
        })
    }

    create(params: Types.createAllocationParams) {
        return new Promise(async (resolve, reject) => {
            try {
                resolve(await this.client.call({ endpoint: `nodes/${this._parentNode.id}/allocations`, method: "POST", body: params }))
            } catch (e) {
                reject(e)
            }
        })
    }
}
