import format_url from "../utils/formaturl"

import fetch from "axios"
import { method, instance_type } from "../types"

export default abstract class Instance {
    private headers: { [key: string]: string }

    constructor(public url: string | undefined, private api_key: string | undefined, private _instance_type: instance_type) {
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

    call(endpoint: string = "", _method: method = "GET", body = {}): any {
        return new Promise<any>(async (resolve: any, reject: any) => {
            try {
                const call = this.url + `/${this._instance_type}/` + endpoint
                let return_data = null
                switch (_method) {
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
}
