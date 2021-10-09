import AdminInstance from "../instances/admininstance";
import Database from "../types/database";

import { DatabaseParams } from "../arguments"

export default class DatabaseManager {

    private client: AdminInstance

    constructor(_client: AdminInstance) {
        this.client = _client;
    }

    async list(server: number): Promise<Database[]> {
        const databases = (await this.client.call(`servers/${server}/databases`)).data
        const returner = []
        for(let i = 0; i < databases.length; i++) {
            returner[i] = new Database(databases[i].attributes)
        }
        // endpoint returns no pagination? bruh
        return returner
    }

    async get(server: number, id: number): Promise<Database | null> {
        try {
            return new Database((await this.client.call(`servers/${server}/databases/${id}`)).attributes)
        } catch { return null }
    }

    async create(server: number, params: DatabaseParams): Promise<Database | null> {
        try {
            return new Database((await this.client.call(`servers/${server}/databases`, 'POST', params)))
        } catch { return null }
    }

    resetPassword(server: number, id: number) {
        this.client.call(`servers/${server}/databases/${id}/reset-password`, 'POST')
    }

    delete(server: number, id: number) {
        this.client.call(`servers/${server}/databases/${id}`, 'DELETE')
    }
}