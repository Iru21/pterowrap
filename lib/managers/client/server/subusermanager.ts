import ClientInstance from "../../../instance/ClientInstance"
import * as Types from "../../../utils/Types"
import Server from "../../../structures/client/Server"
import Subuser from "../../../structures/client/server/Subuser"

export default class SubuserManager {
    constructor(private client: ClientInstance, public _parentServer: Server) {}

    list(): Promise<Subuser[]> {
        return new Promise(async (resolve, reject) => {
            try {
                const list = await this.client.call({ endpoint: `servers/${this._parentServer.identifier}/users` })
                const r: Subuser[] = []
                for (let i = 0; i < list.data.length; i++) {
                    r.push(new Subuser(this.client, list.data[i], this._parentServer))
                }
                resolve(r)
            } catch (e) {
                reject(e)
            }
        })
    }

    get(uuid: string): Promise<Subuser> {
        return new Promise(async (resolve, reject) => {
            try {
                resolve(
                    new Subuser(
                        this.client,
                        (await this.client.call({ endpoint: `servers/${this._parentServer.identifier}/users/${uuid}` })).data,
                        this._parentServer
                    )
                )
            } catch (e) {
                reject(e)
            }
        })
    }

    create(params: Types.createSubuserParams): Promise<Subuser> {
        return new Promise(async (resolve, reject) => {
            try {
                resolve(
                    new Subuser(
                        this.client,
                        (await this.client.call({ endpoint: `servers/${this._parentServer.identifier}/users`, method: "POST", body: params })).data,
                        this._parentServer
                    )
                )
            } catch (e) {
                reject(e)
            }
        })
    }
}
