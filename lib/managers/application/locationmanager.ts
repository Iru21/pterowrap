import ApplicationInstance from "../../instance/application"

import handlePagination from "../../utils/handlepagination"
import * as Types from "../../types"
import Location from "../../structures/application/location"

export default class LocationManager {
    constructor(private client: ApplicationInstance) {}

    async list(options: Types.requestParameters = {}): Promise<Location[]> {
        return await handlePagination(this.client, "locations", options, Location)
    }

    async get(id: number, options: Types.requestParameters = {}): Promise<Location | null> {
        try {
            return new Location(this.client, (await this.client.call({ endpoint: "locations/" + id, parameters: options })).attributes)
        } catch {
            return null
        }
    }

    async create(params: Types.createLocationParams): Promise<Location> {
        return new Location(this.client, (await this.client.call({ endpoint: "locations", method: "POST", body: params })).attributes)
    }
}
