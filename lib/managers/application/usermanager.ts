import ApplicationInstance from "../../instance/application"

import User from "../../datatypes/application/user"
import handlePagination from "../../utils/handlepagination"
import * as Types from "../../types"

export default class UserManager {
    constructor(private client: ApplicationInstance) {}

    async list(options: Types.requestParameters = {}): Promise<User[]> {
        return await handlePagination(this.client, "users", options, User)
    }

    async get(id: number, options: Types.requestParameters = {}): Promise<User | null> {
        try {
            return new User(this.client, (await this.client.call({ endpoint: "users/" + id, parameters: options })).attributes)
        } catch {
            return null
        }
    }

    async getByExternalId(id: any, options: Types.requestParameters = {}): Promise<User | null> {
        try {
            return new User(this.client, (await this.client.call({ endpoint: "users/external/" + id.toString(), parameters: options })).attributes)
        } catch {
            return null
        }
    }

    async create(params: Types.createUserParams): Promise<User> {
        return new User(this.client, (await this.client.call({ endpoint: "users", method: "POST", body: params })).attributes)
    }
}
