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
    per_page?: number
    page?: number
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

export type createUserParams = {
    email: string
    username: string
    first_name: string
    last_name: string
}

export type updateUserParams = {
    email: string
    username: string
    first_name: string
    last_name: string
    language: string
    password: string
}

export type createNodeParams = {
    name: string
    location_id: number
    fqdn: string
    scheme: "http" | "https"
    memory: number
    memory_overallocate: number
    disk: number
    disk_overallocate: number
    upload_size: number
    daemon_sftp: number
    daemon_listen: number
}

export type updateNodeParams = {
    name: string
    description: string
    location_id: number
    fqdn: string
    scheme: "http" | "https"
    behind_proxy: boolean
    maintenance_mode: boolean
    memory: number
    memory_overallocate: number
    disk: number
    disk_overallocate: number
    upload_size: number
    daemon_sftp: number
    daemon_listen: number
}

export type createAllocationParams = {
    ip: string
    ports: number[] | string[]
}
