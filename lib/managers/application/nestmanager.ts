import ApplicationInstance from "../../instance/application"

import handlePagination from "../../utils/handlepagination"
import * as Types from "../../types"
import Nest from "../../structures/application/nest"

export default class NestManager {
    constructor(private client: ApplicationInstance) {}

    async list(options: Types.requestParameters = {}): Promise<Nest[]> {
        return new Promise(async (resolve, reject) => {
            try {
                resolve(await handlePagination(this.client, "nests", options, Nest))
            } catch (e) {
                reject(e)
            }
        })
    }

    async get(id: number, options: Types.requestParameters = {}): Promise<Nest> {
        return new Promise(async (resolve, reject) => {
            try {
                resolve(new Nest(this.client, await this.client.call({ endpoint: "nests/" + id, parameters: options })))
            } catch (e) {
                reject(e)
            }
        })
    }
}
