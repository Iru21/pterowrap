import ClientInstance from "../../../instance/ClientInstance"

import Server from "../../../structures/client/Server"
import AllocationManager from "./AllocationManager"

export default class NetworkManager {
    public allocations: AllocationManager

    constructor(private client: ClientInstance, public _parentServer: Server) {
        this.allocations = new AllocationManager(this.client, this._parentServer)
    }
}
