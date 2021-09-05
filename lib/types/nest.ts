export default class Nest {

    id: number
    uuid: string
    author: string
    name: string
    description: string | null
    created_at: string
    updated_at: string
    raw: any

    constructor(raw: any) {
        this.id = raw.id
        this.uuid = raw.uuid
        this.author = raw.author
        this.name = raw.name
        this.description = raw.description == null ? "" : raw.description
        this.created_at = raw.created_at
        this.updated_at = raw.updated_at
        this.raw = raw
    }
}