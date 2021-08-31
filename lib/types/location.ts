export default class Location {

    id: number
    shortName: string
    longName: string
    updatedAt: string
    createdAt: string
    raw: any

    constructor(raw: any) {
        this.id = raw.id;
        this.shortName = raw.short
        this.longName = raw.long
        this.updatedAt = raw.updated_at
        this.createdAt = raw.created_at
        this.raw = raw
    }
}