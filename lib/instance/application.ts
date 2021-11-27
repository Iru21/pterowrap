import NodeManager from "../managers/application/nodemanager"
import UserManager from "../managers/application/usermanager"
import Instance from "./instance"

export default class ApplicationInstance extends Instance {
    public users: UserManager
    public nodes: NodeManager

    constructor(url: string | undefined, api_key: string | undefined) {
        super(url, api_key, "application")

        this.users = new UserManager(this)
        this.nodes = new NodeManager(this)
    }
}
