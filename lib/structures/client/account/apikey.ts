import ClientInstance from "../../../instance/ClientInstance"

export default class APIKey {
    public identifier: string
    public description: string
    public allowed_ips: string[]
    public last_used_at: string | null
    public created_at: string

    public raw: any

    constructor(private _client: ClientInstance, data: any) {
        const attributes = data.attributes
        this.identifier = attributes.identifier
        this.description = attributes.description
        this.allowed_ips = attributes.allowed_ips
        this.last_used_at = attributes.last_used_at
        this.created_at = attributes.created_at

        this.raw = attributes
    }

    public async delete() {
        return new Promise(async (resolve, reject) => {
            try {
                resolve(await this._client.call({ endpoint: `account/api-keys/${this.identifier}`, method: "DELETE" }))
            } catch (e) {
                reject(e)
            }
        })
    }
}
