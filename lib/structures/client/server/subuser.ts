import * as Types from "../../../utils/Types"
import ClientInstance from "../../../instance/ClientInstance"
import Server from "../Server"

export default class Subuser {
    public uuid: string
    public username: string
    public email: string
    public image: string
    public "2fa_enable": boolean
    public created_at: string
    public permissions: (Types.Permission | string)[]

    public raw: any

    constructor(private _client: ClientInstance, data: any, public _parentServer: Server) {
        const attributes = data.attributes
        this.uuid = attributes.uuid
        this.username = attributes.username
        this.email = attributes.email
        this.image = attributes.image
        this["2fa_enable"] = attributes["2fa_enable"]
        this.created_at = attributes.created_at
        this.permissions = attributes.permissions
        this.raw = attributes
    }

    update(params: Types.updateSubuserParams): Promise<Subuser> {
        return new Promise(async (resolve, reject) => {
            try {
                resolve(
                    new Subuser(
                        this._client,
                        (
                            await this._client.call({ endpoint: `servers/${this._parentServer.identifier}/users/${this.uuid}`, method: "POST", body: params })
                        ).data,
                        this._parentServer
                    )
                )
            } catch (e) {
                reject(e)
            }
        })
    }

    delete() {
        return new Promise(async (resolve, reject) => {
            try {
                resolve(await this._client.call({ endpoint: `servers/${this._parentServer.identifier}/users/${this.uuid}`, method: "DELETE" }))
            } catch (e) {
                reject(e)
            }
        })
    }
}
