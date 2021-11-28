import ApplicationInstance from "../../instance/application"

import handlePagination from "../../utils/handlepagination"
import * as Types from "../../types"
import Egg from "../../structures/application/egg"
import Nest from "../../structures/application/nest"

export default class EggManager {
    constructor(private client: ApplicationInstance, private nest: Nest) {}

    async list(options: Types.requestParameters = {}): Promise<Egg[]> {
        const list = await this.client.call({ endpoint: `nests/${this.nest.id}/eggs`, parameters: options })
        const r: Egg[] = []
        for (let i = 0; i < list.data.length; i++) {
            r.push(new Egg(this.client, list.data[i]))
        }
        return r
    }

    async get(id: number, options: Types.requestParameters = {}): Promise<Egg | null> {
        try {
            return new Egg(this.client, await this.client.call({ endpoint: `nests/${this.nest.id}/eggs/${id}`, parameters: options }))
        } catch {
            return null
        }
    }
}
