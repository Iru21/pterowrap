export default class Allocation {

    id: number
    ip: string
    alias: string | null
    port: number
    assigned: boolean

    constructor (raw: any) {
        this.id = raw.id
        this.ip = raw.ip
        this.alias = raw.alias
        this.port = raw.port
        this.assigned = raw.assigned
    }
}