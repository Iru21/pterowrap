import LocationManager from "../managers/application/LocationManager"
import NestManager from "../managers/application/NestManager"
import NodeManager from "../managers/application/NodeManager"
import ServerManager from "../managers/application/ServerManager"
import UserManager from "../managers/application/UserManager"
import BaseInstance from "./BaseInstance"

export default class ApplicationInstance extends BaseInstance {
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
