import AdminInstance from "../instances/admininstance";
import Server from "../types/server";

import { ServerParams, ServerBuildParams } from "../arguments"

import DatabaseManager from "./databasemanager";

export default class ServerManager {

    private client: AdminInstance
    databases: DatabaseManager

    constructor(_client: AdminInstance) {
        this.client = _client;
        
        this.databases = new DatabaseManager(this.client)
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

    async get(id: number): Promise<Server | null> {
        try {
            return new Server((await this.client.call("servers/" + id)).attributes)
        } catch { return null }
    }

    async getByExternalId(id: any): Promise<Server | null> {
        try {
            return new Server((await this.client.call("servers/external/" + id)).attributes)
        } catch { return null }
    }

    async create(useEggProperties: boolean, params: ServerParams): Promise<Server | null> {
        try {
            if(!this.client.users.get(params.user)) throw new Error("Invalid user id provided!")

            const eggProperties = await this.client.nests.getEgg2(params.egg)
            if(!eggProperties) throw new Error("Invalid egg id provided!")
            if(useEggProperties) {
                params.docker_image = eggProperties.dockerImage
                params.startup = eggProperties.startup
            }

            const returnedServer = new Server((await this.client.call("servers", "POST", params)).attributes)
            return returnedServer
        } catch { return null }
    }

    //ctrl + c goes brrrrrrr lmao

    async updateExternalID(id: number, external_id: any): Promise<Server | null> {
        const currentServerDetails = await this.get(id)
        if(!currentServerDetails) throw new Error("Invalid server id provided!")
        try {
            return new Server((await this.client.call(`servers/${id}/details`, 'PATCH', {
                external_id: external_id,
                name: currentServerDetails.name,
                user: currentServerDetails.user,
                description: currentServerDetails.description
            })))
        } catch { return null }
    }

    async updateName(id: number, name: string): Promise<Server | null> {
        const currentServerDetails = await this.get(id)
        if(!currentServerDetails) throw new Error("Invalid server id provided!")
        try {
            return new Server((await this.client.call(`servers/${id}/details`, 'PATCH', {
                external_id: currentServerDetails.external_id,
                name: name,
                user: currentServerDetails.user,
                description: currentServerDetails.description
            })))
        } catch { return null }
    }

    async updateUser(id: number, user: number): Promise<Server | null> {
        const currentServerDetails = await this.get(id)
        if(!currentServerDetails) throw new Error("Invalid server id provided!")
        try {
            return new Server((await this.client.call(`servers/${id}/details`, 'PATCH', {
                external_id: currentServerDetails.external_id,
                name: currentServerDetails.name,
                user: user,
                description: currentServerDetails.description
            })))
        } catch { return null }
    }

    async updateDescription(id: number, description: string): Promise<Server | null> {
        const currentServerDetails = await this.get(id)
        if(!currentServerDetails) throw new Error("Invalid server id provided!")
        try {
            return new Server((await this.client.call(`servers/${id}/details`, 'PATCH', {
                external_id: currentServerDetails.external_id,
                name: currentServerDetails.name,
                user: currentServerDetails.user,
                description: description
            })))
        } catch { return null }
    }

    async updateStartup(id: number, startup: string): Promise<Server | null> {
        const currentServerDetails = await this.get(id)
        if(!currentServerDetails) throw new Error("Invalid server id provided!")
        try {
            return new Server((await this.client.call(`servers/${id}/startup`, 'PATCH', {
                startup: startup,
                environment: currentServerDetails.container.environment,
                egg: currentServerDetails.egg,
                pack: currentServerDetails.pack,
                image: currentServerDetails.container.image,
                skip_scripts: false
            })))
        } catch { return null }
    }

    async updateEnvironment(id: number, environment: any): Promise<Server | null> {
        const currentServerDetails = await this.get(id)
        if(!currentServerDetails) throw new Error("Invalid server id provided!")
        try {
            return new Server((await this.client.call(`servers/${id}/startup`, 'PATCH', {
                startup: currentServerDetails.container.startup_command,
                environment: environment,
                egg: currentServerDetails.egg,
                pack: currentServerDetails.pack,
                image: currentServerDetails.container.image,
                skip_scripts: false
            })))
        } catch { return null }
    }

    async updateEgg(id: number, egg: number): Promise<Server | null> {
        const currentServerDetails = await this.get(id)
        if(!currentServerDetails) throw new Error("Invalid server id provided!")
        try {
            return new Server((await this.client.call(`servers/${id}/startup`, 'PATCH', {
                startup: currentServerDetails.container.startup_command,
                environment: currentServerDetails.container.environment,
                egg: egg,
                pack: currentServerDetails.pack,
                image: currentServerDetails.container.image,
                skip_scripts: false
            })))
        } catch { return null }
    }

    async updatePack(id: number, pack: number): Promise<Server | null> {
        const currentServerDetails = await this.get(id)
        if(!currentServerDetails) throw new Error("Invalid server id provided!")
        try {
            return new Server((await this.client.call(`servers/${id}/startup`, 'PATCH', {
                startup: currentServerDetails.container.startup_command,
                environment: currentServerDetails.container.environment,
                egg: currentServerDetails.egg,
                pack: pack,
                image: currentServerDetails.container.image,
                skip_scripts: false
            })))
        } catch { return null }
    }
    
    async updateImage(id: number, image: string): Promise<Server | null> {
        const currentServerDetails = await this.get(id)
        if(!currentServerDetails) throw new Error("Invalid server id provided!")
        try {
            return new Server((await this.client.call(`servers/${id}/startup`, 'PATCH', {
                startup: currentServerDetails.container.startup_command,
                environment: currentServerDetails.container.environment,
                egg: currentServerDetails.egg,
                pack: currentServerDetails.pack,
                image: image,
                skip_scripts: false
            })))
        } catch { return null }
    }

    async updateScripts(id: number, skip_scripts: boolean): Promise<Server | null> {
        const currentServerDetails = await this.get(id)
        if(!currentServerDetails) throw new Error("Invalid server id provided!")
        try {
            return new Server((await this.client.call(`servers/${id}/startup`, 'PATCH', {
                startup: currentServerDetails.container.startup_command,
                environment: currentServerDetails.container.environment,
                egg: currentServerDetails.egg,
                pack: currentServerDetails.pack,
                image: currentServerDetails.container.image,
                skip_scripts: skip_scripts
            })))
        } catch { return null }
    }

    async updateBuildConfiguration(id: number, params: ServerBuildParams): Promise<Server | null> {
        const currentServerDetails = await this.get(id)
        if(!currentServerDetails) throw new Error("Invalid server id provided!")
        try {
            return new Server((await this.client.call(`servers/${id}/build`, 'PATCH', params)))
        } catch { return null }
    }

    suspend(id: number) {
        this.client.call(`servers/${id}/suspend`, 'POST')
    }

    unsuspend(id: number) {
        this.client.call(`servers/${id}/unsuspend`, 'POST')
    }

    reinstall(id: number) {
        this.client.call(`servers/${id}/reinstall`, 'POST')
    }

    rebuild(id: number) {
        this.client.call(`servers/${id}/rebuild`, 'POST')
    }

    delete(id: number, force: boolean = false) {
        if(force) this.client.call(`servers/${id}`, 'DELETE')
        else this.client.call(`servers/${id}/force`, 'DELETE')
    }
}