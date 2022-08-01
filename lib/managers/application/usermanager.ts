import ApplicationInstance from "../../instance/ApplicationInstance"
import User from "../../structures/application/User"

import * as Types from "../../utils/Types"
import Util from "../../utils/Util"

export default class UserManager {
    constructor(private client: ApplicationInstance) {}

    list(options: Types.requestParameters = {}): Promise<User[]> {
        return new Promise(async (resolve, reject) => {
            try {
                resolve(await Util.handlePagination(this.client, "users", options, User))
            } catch (e) {
                reject(e)
            }
        })
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

    create(params: Types.createUserParams): Promise<User> {
        return new Promise(async (resolve, reject) => {
            try {
                resolve(new User(this.client, await this.client.call({ endpoint: "users", method: "POST", body: params })))
            } catch (e) {
                reject(e)
            }
        })
    }
}
