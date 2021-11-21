import Instance from "./instance"

export default class ClientInstance extends Instance {
    constructor(url: string | undefined, api_key: string | undefined) {
        super(url, api_key, "client")
    }
}
