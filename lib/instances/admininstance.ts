import * as axios from "axios";
import NodeManager from "../managers/nodemanager";
import LocationManager from "../managers/locationmanager";
import NestManager from "../managers/nestmanager";
import ServerManager from "../managers/servermanager";
import UserManager from "../managers/usermanager";
const fetch = axios.default

type method = "GET" | "POST" | "PUT" | "PATCH" | "DELETE"

import format_url from "../utils/formaturl"

export default class AdminInstance {

    private api_key: string
    private headers: { [key: string]: string }

    url: string

    /* Managers */
    nodes: NodeManager
    locations: LocationManager
    nests: NestManager
    servers: ServerManager
    users: UserManager

    constructor(_url : string | undefined, _api_key : string | undefined) {
        if(!_url || !_api_key) throw new Error("No API key/url provided!")
        this.url = format_url(_url)
        this.api_key = _api_key
        this.headers = {
            'Authorization': `Bearer ${this.api_key}`,
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        }

        /* Manager initialization */
        this.nodes = new NodeManager(this)
        this.locations = new LocationManager(this)
        this.nests = new NestManager(this)
        this.servers = new ServerManager(this)
        this.users = new UserManager(this)

    }
    call(endpoint : string = '', _method : method = 'GET', body = {}): any {
        return new Promise<any>(async (resolve : any, reject : any) => {
            try {
                const call = this.url + "/application/" + endpoint
                let return_data = null
                switch(_method) {
                    case 'GET':
                        return_data = (await fetch.get(call,{headers: this.headers}).catch(err => {throw err})).data
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
}