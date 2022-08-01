import * as Types from "../../utils/Types"
import ApplicationInstance from "../../instance/ApplicationInstance"
import EggManager from "../../managers/application/EggManager"

export default class Nest {
    public id: number
    public uuid: string
    public author: string
    public name: string
    public description: string | null
    public created_at: string
    public updated_at: string

    public raw: any

    public eggs: EggManager

    constructor(private _client: ApplicationInstance, data: any) {
        const attributes = data.attributes
        this.id = attributes.id
        this.uuid = attributes.uuid
        this.author = attributes.author
        this.name = attributes.name
        this.description = attributes.description
        this.created_at = attributes.created_at
        this.updated_at = attributes.updated_at

        this.raw = attributes

        this.eggs = new EggManager(this._client, this)
    }
}
