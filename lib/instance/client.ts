import Instance from "./instance"

export default class ClientInstance extends Instance {
    constructor(url: string, api_key: string) {
        super(url, api_key, "client")
    }
}
