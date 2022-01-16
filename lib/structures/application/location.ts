import * as Types from "../../types"
import ApplicationInstance from "../../instance/application"

export default class Location {
    public id: number
    public short: string
    public long: string | null
    public updated_at: string
    public created_at: string

    public raw: any

    constructor(private _client: ApplicationInstance, data: any) {
        const attributes = data.attributes
        this.id = attributes.id
        this.short = attributes.short
        this.long = attributes.long
        this.updated_at = attributes.updated_at
        this.created_at = attributes.created_at

        this.raw = data
    }

    update(params: Types.createOrUpdateLocationParams): Promise<Location> {
        return new Promise(async (resolve, reject) => {
            try {
                resolve(new Location(this._client, await this._client.call({ endpoint: "locations/" + this.id, method: "PATCH", body: params })))
            } catch (e) {
                reject(e)
            }
        })
    }

    delete() {
        return new Promise(async (resolve, reject) => {
            try {
                resolve(await this._client.call({ endpoint: "locations/" + this.id, method: "DELETE" }))
            } catch (e) {
                reject(e)
            }
        })
    }
}
