import * as axios from "axios";
import NodeManager from "../managers/nodemanager";
import LocationManager from "../managers/locationmanager";
const fetch = axios.default

type method = "GET" | "POST" | "PUT" | "PATCH" | "DELETE"

export default class AdminInstance {

    private api_key: string
    private headers: { [key: string]: string }

    url: string

    /* Managers */
    nodes: NodeManager
    locations: LocationManager

    constructor(_url : string, _api_key :string) {
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

    }
    call(endpoint : string = '', _method : method = 'GET', body = {}): any {
        return new Promise<any>(async (resolve : any, reject : any) => {
            try {
                const call = this.url + "/application/" + endpoint
                let return_data = null
                switch(_method) {
                    case 'GET':
                        return_data = (await fetch.get(call,{headers: this.headers}).catch(err => {throw new Error(err)})).data
                        break;
                    case 'POST':
                        return_data = (await fetch.post(call, body, {headers: this.headers}).catch(err => {throw new Error(err)})).data
                        break;
                    case 'PATCH':
                        return_data = (await fetch.patch(call, body, {headers: this.headers}).catch(err => {throw new Error(err)})).data
                        break;
                    case 'PUT':
                        return_data = (await fetch.put(call, body, {headers: this.headers}).catch(err => {throw new Error(err)})).data
                        break;
                    case 'DELETE':
                        return_data = (await fetch.delete(call, {headers: this.headers}).catch(err => {throw new Error(err)})).data
                        break;
                }
                resolve(return_data)
            } catch (err) {
                reject(err)
            }
        });
    }
}

//from pterodactyl.js - modified
function format_url(url_: string): string {
    let url;
    if (/(?!127\.0{1,3}\.0{1,3}\.0{0,2}$)((25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)/g.test(url_)) {
        if (/^http(s|):\/\//g.test(url_)) {
            url = url_;
        }
        else {
            url = `https://${url_}`;
        }
    }
    else {
        if (/^http(s|):\/\//g.test(url_)) {
            url = url_;
        }
        else {
            url = `https://${url_}`;
        }
    }
    if (/\/$/g.test(url)) {
        return url + 'api';
    }
    else {
        return url + '/api';
    }
}