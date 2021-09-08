export default class User {

    id: number
    external_id: null | string
    uuid: string
    username: string
    email: string
    first_name: string
    last_name: string
    language: string
    root_admin: boolean
    "2fa": boolean
    created_at: string
    updated_at: string
    raw: any

    constructor(raw: any) {
        this.id = raw.id
        this.external_id = raw.external_id
        this.uuid = raw.uuid
        this.username = raw.username
        this.email = raw.email
        this.first_name = raw.first_name
        this.last_name = raw.last_name
        this.language = raw.language
        this.root_admin = raw.root_admin
        this["2fa"] = raw["2fa"]
        this.created_at = raw.created_at
        this.updated_at = raw.updated_at
        this.raw = raw
    }
}