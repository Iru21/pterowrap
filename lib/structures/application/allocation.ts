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
        const attributes = data.attributes
        this.id = attributes.id
        this.ip = attributes.ip
        this.alias = attributes.alias
        this.port = attributes.port
        this.notes = attributes.notes
        this.assigned = attributes.assigned

        this.raw = attributes
    }

    delete() {
        return new Promise(async (resolve, reject) => {
            try {
                resolve(await this._client.call({ endpoint: `nodes/${this._node.id}/allocations/${this.id}`, method: "DELETE" }))
            } catch (e) {
                reject(e)
            }
        })
    }
}
