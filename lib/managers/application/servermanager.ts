import ApplicationInstance from "../../instance/application"

import handlePagination from "../../utils/handlepagination"
import * as Types from "../../types"
import Server from "../../structures/application/server"

export default class ServerManager {
    constructor(private client: ApplicationInstance) {}

    list(options: Types.requestParameters = {}): Promise<Server[]> {
        return new Promise(async (resolve, reject) => {
            try {
                resolve(await handlePagination(this.client, "servers", options, Server))
            } catch (e) {
                reject(e)
            }
        })
    }

    get(id: number, options: Types.requestParameters = {}): Promise<Server> {
        return new Promise(async (resolve, reject) => {
            try {
                resolve(new Server(this.client, await this.client.call({ endpoint: "servers/" + id, parameters: options })))
            } catch (e) {
                reject(e)
            }
        })
    }

    getByExternalId(id: string, options: Types.requestParameters = {}): Promise<Server> {
        return new Promise(async (resolve, reject) => {
            try {
                resolve(new Server(this.client, await this.client.call({ endpoint: "servers/external/" + id, parameters: options })))
            } catch (e) {
                reject(e)
            }
        })
    }

    create(params: Types.createServerParams): Promise<Server> {
        return new Promise(async (resolve, reject) => {
            try {
                resolve(new Server(this.client, await this.client.call({ endpoint: "servers", method: "POST", body: params })))
            } catch (e) {
                reject(e)
            }
        })
    }
}
