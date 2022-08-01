import ApplicationInstance from "../../instance/ApplicationInstance"
import Location from "../../structures/application/Location"

import * as Types from "../../utils/Types"
import Util from "../../utils/Util"

export default class LocationManager {
    constructor(private client: ApplicationInstance) {}

    list(options: Types.requestParameters = {}): Promise<Location[]> {
        return new Promise(async (resolve, reject) => {
            try {
                resolve(await Util.handlePagination(this.client, "locations", options, Location))
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
