import ApplicationInstance from "../../instance/application"

import handlePagination from "../../utils/handlepagination"
import * as Types from "../../types"
import Location from "../../structures/application/location"

export default class LocationManager {
    constructor(private client: ApplicationInstance) {}

    list(options: Types.requestParameters = {}): Promise<Location[]> {
        return new Promise(async (resolve, reject) => {
            try {
                resolve(await handlePagination(this.client, "locations", options, Location))
            } catch (e) {
                reject(e)
            }
        })
    }

    get(id: number, options: Types.requestParameters = {}): Promise<Location> {
        return new Promise(async (resolve, reject) => {
            try {
                resolve(new Location(this.client, await this.client.call({ endpoint: "locations/" + id, parameters: options })))
            } catch (e) {
                reject(e)
            }
        })
    }

    create(params: Types.createOrUpdateLocationParams): Promise<Location> {
        return new Promise(async (resolve, reject) => {
            try {
                resolve(new Location(this.client, await this.client.call({ endpoint: "locations", method: "POST", body: params })))
            } catch (e) {
                reject(e)
            }
        })
    }
}
