import * as Types from "../../types"
import ApplicationInstance from "../../instance/application"

export default class User {
    public id: number
    public external_id: null | string
    public uuid: string
    public username: string
    public email: string
    public first_name: string
    public last_name: string
    public language: string
    public root_admin: boolean
    public "2fa": boolean
    public created_at: string
    public updated_at: string
    public raw: any

    constructor(private _client: ApplicationInstance, data: any) {
        const attributes = data.attributes
        this.id = attributes.id
        this.external_id = attributes.external_id
        this.uuid = attributes.uuid
        this.username = attributes.username
        this.email = attributes.email
        this.first_name = attributes.first_name
        this.last_name = attributes.last_name
        this.language = attributes.language
        this.root_admin = attributes.root_admin
        this["2fa"] = attributes["2fa"]
        this.created_at = attributes.created_at
        this.updated_at = attributes.updated_at

        this.raw = attributes
    }

    update(params: Types.updateUserParams): Promise<User | null> {
        return new Promise(async (resolve, reject) => {
            try {
                resolve(new User(this._client, await this._client.call({ endpoint: "users/" + this.id, method: "PATCH", body: params })))
            } catch (e) {
                reject(e)
            }
        })
    }

    delete() {
        return new Promise(async (resolve, reject) => {
            try {
                resolve(await this._client.call({ endpoint: "users/" + this.id, method: "DELETE" }))
            } catch (e) {
                reject(e)
            }
        })
    }
}
