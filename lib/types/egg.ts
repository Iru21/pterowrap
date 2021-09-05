export default class Egg {
    
    id: number
    name: string
    uuid: string
    nest: number
    author: string
    description: string | null
    docker_image: string
    config: any
    created_at: string
    updated_at: string
    script: any
    startup: string
    raw: any

    constructor(raw: any) {
        this.id = raw.id
        this.name = raw.name
        this.uuid = raw.uuid
        this.nest = raw.nest
        this.author = raw.author
        this.description = raw.description == null ? "" : raw.description
        this.docker_image = raw.docker_image
        this.config = raw.config
        this.script = raw.script
        this.startup = raw.startup
        this.created_at = raw.created_at
        this.updated_at = raw.updated_at
        this.raw = raw
    }    
}