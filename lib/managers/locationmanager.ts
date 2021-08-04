import AdminInstance from "../instances/admininstance";
import Location from "../types/location"

export default class LocationManager {

    private client: AdminInstance

    constructor(_client: AdminInstance) {
        this.client = _client;
    }

    async list(handlePagination: boolean = false): Promise<Location[]> {
        let current_page = (await this.client.call("locations"))
        let returner = []
        if(handlePagination) {
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
        } else {
            returner = current_page.data
        }
        return returner
    }
}