import ApplicationInstance from "../../instance/application"

import handlePagination from "../../utils/handlepagination"
import * as Types from "../../types"
import Nest from "../../structures/application/nest"

export default class NestManager {
    constructor(private client: ApplicationInstance) {}

    async list(options: Types.requestParameters = {}): Promise<Nest[]> {
        return await handlePagination(this.client, "nests", options, Nest)
    }

    async get(id: number, options: Types.requestParameters = {}): Promise<Nest | null> {
        try {
            return new Nest(this.client, await this.client.call({ endpoint: "nests/" + id, parameters: options }))
        } catch {
            return null
        }
    }
}
