import ClientInstance from "../../../instance/ClientInstance"
import * as Types from "../../../utils/Types"
import Server from "../../../structures/client/Server"
import Database from "../../../structures/client/server/Database"

export default class DatabaseManager {
    constructor(private client: ClientInstance, public _parentServer: Server) {}

    list(options: Types.requestParameters = {}): Promise<Database[]> {
        return new Promise(async (resolve, reject) => {
            try {
                const list = await this.client.call({ endpoint: `servers/${this._parentServer.identifier}/databases`, parameters: options })
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

    create(params: Types.createClientDatabaseParams): Promise<Database> {
        return new Promise(async (resolve, reject) => {
            try {
                resolve(
                    new Database(
                        this.client,
                        (await this.client.call({ endpoint: `servers/${this._parentServer.identifier}/databases`, method: "POST", body: params })).data,
                        this._parentServer
                    )
                )
            } catch (e) {
                reject(e)
            }
        })
    }
}
