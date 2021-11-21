import ClientInstance from "../instance/client"
import ApplicationInstance from "../instance/application"

import * as Types from "../types"

export default async function handlePagination(client: ApplicationInstance | ClientInstance, endpoint: string, options: Types.requestParameters, datatype: (c: ApplicationInstance | ClientInstance, data: any) => any): Promise<any> {
    let current_page = await client.call({ endpoint, parameters: options })
    const returner = []
    const pages = current_page.meta.pagination.total_pages
    let attIterator = 0
    for (let i = 0; i < pages; i++) {
        for (let j = 0; j < current_page.data.length; j++) {
            returner[attIterator] = datatype(client, current_page.data[j].attributes)
            attIterator++
        }
        let next_link = current_page.meta.pagination.links.next
        if (next_link) {
            next_link = next_link.replace(client.url, "").replace("application", "").replace(/\//g, "")
            current_page = await client.call({ endpoint: next_link })
        }
    }
    return returner
}
