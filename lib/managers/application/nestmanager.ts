import ApplicationInstance from "../../instance/ApplicationInstance"
import Nest from "../../structures/application/Nest"

import * as Types from "../../utils/Types"
import Util from "../../utils/Util"

export default class NestManager {
    constructor(private client: ApplicationInstance) {}

    list(options: Types.requestParameters = {}): Promise<Nest[]> {
        return new Promise(async (resolve, reject) => {
            try {
                resolve(await Util.handlePagination(this.client, "nests", options, Nest))
            } catch (e) {
                reject(e)
            }
        })
    }

    get(id: number, options: Types.requestParameters = {}): Promise<Nest> {
        return new Promise(async (resolve, reject) => {
            try {
                resolve(new Nest(this.client, await this.client.call({ endpoint: "nests/" + id, parameters: options })))
            } catch (e) {
                reject(e)
            }
        })
    }
}
