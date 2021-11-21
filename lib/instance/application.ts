import Instance from "./instance"

export default class ApplicationInstance extends Instance {
    constructor(url: string | undefined, api_key: string | undefined) {
        super(url, api_key, "application")
    }
}
