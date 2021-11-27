import * as Types from "../../types"
import ApplicationInstance from "../../instance/application"
import Node from "../../structures/application/node"

export default class Allocation {
    public id: number
    public ip: string
    public alias: string | null
    public port: number
    public notes: string | null
    public assigned: boolean

    public raw: any

    constructor(private _client: ApplicationInstance, data: any, private _node: Node) {
        this.id = data.id
        this.ip = data.ip
        this.alias = data.alias
        this.port = data.port
        this.notes = data.notes
        this.assigned = data.assigned

        this.raw = data
    }

    async delete() {
        await this._client.call({ endpoint: `nodes/${this._node.id}/allocations/${this.id}`, method: "DELETE" })
    }
}
