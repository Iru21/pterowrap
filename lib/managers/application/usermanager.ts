import ApplicationInstance from "../../instance/application"

import User from "../../structures/application/user"
import handlePagination from "../../utils/handlepagination"
import * as Types from "../../types"

export default class UserManager {
    constructor(private client: ApplicationInstance) {}

    async list(options: Types.requestParameters = {}): Promise<User[]> {
        return await handlePagination(this.client, "users", options, User)
    }

    get(id: number, options: Types.requestParameters = {}): Promise<User> {
        return new Promise(async (resolve, reject) => {
            try {
                resolve(new User(this.client, await this.client.call({ endpoint: "users/" + id, parameters: options })))
            } catch (e) {
                reject(e)
            }
        })
    }

    getByExternalId(id: any, options: Types.requestParameters = {}): Promise<User> {
        return new Promise(async (resolve, reject) => {
            try {
                resolve(new User(this.client, await this.client.call({ endpoint: "users/external/" + id.toString(), parameters: options })))
            } catch (e) {
                reject(e)
            }
        })
    }

    async create(params: Types.createUserParams): Promise<User> {
        return new Promise(async (resolve, reject) => {
            try {
                resolve(new User(this.client, await this.client.call({ endpoint: "users", method: "POST", body: params })))
            } catch (e) {
                reject(e)
            }
        })
    }
}
