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
        let returner = []
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

    async get(id: Number): Promise<Nest> {
        return new Nest((await this.client.call("nests/" + id)).attributes)
    }

    async listEggs(nestId: number): Promise<Egg[]> {
        const eggs = (await this.client.call("nests/" + nestId + "/eggs")).data
        let returner = []
        for(var i = 0; i < eggs.length; i++) {
            returner[i] = new Egg(eggs[i].attributes)
        }
        //endpoint returns no pagination? bruh
        return returner
    }

    async getEgg(nestId: Number, eggId: Number): Promise<Egg> {
        return new Egg((await this.client.call("nests/" + nestId + "/eggs/" + eggId)).attributes)
    }
}