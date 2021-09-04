import * as axios from "axios";
const fetch = axios.default

type method = "GET" | "POST" | "PUT" | "PATCH" | "DELETE"

import Server from "../types/server"
import Statistics from "../types/statistics"
import ClientServer from "../types/clientserver"

import format_url from "../utils/formaturl"

import { PowerAction } from "../arguments"
export default class ClientInstance {

    private api_key: string
    private headers: { [key: string]: string }

    url: string

    constructor(_url : string | undefined, _api_key : string | undefined) {
        if(!_url || !_api_key) throw new Error("No API key/url provided!")
        this.url = format_url(_url)
        this.api_key = _api_key
        this.headers = {
            'Authorization': `Bearer ${this.api_key}`,
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        }


    }
    call(endpoint : string = '', _method : method = 'GET', body = {}): any {
        return new Promise<any>(async (resolve : any, reject : any) => {
            try {
                const call = this.url + "/client/" + endpoint
                let return_data = null
                switch(_method) {
                    case 'GET':
                        return_data = (await fetch.get(call, {headers: this.headers}).catch(err => {throw err})).data
                        break;
                    case 'POST':
                        return_data = (await fetch.post(call, body, {headers: this.headers}).catch(err => {throw err})).data
                        break;
                    case 'PATCH':
                        return_data = (await fetch.patch(call, body, {headers: this.headers}).catch(err => {throw err})).data
                        break;
                    case 'PUT':
                        return_data = (await fetch.put(call, body, {headers: this.headers}).catch(err => {throw err})).data
                        break;
                    case 'DELETE':
                        return_data = (await fetch.delete(call, {headers: this.headers}).catch(err => {throw err})).data
                        break;
                }
                resolve(return_data)
            } catch (err : any) {
                const data = err.response.data
                console.log(data.errors.length == 1 ? data.errors[0] : data.errors)
                reject(new Error(`${data.errors[0].status} | ${data.errors[0].code} | ${data.errors[0].detail}`))
            }
        });
    }

    async listServers(): Promise<Server[]> {
        let current_page = (await this.call())
        let returner = []
        const pages = current_page.meta.pagination.total_pages
        let attIterator = 0
        for (let i = 0; i < pages; i++) {
            for(let j = 0; j < current_page.data.length; j++) {
                returner[attIterator] = new Server(current_page.data[j].attributes)
                attIterator++
            }
            let next_link = current_page.meta.pagination.links.next
            if(next_link) {
                next_link = next_link.replace(this.url, "")
                current_page = (await this.call())
            }
        }
        return returner
    }

    async getServerInformation(id: number): Promise<ClientServer | null> {
        try {
            return new ClientServer((await this.call('servers/' + id)).attributes)
        } catch { return null }
    }

    async getServerResources(id: number): Promise<Statistics | null> {
        try {
            return new Statistics((await this.call(`servers/${id}/utilization`)).attributes)
        } catch { return null }
    }

    sendConsoleCommand(id: number, command: string) {
        this.call(`servers/${id}/command`, 'POST', {command: command})
    }

    sendPowerAction(id: number, action: PowerAction) {
        this.call(`servers/${id}/power`, 'POST', {signal: action})
    }
}