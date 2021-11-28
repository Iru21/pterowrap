import ClientInstance from "../instance/client"
import ApplicationInstance from "../instance/application"

import * as Types from "../types"

export default async function handlePagination(client: ApplicationInstance | ClientInstance, endpoint: string, options: Types.requestParameters, structure: any, additional_params?: any): Promise<any> {
    let current_page = await client.call({ endpoint, parameters: options })
    const returner = []
    let pages = current_page.meta.pagination.total_pages
    if (options.page) {
        pages -= options.page - 1
    }
    let attIterator = 0
    for (let i = 0; i < pages; i++) {
        for (let j = 0; j < current_page.data.length; j++) {
            returner[attIterator] = additional_params ? new structure(client, current_page.data[j], additional_params) : new structure(client, current_page.data[j])
            attIterator++
        }
        let next_link = current_page.meta.pagination.links.next
        if (next_link) {
            next_link = next_link.replace(client.url, "").replace("application", "").replace("client", "").replace(/\//g, "").split("?")
            options.page = next_link[1].split("=")[1]
            current_page = await client.call({ endpoint: next_link[0], parameters: options })
        }
    }
    return returner
}
