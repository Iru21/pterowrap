import { Types } from ".."
import ApplicationInstance from "../instance/ApplicationInstance"
import BaseInstance from "../instance/BaseInstance"
import ClientInstance from "../instance/ClientInstance"

export default class Util extends null {
    static addAnd(s: string): string {
        return /&$/g.test(s) ? "" : "&"
    }

    static formatParams(parameters: Types.requestParameters): string {
        let result = ""

        if (parameters.include || parameters.filters || parameters.sort || parameters.per_page || parameters.page || parameters.other) result += "?"
        if (parameters.include) {
            switch (typeof parameters.include) {
                case "string":
                    result += `include=${parameters.include}`
                    break
                case "object":
                    if (parameters.include.length > 0) {
                        result += `include=${(parameters.include as string[]).join(",")}`
                    }
                    break
            }
        }
        if (parameters.filters) {
            for (let i = 0; i < parameters.filters.length; i++) {
                const filter = parameters.filters[i]
                result += `${this.addAnd(result)}filter[${filter.key}]=${filter.value}`
            }
        }
        if (parameters.sort) result += `${this.addAnd(result)}sort=${parameters.sort.reverse ? "-" : ""}${parameters.sort.by}`
        if (parameters.per_page) result += `${this.addAnd(result)}per_page=${parameters.per_page}`
        if (parameters.page) result += `${this.addAnd(result)}page=${parameters.page}`
        if (parameters.other) {
            for (let i = 0; i < parameters.other.length; i++) result += `${this.addAnd(result)}${parameters.other[i].key}=${parameters.other[i].value}`
        }
        return result
    }

    static formatURL(url: string): string {
        let formatted
        if (/(?!127\.0{1,3}\.0{1,3}\.0{0,2}$)((25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)/g.test(url)) {
            if (/^http(s|):\/\//g.test(url)) {
                formatted = url
            } else {
                formatted = `https://${url}`
            }
        } else {
            if (/^http(s|):\/\//g.test(url)) {
                formatted = url
            } else {
                formatted = `https://${url}`
            }
        }
        if (/\/$/g.test(formatted)) formatted = formatted.slice(0, formatted.lastIndexOf("/"))
        if (!/\/(api)$/g.test(formatted)) return formatted + "/api"
        else return formatted
    }

    static async handlePagination(
        client: BaseInstance,
        endpoint: string,
        options: Types.requestParameters,
        structure: any,
        additional_params?: any
    ): Promise<any[]> {
        return new Promise(async (resolve, reject) => {
            try {
                let current_page = await client.call({ endpoint, parameters: options })
                const returner = []
                let pages = current_page.meta.pagination.total_pages
                if (options.page) {
                    pages -= options.page - 1
                }
                let attIterator = 0
                for (let i = 0; i < pages; i++) {
                    for (let j = 0; j < current_page.data.length; j++) {
                        returner[attIterator] = additional_params
                            ? new structure(client, current_page.data[j], additional_params)
                            : new structure(client, current_page.data[j])
                        attIterator++
                    }
                    let next_link = current_page.meta.pagination.links.next
                    if (next_link) {
                        next_link = next_link
                            .replace(client.url, "")
                            .replace(/\/?application\/?/, "")
                            .replace(/\/?client\/?/, "")
                            .split("?")
                        options.page = next_link[1].split("=")[1]
                        current_page = await client.call({ endpoint: next_link[0], parameters: options })
                    }
                }
                resolve(returner)
            } catch (e) {
                reject(e)
            }
        })
    }
}
