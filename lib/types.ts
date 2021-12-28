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
        value: any
    }[]
}

export type callOptions = {
    endpoint?: string
    parameters?: requestParameters
    method?: method
    body?: any
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

export type createLocationParams = {
    short: string
    long: string | null
}

export type updateLocationParams = {
    short: string
    long: string | null
}

export type updateServerDetailsParams = {
    name: string
    user: number
    external_id?: string
    description?: string
}

export type updateServerBuildParams = {
    allocation: number
    memory: number
    swap: number
    io: number
    cpu: number
    disk: number
    threads: number | null
    feature_limits: {
        databases: number
        backups: number
        allocations?: number
    }
}

export type updateServerStartupParams = {
    startup: string
    environment: {
        [key: string]: any
    }
    egg: number
    image: string
    skip_scripts: boolean
}

export type createServerParams = {
    name: string
    user: number
    egg: number
    docker_image: string
    startup: string
    environment: {
        [key: string]: any
    }
    limits: {
        memory: number
        swap: number
        io: number
        cpu: number
        disk: number
    }
    feature_limits: {
        databases: number
        backups: number
    }
    allocation: {
        default: number
    }
}

export type createApplicationDatabaseParams = {
    database: string
    remote: string
    host: string
}

export type websocketCredentials = {
    token: string
    socket: string
}

export type resourceUsage = {
    current_state: string
    is_suspended: boolean
    resources: {
        memory_bytes: number
        cpu_absolute: number
        disk_bytes: number
        netword_rx_bytes: number
        network_tx_bytes: number
    }
}

export type powerAction = "start" | "stop" | "restart" | "kill"

export type createClientDatabaseParams = {
    database: string
    remote: string
}
