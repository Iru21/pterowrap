import AdminInstance from "../instances/admininstance";
import User from "../types/user"

import { UserParams } from '../arguments'

export default class UserManager {

    private client: AdminInstance

    constructor(_client: AdminInstance) {
        this.client = _client;
    }

    async list(): Promise<User[]> {
        let current_page = (await this.client.call("users"))
        let returner = []
        const pages = current_page.meta.pagination.total_pages
        let attIterator = 0
        for (let i = 0; i < pages; i++) {
            for(let j = 0; j < current_page.data.length; j++) {
                returner[attIterator] = new User(current_page.data[j].attributes)
                attIterator++
            }
            let next_link = current_page.meta.pagination.links.next
            if(next_link) {
                next_link = next_link.replace(this.client.url, "")
                current_page = (await this.client.call("users"))
            }
        }
        return returner
    }

    async get(id: number): Promise<User | null> {
        try {
            return new User((await this.client.call("users/" + id)).attributes)
        } catch { return null }
        
    }

    async getByExternalId(id: any): Promise<User | null> {
        try {
            return new User((await this.client.call("users/external/" + id.toString())).attributes)
        } catch { return null }
    }

    async create(params: UserParams): Promise<User> {
        const returnedUser = new User((await this.client.call("users", "POST", params)).attributes)
        return returnedUser
    }

    async edit(id: number, params: UserParams): Promise<User | null> {
        try {
            const returnedUser = new User((await this.client.call("users/" + id, "PATCH", params)).attributes)
            return returnedUser
        } catch { return null }
    }

    async delete(id: number) {
        this.client.call("users/" + id, "DELETE")
    }
}