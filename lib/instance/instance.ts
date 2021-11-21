import format_url from "../utils/formaturl"

import fetch from "axios"
import * as Types from "../types"
import formatparams from "../utils/formatparams"

export default abstract class Instance {
    private headers: { [key: string]: string }

    constructor(public url: string | undefined, private api_key: string | undefined, private instance_type: Types.instanceType) {
        if (!url) throw new Error("Url is undefined!")
        else if (!api_key) throw new Error("Api Key is undefined!")

        this.url = format_url(url)
        this.api_key = api_key

        this.headers = {
            Authorization: `Bearer ${this.api_key}`,
            "Content-Type": "application/json",
            Accept: "application/json",
        }
    }

    call(options: Types.callOptions): Promise<any> {
        const { endpoint, parameters, method, body } = this.formatOptions(options)
        const params = formatparams(parameters!)
        return new Promise<any>(async (resolve: any, reject: any) => {
            try {
                const call = this.url + `/${this.instance_type}/` + endpoint + params
                let return_data = null
                switch (method) {
                    case "GET":
                        return_data = (await fetch.get(call, { headers: this.headers })).data
                        break
                    case "POST":
                        return_data = (await fetch.post(call, body, { headers: this.headers })).data
                        break
                    case "PATCH":
                        return_data = (await fetch.patch(call, body, { headers: this.headers })).data
                        break
                    case "PUT":
                        return_data = (await fetch.put(call, body, { headers: this.headers })).data
                        break
                    case "DELETE":
                        return_data = (await fetch.delete(call, { headers: this.headers })).data
                        break
                }
                resolve(return_data)
            } catch (err: any) {
                const data = err.response.data
                console.log(data.errors.length == 1 ? data.errors[0] : data.errors)
                reject(new Error(`${data.errors[0].status} | ${data.errors[0].code} | ${data.errors[0].detail}`))
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
