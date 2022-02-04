import ClientInstance from "../../instance/client"

import handlePagination from "../../utils/handlepagination"
import * as Types from "../../types"
import User from "../../structures/client/user"
import TwoFactorManager from "./account/twofactormanager"

export default class AccountManager {
    public twofactor: TwoFactorManager

    constructor(private client: ClientInstance) {
        this.twofactor = new TwoFactorManager(client)
    }

    retrieveDetails() {
        return new Promise(async (resolve, reject) => {
            try {
                resolve(new User(this.client, await this.client.call({ endpoint: "account" })))
            } catch (e) {
                reject(e)
            }
        })
    }

    updateEmail(email: string, password: string) {
        return new Promise(async (resolve, reject) => {
            try {
                resolve(await this.client.call({ endpoint: "account/email", method: "PUT", body: { email, password } }))
            } catch (e) {
                reject(e)
            }
        })
    }

    updatePassword(current: string, password: string) {
        return new Promise(async (resolve, reject) => {
            try {
                resolve(await this.client.call({ endpoint: "account/password", method: "PUT", body: { current_password: current, password, password_confirmation: password } }))
            } catch (e) {
                reject(e)
            }
        })
    }
}
