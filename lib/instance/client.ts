import AccountManager from "../managers/client/accountmanager"
import ServerManager from "../managers/client/servermanager"
import Instance from "./instance"

export default class ClientInstance extends Instance {
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
