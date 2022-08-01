import * as Types from "../../../utils/Types"
import ClientInstance from "../../../instance/ClientInstance"
import APIKey from "../../../structures/client/account/APIKey"

export default class APIKeyManager {
    constructor(private client: ClientInstance) {}

    list(): Promise<APIKey[]> {
        return new Promise(async (resolve, reject) => {
            try {
                const list = await this.client.call({ endpoint: "account/api-keys" })
                const r: APIKey[] = []
                for (let i = 0; i < list.data.length; i++) {
                    r.push(new APIKey(this.client, list.data[i]))
                }
                resolve(r)
            } catch (e) {
                reject(e)
            }
        })
    }

    get(identifier: string): Promise<APIKey | null> {
        return new Promise(async (resolve, reject) => {
            try {
                const list = await this.list()
                const data = list.find((ak) => ak.identifier === identifier)
                if (!data) resolve(null)
                resolve(new APIKey(this.client, data))
            } catch (e) {
                reject(e)
            }
        })
    }

    create(params: Types.createClientApiKeyParams): Promise<APIKey> {
        return new Promise(async (resolve, reject) => {
            try {
                resolve(new APIKey(this.client, await this.client.call({ endpoint: "account/api-keys", method: "POST", body: params })))
            } catch (e) {
                reject(e)
            }
        })
    }
}
