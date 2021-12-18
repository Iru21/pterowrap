import ApplicationInstance from "../../instance/application"

import handlePagination from "../../utils/handlepagination"
import * as Types from "../../types"
import Egg from "../../structures/application/egg"
import Nest from "../../structures/application/nest"

export default class EggManager {
    constructor(private client: ApplicationInstance, private nest: Nest) {}

    async list(options: Types.requestParameters = {}): Promise<Egg[]> {
        return new Promise(async (resolve, reject) => {
            try {
                const list = await this.client.call({ endpoint: `nests/${this.nest.id}/eggs`, parameters: options })
                const r: Egg[] = []
                for (let i = 0; i < list.data.length; i++) {
                    r.push(new Egg(this.client, list.data[i]))
                }
                resolve(r)
            } catch (e) {
                reject(e)
            }
        })
    }

    async get(id: number, options: Types.requestParameters = {}): Promise<Egg> {
        return new Promise(async (resolve, reject) => {
            try {
                resolve(new Egg(this.client, await this.client.call({ endpoint: `nests/${this.nest.id}/eggs/${id}`, parameters: options })))
            } catch (e) {
                reject(e)
            }
        })
    }
}
