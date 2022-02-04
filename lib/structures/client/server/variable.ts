import * as Types from "../../../types"
import ClientInstance from "../../../instance/client"
import Server from "../server"

export default class Variable {
    public name: string
    public description: string
    public env_variable: string
    public default_value: string
    public server_value: string
    public is_editable: boolean
    public rules: string

    public raw: any

    constructor(private _client: ClientInstance, data: any, public _parentServer: Server) {
        const attributes = data.attributes
        this.name = attributes.name
        this.description = attributes.description
        this.env_variable = attributes.env_variable
        this.default_value = attributes.default_value
        this.server_value = attributes.server_value
        this.is_editable = attributes.is_editable
        this.rules = attributes.rules

        this.raw = attributes
    }

    update(value: string): Promise<Variable> {
        return new Promise(async (resolve, reject) => {
            try {
                const data = await this._client.call({
                    endpoint: `servers/${this._parentServer.identifier}/startup/variable`,
                    method: "PUT",
                    body: { key: this.env_variable, value },
                })
                resolve(new Variable(this._client, data, this._parentServer))
            } catch (e) {
                reject(e)
            }
        })
    }
}
