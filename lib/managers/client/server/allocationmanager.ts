import ClientInstance from "../../../instance/ClientInstance"

import * as Types from "../../../utils/Types"
import Server from "../../../structures/client/Server"
import Allocation from "../../../structures/client/server/Allocation"

export default class AllocationManager {
    constructor(private client: ClientInstance, public _parentServer: Server) {}

    list(options: Types.requestParameters = {}): Promise<Allocation[]> {
        return new Promise(async (resolve, reject) => {
            try {
                const list = await this.client.call({ endpoint: `servers/${this._parentServer.identifier}/network/allocations`, parameters: options })
                const r: Allocation[] = []
                for (let i = 0; i < list.data.length; i++) {
                    r.push(new Allocation(this.client, list.data[i], this._parentServer))
                }
                resolve(r)
            } catch (e) {
                reject(e)
            }
        })
    }

    get(id: number, options: Types.requestParameters = {}): Promise<Allocation | null> {
        return new Promise(async (resolve, reject) => {
            try {
                const allocations = await this.list(options)
                const found = allocations.find((a) => a.id === id) || null
                resolve(found)
            } catch (e) {
                reject(e)
            }
        })
    }

    assign(): Promise<Allocation> {
        return new Promise(async (resolve, reject) => {
            try {
                const data = await this.client.call({ endpoint: `servers/${this._parentServer.identifier}/network/allocations`, method: "POST" })
                resolve(new Allocation(this.client, data, this._parentServer))
            } catch (e) {
                reject(e)
            }
        })
    }
}
