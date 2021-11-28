import * as Types from "../../types"
import ApplicationInstance from "../../instance/application"
import EggManager from "../../managers/application/eggmanager"

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
        this.id = data.id
        this.uuid = data.uuid
        this.author = data.author
        this.name = data.name
        this.description = data.description
        this.created_at = data.created_at
        this.updated_at = data.updated_at

        this.raw = data

        this.eggs = new EggManager(this._client, this)
    }
}
