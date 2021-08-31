export default class Database {

    id: number
    server: number
    host: number
    database: string
    username: string
    remote: string
    created_at: string
    updated_at: string
    raw: any

    constructor(raw: any) {
        this.id = raw.id
        this.server = raw.server
        this.host = raw.host
        this.database = raw.database
        this.username = raw.username
        this.remote = raw.remote
        this.created_at = raw.created
        this.updated_at = raw.updated
        this.raw = raw
    }

}