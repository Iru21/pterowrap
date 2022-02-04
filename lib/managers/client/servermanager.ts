import ClientInstance from "../../instance/client"

import handlePagination from "../../utils/handlepagination"
import * as Types from "../../types"
import Server from "../../structures/client/server"

export default class ServerManager {
    constructor(private client: ClientInstance) {}

    list(options: Types.requestParameters = {}): Promise<Server[]> {
        return new Promise(async (resolve, reject) => {
            try {
                resolve(await handlePagination(this.client, "", options, Server))
            } catch (e) {
                reject(e)
            }
        })
    }

    get(identifier: string, options: Types.requestParameters = {}): Promise<Server> {
        return new Promise(async (resolve, reject) => {
            try {
                resolve(new Server(this.client, await this.client.call({ endpoint: "servers/" + identifier, parameters: options })))
            } catch (e) {
                reject(e)
            }
        })
    }
}
