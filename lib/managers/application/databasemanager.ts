import ApplicationInstance from "../../instance/application"

import handlePagination from "../../utils/handlepagination"
import * as Types from "../../types"
import Server from "../../structures/application/server"
import Database from "../../structures/application/database"

export default class DatabaseManager {
    constructor(private client: ApplicationInstance, public _parentServer: Server) {}

    list(options: Types.requestParameters = {}): Promise<Database[]> {
        return new Promise(async (resolve, reject) => {
            try {
                const list = await this.client.call({ endpoint: `servers/${this._parentServer.id}/databases`, parameters: options })
                const r: Database[] = []
                for (let i = 0; i < list.data.length; i++) {
                    r.push(new Database(this.client, list.data[i], this._parentServer))
                }
                resolve(r)
            } catch (e) {
                reject(e)
            }
        })
    }

    get(id: number, options: Types.requestParameters): Promise<Database> {
        return new Promise(async (resolve, reject) => {
            try {
                resolve(new Database(this.client, await this.client.call({ endpoint: `servers/${this._parentServer.id}/databases/${id}`, parameters: options }), this._parentServer))
            } catch (e) {
                reject(e)
            }
        })
    }

    create(params: Types.createDatabaseParams): Promise<Database> {
        return new Promise(async (resolve, reject) => {
            try {
                resolve(new Database(this.client, await this.client.call({ endpoint: `servers/${this._parentServer.id}/databases`, method: "POST", body: params }), this._parentServer))
            } catch (e) {
                reject(e)
            }
        })
    }
}
