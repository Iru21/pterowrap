import Instance from "./instance"

export default class ApplicationInstance extends Instance {
    constructor(url: string, api_key: string) {
        super(url, api_key, "application")
    }
}
