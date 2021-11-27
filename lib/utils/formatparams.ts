import { Types } from ".."

export default function formatParams(parameters: Types.requestParameters): string {
    let result = ""

    if (parameters.include || parameters.filters || parameters.sort || parameters.per_page || parameters.page || parameters.other) result += "?"
    if (parameters.include) {
        switch (typeof parameters.include) {
            case "string":
                result += `include=${parameters.include}`
            case "object":
                if (parameters.include.length > 0) {
                    result += `include=${(parameters.include as string[]).join(",")}`
                }
        }
    }
    if (parameters.filters) {
        for (let i = 0; i < parameters.filters.length; i++) {
            const filter = parameters.filters[i]
            result += `${addAnd(result)}filter[${filter.key}]=${filter.value}`
        }
    }
    if (parameters.sort) result += `${addAnd(result)}sort=${parameters.sort.reverse ? "-" : ""}${parameters.sort.by}`
    if (parameters.per_page) result += `${addAnd(result)}per_page=${parameters.per_page}`
    if (parameters.page) result += `${addAnd(result)}page=${parameters.page}`
    if (parameters.other) {
        for (let i = 0; i < parameters.other.length; i++) result += `${addAnd(result)}${parameters.other[i].key}=${parameters.other[i].value}`
    }
    return result
}

function addAnd(s: string): string {
    return /&$/g.test(s) ? "" : "&"
}
