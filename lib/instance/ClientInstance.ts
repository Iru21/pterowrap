import ServerManager from "../managers/client/ServerManager"
import AccountManager from "../managers/client/AccountManager"
import BaseInstance from "./BaseInstance"

export default class ClientInstance extends BaseInstance {
    public servers: ServerManager
    public account: AccountManager

    constructor(url: string | undefined, api_key: string | undefined) {
        super(url, api_key, "client")

        this.servers = new ServerManager(this)
        this.account = new AccountManager(this)
    }

    retrievePermissions() {
        return new Promise(async (resolve, reject) => {
            try {
                resolve((await this.call({ endpoint: "permissions" })).attributes.permissions)
            } catch (e) {
                reject(e)
            }
        })
    }
}
