import ClientInstance from "../../../instance/client"

import * as Types from "../../../types"
import Server from "../../../structures/client/server"
import Schedule from "../../../structures/client/server/schedule"

export default class ScheduleManager {
    constructor(private client: ClientInstance, public _parentServer: Server) {}

    list(options: Types.requestParameters = {}): Promise<Schedule[]> {
        return new Promise(async (resolve, reject) => {
            try {
                const list = await this.client.call({ endpoint: `servers/${this._parentServer.identifier}/schedules`, parameters: options })
                const r: Schedule[] = []
                for (let i = 0; i < list.data.length; i++) {
                    r.push(new Schedule(this.client, list.data[i], this._parentServer))
                }
                resolve(r)
            } catch (e) {
                reject(e)
            }
        })
    }

    get(id: number): Promise<Schedule> {
        return new Promise(async (resolve, reject) => {
            try {
                const data = await this.client.call({ endpoint: `servers/${this._parentServer.identifier}/schedules/${id}` })
                resolve(new Schedule(this.client, data, this._parentServer))
            } catch (e) {
                reject(e)
            }
        })
    }

    create(params: Types.createScheduleParams): Promise<Schedule> {
        return new Promise(async (resolve, reject) => {
            try {
                const data = await this.client.call({ endpoint: `servers/${this._parentServer.identifier}/schedules`, method: "POST", body: params })
                resolve(new Schedule(this.client, data, this._parentServer))
            } catch (e) {
                reject(e)
            }
        })
    }
}
