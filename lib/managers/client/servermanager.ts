import ClientInstance from "../../instance/ClientInstance"
import Server from "../../structures/client/Server"

import * as Types from "../../utils/Types"
import Util from "../../utils/Util"

export default class ServerManager {
    constructor(private client: ClientInstance) {}

    list(options: Types.requestParameters = {}): Promise<Server[]> {
        return new Promise(async (resolve, reject) => {
            try {
                resolve(await Util.handlePagination(this.client, "", options, Server))
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
