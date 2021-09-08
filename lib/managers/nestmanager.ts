import AdminInstance from "../instances/admininstance";
import Egg from "../types/egg";
import Nest from "../types/nest";

export default class NestManager {

    private client: AdminInstance

    constructor(_client: AdminInstance) {
        this.client = _client;
    }

    async list(): Promise<Nest[]> {
        let current_page = (await this.client.call("nests"))
        const returner = []
        const pages = current_page.meta.pagination.total_pages
        let attIterator = 0
        for (let i = 0; i < pages; i++) {
            for(let j = 0; j < current_page.data.length; j++) {
                returner[attIterator] = new Nest(current_page.data[j].attributes)
                attIterator++
            }
            let next_link = current_page.meta.pagination.links.next
            if(next_link) {
                next_link = next_link.replace(this.client.url, "")
                current_page = (await this.client.call("nests"))
            }
        }
        return returner
    }

    async get(id: number): Promise<Nest | null> {
        try {
            return new Nest((await this.client.call("nests/" + id)).attributes)
        } catch { return null }
    }

    async listEggs(nestId: number): Promise<Egg[]> {
        const eggs = (await this.client.call("nests/" + nestId + "/eggs")).data
        const returner = []
        for(let i = 0; i < eggs.length; i++) {
            returner[i] = new Egg(eggs[i].attributes)
        }
        // endpoint returns no pagination? bruh
        return returner
    }

    async getAllEggs(): Promise<Egg[]> {
        const nests = await this.list()
        const eggs = []
        for(let i = 0; i < nests.length; i++) {
            const nestEggs = await this.listEggs(nests[i].id)
            eggs.push(...nestEggs)
        }
        return eggs
    }

    async getEgg(nestId: number, eggId: number): Promise<Egg | null> {
        try {
            return new Egg((await this.client.call("nests/" + nestId + "/eggs/" + eggId)).attributes)
        } catch { return null }
    }

    async getEgg2(eggId: number): Promise<Egg | null> {
        const eggs = await this.getAllEggs()
        for(let i = 0; i < eggs.length; i ++) {
            if(eggs[i].id == eggId) {
                return eggs[i]
            }
        }

        return null
    }
}