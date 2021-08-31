export default class Statistics {

    state: 'on' | 'off'
    memory: {
        current: number
        limit: number
    }
    cpu: {
        current: number
        cores: number[]
        limit: number
    }
    disk: {
        current: number
        limit: number
    }
    raw: any

    constructor(raw: any) {
        this.state = raw.state
        this.memory = raw.memory
        this.cpu = raw.cpu
        this.disk = raw.disk
        this.raw = raw
    }

}