import AdminInstance from "../instances/admininstance";
import Database from "../types/database";

import { DatabaseParams } from "../arguments"

export default class DatabaseManager {

    private client: AdminInstance

    constructor(_client: AdminInstance) {
        this.client = _client;
    }

    async list(server: number): Promise<Database[]> {
        let current_page = (await this.client.call(`servers/${server}/databases`))
        let returner = []
        const pages = current_page.meta.pagination.total_pages
        let attIterator = 0
        for (let i = 0; i < pages; i++) {
            for(let j = 0; j < current_page.data.length; j++) {
                returner[attIterator] = new Database(current_page.data[j].attributes)
                attIterator++
            }
            let next_link = current_page.meta.pagination.links.next
            if(next_link) {
                next_link = next_link.replace(this.client.url, "")
                current_page = (await this.client.call(`servers/${server}/databases`))
            }
        }
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