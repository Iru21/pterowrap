export default class Nest {

    id: number
    uuid: string
    author: string
    name: string
    description: string | null
    createdAt: string
    updatedAt: string
    raw: any

    constructor(raw: any) {
        this.id = raw.id
        this.uuid = raw.uuid
        this.author = raw.author
        this.name = raw.name
        this.description = raw.description == null ? "" : raw.description
        this.createdAt = raw.created_at
        this.updatedAt = raw.updated_at
        this.raw = raw
    }
}