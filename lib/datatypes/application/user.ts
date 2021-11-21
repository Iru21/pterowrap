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
        this.id = data.id
        this.external_id = data.external_id
        this.uuid = data.uuid
        this.username = data.username
        this.email = data.email
        this.first_name = data.first_name
        this.last_name = data.last_name
        this.language = data.language
        this.root_admin = data.root_admin
        this["2fa"] = data["2fa"]
        this.created_at = data.created_at
        this.updated_at = data.updated_at
        this.raw = data

        this._client = _client
    }

    async update(params: Types.updateUserParams): Promise<User | null> {
        try {
            const returnedUser = new User(this._client, (await this._client.call({ endpoint: "users/" + this.id, method: "PATCH", body: params })).attributes)
            return returnedUser
        } catch {
            return null
        }
    }

    async delete() {
        this._client.call({ endpoint: "users/" + this.id, method: "DELETE" })
    }
}
