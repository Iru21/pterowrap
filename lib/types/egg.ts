export default class Egg {
    
    id: number
    name: string
    uuid: string
    nestId: number
    author: string
    description: string | null
    dockerImage: string
    dockerImages: any[]
    config: any
    createdAt: string
    updatedAt: string
    script: any
    startup: string
    raw: any

    constructor(raw: any) {
        this.id = raw.id
        this.name = raw.name
        this.uuid = raw.uuid
        this.nestId = raw.nest
        this.author = raw.author
        this.description = raw.description == null ? "" : raw.description
        this.dockerImage = raw.docker_image
        this.dockerImages = raw.docker_images
        this.config = raw.config
        this.script = raw.script
        this.startup = raw.startup
        this.createdAt = raw.created_at
        this.updatedAt = raw.updated_at
        this.raw = raw
    }    
}