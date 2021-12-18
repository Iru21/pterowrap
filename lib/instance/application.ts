import LocationManager from "../managers/application/locationmanager"
import NestManager from "../managers/application/nestmanager"
import NodeManager from "../managers/application/nodemanager"
import ServerManager from "../managers/application/servermanager"
import UserManager from "../managers/application/usermanager"
import Instance from "./instance"

export default class ApplicationInstance extends Instance {
    public users: UserManager
    public nodes: NodeManager
    public locations: LocationManager
    public nests: NestManager
    public servers: ServerManager

    constructor(url: string | undefined, api_key: string | undefined) {
        super(url, api_key, "application")

        this.users = new UserManager(this)
        this.nodes = new NodeManager(this)
        this.locations = new LocationManager(this)
        this.nests = new NestManager(this)
        this.servers = new ServerManager(this)
    }
}
