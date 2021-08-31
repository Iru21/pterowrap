export type UserParams = {
    external_id?: string
    username: string
    email: string
    first_name: string
    last_name: string
    password?: string
    root_admin?: boolean
    language?: string
}

export type ServerParams = {
    external_id?: string
    name: string
    user: number
    description?: string
    egg: number
    pack?: number
    docker_image?: string
    startup: string
    limits: [
        memory: number,
        swap: number,
        disk: number,
        io: number,
        cpu: number
    ]
    feature_limits: [
        databases: number,
        allocations: number,
        backups: number
    ]
    environment: any[]
    allocation?: {
        default: number,
        additional?: number[]
    }
    deploy?: [
        locations: number[],
        dedicated_ip: boolean,
        port_range: string[],
    ]
    start_on_completion?: boolean
    skip_scripts?: boolean
    oom_disabled?: boolean
}

export type NodeParams = {
    name: string
    description?: string
    location_id: number
    public?: boolean
    fqdn: string
    scheme: 'http' | 'https'
    behind_proxy?: string
    memory: number
    memory_overallocate: number
    disk: number
    disk_overallocate: number
    daemon_base?: string
    daemon_listen: number
    daemon_sftp: number
    maintenance_mode?: boolean
    upload_size?: number
}

export type AllocationParams = {
    ip: string
    alias?: string
    ports: string[]
}

export type ServerBuildParams = {
    allocation: number
    oom_disabled?: boolean
    limits?: [
        memory?: number,
        swap?: number,
        disk?: number,
        io?: number,
        cpu?: number
    ]
    add_allocations?: number[]
    remove_allocations?: number[]
    feature_limits: [
        databases: number | null,
        allocations?: number | null
    ]
}

export type DatabaseParams = {
    database: string //name
    remote: string
    host: string
}

export type PowerAction = 'start' | 'stop' | 'restart' | 'kill'