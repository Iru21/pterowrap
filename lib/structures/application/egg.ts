import * as Types from "../../types"
import ApplicationInstance from "../../instance/application"
import Nest from "./nest"

export default class Egg {
    public id: number
    public uuid: string
    public name: string
    public nest: number
    public author: string
    public description: string
    public docker_image: string
    public docker_images: string[]
    public config: {
        [key: string]: any
    }
    public startup: {
        [key: string]: any
    }
    public script: {
        [key: string]: any
    }
    public created_at: string
    public updated_at: string

    public raw: any

    constructor(private _client: ApplicationInstance, data: any) {
        const attributes = data.attributes
        this.id = attributes.id
        this.uuid = attributes.uuid
        this.name = attributes.name
        this.nest = attributes.nest
        this.author = attributes.author
        this.description = attributes.description
        this.docker_image = attributes.docker_image
        this.docker_images = attributes.docker_images
        this.config = attributes.config
        this.startup = attributes.startup
        this.script = attributes.script
        this.created_at = attributes.created_at
        this.updated_at = attributes.updated_at

        this.raw = attributes
    }
}
