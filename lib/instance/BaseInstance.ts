import fetch from "axios"
import * as Types from "../utils/Types"
import Util from "../utils/Util"

export default abstract class BaseInstance {
    private headers: { [key: string]: string }

    constructor(public url: string | undefined, private api_key: string | undefined, private instance_type: Types.instanceType) {
        if (!url) throw new Error("Url is undefined!")
        else if (!api_key) throw new Error("Api Key is undefined!")

        this.url = Util.formatURL(url)
        this.api_key = api_key

        this.headers = {
            Authorization: `Bearer ${this.api_key}`,
            "Content-Type": "application/json",
            Accept: "application/json",
        }
    }

    call(options: Types.callOptions): Promise<any> {
        const { endpoint, parameters, method, body } = this.formatOptions(options)
        const params = Util.formatParams(parameters!)
        return new Promise<any>(async (resolve: any, reject: any) => {
            try {
                const call = this.url + `/${this.instance_type}/` + endpoint + params
                let return_data = null
                // I hate javascript and the fact that this works
                const m = method?.toLowerCase()
                const f = fetch[m as "get" | "post" | "put" | "patch" | "delete"]
                if (m === "get" || m === "delete") return_data = (await f(call, { headers: this.headers })).data
                else return_data = (await f(call, body, { headers: this.headers })).data
                resolve(return_data)
            } catch (err: any) {
                reject(err.response.data.errors)
            }
        })
    }

    private formatOptions(options: Types.callOptions): Types.callOptions {
        let { endpoint, parameters, method, body } = options
        if (!endpoint) endpoint = "/"
        if (!parameters) parameters = {}
        if (!method) method = "GET"
        if (!body) body = {}

        return { endpoint, parameters, method, body }
    }
}
