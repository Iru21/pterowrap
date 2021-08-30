import AdminInstance from "../instances/admininstance";
import Location from "../types/location"

export default class LocationManager {

    private client: AdminInstance

    constructor(_client: AdminInstance) {
        this.client = _client;
    }

    async list(): Promise<Location[]> {
        let current_page = (await this.client.call("locations"))
        let returner = []
        const pages = current_page.meta.pagination.total_pages
        let attIterator = 0
        for (let i = 0; i < pages; i++) {
            for(let j = 0; j < current_page.data.length; j++) {
                returner[attIterator] = new Location(current_page.data[j].attributes)
                attIterator++
            }
            let next_link = current_page.meta.pagination.links.next
            if(next_link) {
                next_link = next_link.replace(this.client.url, "")
                current_page = (await this.client.call("locations"))
            }
        }
        return returner
    }

    async get(id: number): Promise<Location> {
        return new Location((await this.client.call("locations/" + id)).attributes)
    }

    async create(shortName: string, longName: string | null): Promise<Location> {
        if(longName == null) longName = shortName
        if(shortName.length > 60 || longName.length > 255) throw new Error("Provided shortName(amx 60)/longName(max 255) value exeeds max length!")
        const returnedLocation = new Location(
            await this.client.call(
                "locations",
                "POST",
                {
                    short: shortName,
                    long: longName,
                }
            )
        )
        return returnedLocation
    }

    async edit(id: number, shortName: string, longName: string | null): Promise<Location> {
        if(longName == null) longName = shortName
        if(shortName.length > 60 || longName.length > 255) throw new Error("Provided shortName(amx 60)/longName(max 255) value exeeds max length!")
        const returnedLocation = new Location(
            await this.client.call(
                "locations/" + id,
                "PATCH",
                {
                    short: shortName,
                    long: longName,
                }
            )
        )
        return returnedLocation
    }

    async delete(id: number) {
        await this.client.call(
            "locations/" + id,
            "DELETE"
        )
    }
}