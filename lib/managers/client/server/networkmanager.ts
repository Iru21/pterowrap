import ClientInstance from "../../../instance/client"

import * as Types from "../../../types"
import Server from "../../../structures/client/server"
import AllocationManager from "./allocationmanager"

export default class NetworkManager {
    public allocations: AllocationManager

    constructor(private client: ClientInstance, public _parentServer: Server) {
        this.allocations = new AllocationManager(this.client, this._parentServer)
    }
}
