import ApplicationInstance from "../../instance/ApplicationInstance"
import * as Types from "../../utils/Types"
import Server from "../../structures/application/Server"
import Database from "../../structures/application/Database"

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
                resolve(
                    new Database(
                        this.client,
                        await this.client.call({ endpoint: `servers/${this._parentServer.id}/databases/${id}`, parameters: options }),
                        this._parentServer
                    )
                )
            } catch (e) {
                reject(e)
            }
        })
    }

    create(params: Types.createApplicationDatabaseParams): Promise<Database> {
        return new Promise(async (resolve, reject) => {
            try {
                resolve(
                    new Database(
                        this.client,
                        await this.client.call({ endpoint: `servers/${this._parentServer.id}/databases`, method: "POST", body: params }),
                        this._parentServer
                    )
                )
            } catch (e) {
                reject(e)
            }
        })
    }
}
