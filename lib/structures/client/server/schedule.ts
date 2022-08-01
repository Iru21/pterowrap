import * as Types from "../../../utils/Types"
import ClientInstance from "../../../instance/ClientInstance"
import Server from "../Server"
import TaskManager from "../../../managers/client/server/TaskManager"

export default class Schedule {
    public id: number
    public name: string
    public cron: {
        day_of_week: string
        day_of_month: string
        month: string
        hour: string
        minute: string
    }
    public is_active: boolean
    public is_processing: boolean
    public last_run_at?: string
    public next_run_at: string
    public created_at: string
    public updated_at: string
    public relationships: {
        [key: string]: any
    }

    public tasks: TaskManager

    public raw: any

    constructor(private _client: ClientInstance, data: any, public _parentServer: Server) {
        const attributes = data.attributes
        this.id = attributes.id
        this.name = attributes.name
        this.cron = attributes.cron
        this.is_active = attributes.is_active
        this.is_processing = attributes.is_processing
        this.last_run_at = attributes.last_run_at
        this.next_run_at = attributes.next_run_at
        this.created_at = attributes.created_at
        this.updated_at = attributes.updated_at
        this.relationships = attributes.relationships ? attributes.relationships : {}

        this.tasks = new TaskManager(this._client, this._parentServer, this)

        this.raw = attributes
    }

    update(params: Types.updateScheduleParams): Promise<Schedule> {
        return new Promise(async (resolve, reject) => {
            try {
                const data = await this._client.call({
                    endpoint: `servers/${this._parentServer.identifier}/schedules/${this.id}`,
                    method: "POST",
                    body: params,
                })
                resolve(new Schedule(this._client, data, this._parentServer))
            } catch (e) {
                reject(e)
            }
        })
    }

    delete() {
        return new Promise(async (resolve, reject) => {
            try {
                resolve(await this._client.call({ endpoint: `servers/${this._parentServer.identifier}/schedules/${this.id}`, method: "DELETE" }))
            } catch (e) {
                reject(e)
            }
        })
    }
}
