import ClientInstance from "../../../instance/ClientInstance"

import Server from "../../../structures/client/Server"
import Variable from "../../../structures/client/server/Variable"

export default class VariableManager {
    constructor(private client: ClientInstance, public _parentServer: Server) {}

    list(): Promise<Variable[]> {
        return new Promise(async (resolve, reject) => {
            try {
                const list = await this.client.call({ endpoint: `servers/${this._parentServer.identifier}/startup` })
                const r: Variable[] = []
                for (let i = 0; i < list.data.length; i++) {
                    r.push(new Variable(this.client, list.data[i], this._parentServer))
                }
                resolve(r)
            } catch (e) {
                reject(e)
            }
        })
    }

    get(key: string): Promise<Variable | null> {
        return new Promise(async (resolve, reject) => {
            try {
                const variables = await this.list()
                const data = variables.find((v) => v.env_variable === key)
                if (!data) resolve(null)
                resolve(new Variable(this.client, data, this._parentServer))
            } catch (e) {
                reject(e)
            }
        })
    }
}
