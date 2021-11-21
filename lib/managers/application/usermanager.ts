import ApplicationInstance from "../../instance/application"

import User from "../../datatypes/application/user"
import handlePagination from "../../utils/handlepagination"
import ClientInstance from "../../instance/client"
import * as Types from "../../types"

export default class UserManager {
    constructor(private client: ApplicationInstance) {
        this.client = client
    }

    async list(options: Types.requestParameters = {}): Promise<User[]> {
        return await handlePagination(this.client, "users", options, (c: ApplicationInstance | ClientInstance, data: any) => {
            return new User(c as ApplicationInstance, data)
        })
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
        const returnedUser = new User(this.client, (await this.client.call({ endpoint: "users", method: "POST", body: params })).attributes)
        return returnedUser
    }
}
