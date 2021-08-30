import AdminInstance from "../instances/admininstance";
import allocation from "../types/allocation";
import Server from "../types/server";

type ServerParams = {
    external_id: string | number | null
    name: string
    user: number
    description: string | null
    egg: number
    docker_image: string
    startup: string
    limits: {
        memory: number
        swap: number
        disk: number
        io: number
        cpu: number
    }
    feature_limits: {
        databases: number
        allocations: number
        backups: number
    }
    environment: any
    allocation: null | {
        default: number
        additional: null | number[]
    }
    skip_scripts: boolean
}


export default class ServerManager {

    private client: AdminInstance

    constructor(_client: AdminInstance) {
        this.client = _client;
    }

    async list(): Promise<Server[]> {
        let current_page = (await this.client.call("servers"))
        let returner = []
        const pages = current_page.meta.pagination.total_pages
        let attIterator = 0
        for (let i = 0; i < pages; i++) {
            for(let j = 0; j < current_page.data.length; j++) {
                returner[attIterator] = new Server(current_page.data[j].attributes)
                attIterator++
            }
            let next_link = current_page.meta.pagination.links.next
            if(next_link) {
                next_link = next_link.replace(this.client.url, "")
                current_page = (await this.client.call("servers"))
            }
        }
        return returner
    }

    async get(id: number): Promise<Server> {
        return new Server((await this.client.call("servers/" + id)).attributes)
    }

    async getByExternalId(id: number): Promise<Server> {
        return new Server((await this.client.call("servers/external/" + id)).attributes)
    }

    async create(useEggProperties: boolean, params: ServerParams): Promise<Server> {
        if(params.description == null) params.description = ""
        params.external_id = params.external_id?.toString() != undefined ? params.external_id?.toString() : null
        const eggProperties = await this.client.nests.getEgg2(params.egg)
        if(eggProperties == null) throw new Error("Invalid egg id provided!")
        if(useEggProperties) {
            params.docker_image = eggProperties.dockerImage
            params.startup = eggProperties.startup
        }

        const returnedServer = new Server((await this.client.call("servers", "POST", params)))
        return returnedServer
    }
}