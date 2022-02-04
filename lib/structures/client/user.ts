import * as Types from "../../types"
import ClientInstance from "../../instance/client"

export default class User {
    public id: number
    public admin: boolean
    public username: string
    public email: string
    public first_name: string
    public last_name: string
    public language: string

    public raw: any

    constructor(private _client: ClientInstance, data: any) {
        const attributes = data.attributes
        this.id = attributes.id
        this.admin = attributes.admin
        this.username = attributes.username
        this.email = attributes.email
        this.first_name = attributes.first_name
        this.last_name = attributes.last_name
        this.language = attributes.language

        this.raw = attributes
    }
}
