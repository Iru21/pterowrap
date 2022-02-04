import ClientInstance from "../../instance/client"

import handlePagination from "../../utils/handlepagination"
import * as Types from "../../types"
import User from "../../structures/client/user"

export default class AccountManager {
    constructor(private client: ClientInstance) {}

    retrieveDetails() {
        return new Promise(async (resolve, reject) => {
            try {
                resolve(new User(this.client, await this.client.call({ endpoint: "account" })))
            } catch (e) {
                reject(e)
            }
        })
    }
}
