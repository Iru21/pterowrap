export type method = "GET" | "POST" | "PUT" | "PATCH" | "DELETE"

export type instanceType = "application" | "client"

export type requestParameters = {
    include?: string[] | string
    filters?: {
        key: string
        value: string | number | boolean
    }[]
    sort?: {
        by: string
        reverse?: boolean
    }
    other?: {
        key: string
        value: string | number | boolean
    }[]
}

export type callOptions = {
    endpoint?: string
    parameters?: requestParameters
    method?: method
    body?: object
}
