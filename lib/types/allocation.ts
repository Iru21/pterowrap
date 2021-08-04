export default class Allocation {

    id: Number
    ip: string
    alias: string | null
    port: Number
    assigned: boolean

    constructor (raw: any) {
        this.id = raw.id
        this.ip = raw.ip
        this.alias = raw.alias
        this.port = raw.port
        this.assigned = raw.assigned
    }
}