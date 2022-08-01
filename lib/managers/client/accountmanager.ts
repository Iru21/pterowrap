import ClientInstance from "../../instance/ClientInstance"

import User from "../../structures/client/User"
import APIKeyManager from "./account/APIKeyManager"
import TwoFactorManager from "./account/TwoFactorManager"

export default class AccountManager {
    public twofactor: TwoFactorManager
    public apikeys: APIKeyManager

    constructor(private client: ClientInstance) {
        this.twofactor = new TwoFactorManager(client)
        this.apikeys = new APIKeyManager(client)
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
                resolve(
                    await this.client.call({
                        endpoint: "account/password",
                        method: "PUT",
                        body: { current_password: current, password, password_confirmation: password },
                    })
                )
            } catch (e) {
                reject(e)
            }
        })
    }
}
