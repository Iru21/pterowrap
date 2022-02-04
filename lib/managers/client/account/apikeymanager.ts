import ClientInstance from "../../../instance/client"
import ApiKey from "../../../structures/client/account/apikey"

import * as Types from "../../../types"

export default class ApiKeyManager {
    constructor(private client: ClientInstance) {}

    list(): Promise<ApiKey[]> {
        return new Promise(async (resolve, reject) => {
            try {
                const list = await this.client.call({ endpoint: "account/api-keys" })
                const r: ApiKey[] = []
                for (let i = 0; i < list.data.length; i++) {
                    r.push(new ApiKey(this.client, list.data[i]))
                }
                resolve(r)
            } catch (e) {
                reject(e)
            }
        })
    }

    get(identifier: string): Promise<ApiKey | null> {
        return new Promise(async (resolve, reject) => {
            try {
                const list = await this.list()
                const data = list.find((ak) => ak.identifier === identifier)
                if (!data) resolve(null)
                resolve(new ApiKey(this.client, data))
            } catch (e) {
                reject(e)
            }
        })
    }

    create(params: Types.createClientApiKeyParams): Promise<ApiKey> {
        return new Promise(async (resolve, reject) => {
            try {
                resolve(new ApiKey(this.client, await this.client.call({ endpoint: "account/api-keys", method: "POST", body: params })))
            } catch (e) {
                reject(e)
            }
        })
    }
}
