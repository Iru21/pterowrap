import ClientInstance from "../../instance/client"

import handlePagination from "../../utils/handlepagination"
import * as Types from "../../types"
import Server from "../../structures/client/server"
import Backup from "../../structures/client/backup"

export default class BackupManager {
    constructor(private client: ClientInstance, public _parentServer: Server) {}

    list(options: Types.requestParameters = {}): Promise<Backup[]> {
        return new Promise(async (resolve, reject) => {
            try {
                resolve(await handlePagination(this.client, "backups", options, Backup, this._parentServer))
            } catch (e) {
                reject(e)
            }
        })
    }

    get(uuid: string): Promise<Backup> {
        return new Promise(async (resolve, reject) => {
            try {
                resolve(new Backup(this.client, (await this.client.call({ endpoint: `servers/${this._parentServer.identifier}/backups/${uuid}` })).data, this._parentServer))
            } catch (e) {
                reject(e)
            }
        })
    }

    create(): Promise<Backup> {
        return new Promise(async (resolve, reject) => {
            try {
                resolve(new Backup(this.client, (await this.client.call({ endpoint: `servers/${this._parentServer.identifier}/backups`, method: "POST" })).data, this._parentServer))
            } catch (e) {
                reject(e)
            }
        })
    }
}
