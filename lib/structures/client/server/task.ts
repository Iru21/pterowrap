import * as Types from "../../../utils/Types"
import ClientInstance from "../../../instance/ClientInstance"
import Server from "../Server"
import Schedule from "./Schedule"

export default class Task {
    public id: number
    public sequence_id: number
    public action: string
    public payload: string
    public time_offset: number
    public is_queued: boolean
    public created_at: string
    public updated_at: string

    public raw: any

    constructor(private _client: ClientInstance, data: any, public _parentServer: Server, public _parentSchedule: Schedule) {
        const attributes = data.attributes
        this.id = attributes.id
        this.sequence_id = attributes.sequence_id
        this.action = attributes.action
        this.payload = attributes.payload
        this.time_offset = attributes.time_offset
        this.is_queued = attributes.is_queued
        this.created_at = attributes.created_at
        this.updated_at = attributes.updated_at

        this.raw = attributes
    }

    update(params: Types.createOrUpdateTaskParams): Promise<Task> {
        return new Promise(async (resolve, reject) => {
            try {
                const data = await this._client.call({
                    endpoint: `servers/${this._parentServer.identifier}/schedules/${this._parentSchedule.id}/tasks/${this.id}`,
                    method: "POST",
                    body: params,
                })
                resolve(new Task(this._client, data, this._parentServer, this._parentSchedule))
            } catch (e) {
                reject(e)
            }
        })
    }

    delete() {
        return new Promise(async (resolve, reject) => {
            try {
                resolve(
                    await this._client.call({
                        endpoint: `servers/${this._parentServer.identifier}/schedules/${this._parentSchedule.id}/tasks/${this.id}`,
                        method: "DELETE",
                    })
                )
            } catch (e) {
                reject(e)
            }
        })
    }
}
