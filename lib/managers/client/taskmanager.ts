import ClientInstance from "../../instance/client"

import * as Types from "../../types"
import Server from "../../structures/client/server"
import Schedule from "../../structures/client/schedule"
import Task from "../../structures/client/task"

export default class TaskManager {
    constructor(private client: ClientInstance, public _parentServer: Server, public _parentSchedule: Schedule) {}

    create(params: Types.createOrUpdateTaskParams): Promise<Task> {
        return new Promise(async (resolve, reject) => {
            try {
                const data = await this.client.call({ endpoint: `servers/${this._parentServer.identifier}/schedules/${this._parentSchedule.id}/tasks`, method: "POST", body: params })
                resolve(new Task(this.client, data, this._parentServer, this._parentSchedule))
            } catch (e) {
                reject(e)
            }
        })
    }

    // no endpoint for retrieving any tasks so I add this here for convenience
    update(id: number, params: Types.createOrUpdateTaskParams): Promise<Task> {
        return new Promise(async (resolve, reject) => {
            try {
                const data = await this.client.call({ endpoint: `servers/${this._parentServer.identifier}/schedules/${this._parentSchedule.id}/tasks/${id}`, method: "POST", body: params })
                resolve(new Task(this.client, data, this._parentServer, this._parentSchedule))
            } catch (e) {
                reject(e)
            }
        })
    }

    delete(id: number) {
        return new Promise(async (resolve, reject) => {
            try {
                resolve(await this.client.call({ endpoint: `servers/${this._parentServer.identifier}/schedules/${this._parentSchedule.id}/tasks/${id}`, method: "DELETE" }))
            } catch (e) {
                reject(e)
            }
        })
    }
}
