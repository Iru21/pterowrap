export default class Location {

    id: number
    short: string
    long: string
    updated_at: string
    created_at: string
    raw: any

    constructor(raw: any) {
        this.id = raw.id;
        this.short = raw.short
        this.long = raw.long
        this.updated_at = raw.updated_at
        this.created_at = raw.created_at
        this.raw = raw
    }
}