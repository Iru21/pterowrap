import ClientInstance from "../../../instance/ClientInstance"

import * as Types from "../../../utils/Types"
import Server from "../../../structures/client/Server"
import Backup from "../../../structures/client/server/Backup"
import Util from "../../../utils/Util"

export default class BackupManager {
    constructor(private client: ClientInstance, public _parentServer: Server) {}

    list(options: Types.requestParameters = {}): Promise<Backup[]> {
        return new Promise(async (resolve, reject) => {
            try {
                resolve(await Util.handlePagination(this.client, "backups", options, Backup, this._parentServer))
            } catch (e) {
                reject(e)
            }
        })
    }

    get(uuid: string): Promise<Backup> {
        return new Promise(async (resolve, reject) => {
            try {
                resolve(
                    new Backup(
                        this.client,
                        (await this.client.call({ endpoint: `servers/${this._parentServer.identifier}/backups/${uuid}` })).data,
                        this._parentServer
                    )
                )
            } catch (e) {
                reject(e)
            }
        })
    }

    create(): Promise<Backup> {
        return new Promise(async (resolve, reject) => {
            try {
                resolve(
                    new Backup(
                        this.client,
                        (await this.client.call({ endpoint: `servers/${this._parentServer.identifier}/backups`, method: "POST" })).data,
                        this._parentServer
                    )
                )
            } catch (e) {
                reject(e)
            }
        })
    }
}
