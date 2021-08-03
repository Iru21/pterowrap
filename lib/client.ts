import * as axios from "axios";
import NodeManager from "./managers/nodemanager";
const fetch = axios.default

type method = "GET" | "POST" | "PUT" | "PATCH" | "DELETE"
type api = "CLIENT" | "ADMIN"

export default class Client {

    private api_key: string
    private headers: { [key: string]: string }

    api_type: api
    url: string

    /* Managers */
    public nodes: NodeManager

    constructor(_url : string, _api_key :string, _api_type : api = "CLIENT") {
        this.url = format_url(_url)
        this.api_key = _api_key
        this.api_type = _api_type
        this.headers = {
            'Authorization': `Bearer ${this.api_key}`,
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        }

        /* Manager initialization */
        this.nodes = new NodeManager(this)

    }
    call(endpoint : string = '', _method : method = 'GET', body = {}): any {
        return new Promise<any>(async (resolve : any, reject : any) => {
            try {
                const a = this.api_type == "CLIENT" ? "/client/" : "/application/"
                const call = this.url + a + endpoint
                let return_data = null
                switch(_method) {
                    case 'GET':
                        return_data = (await fetch.get(call, {headers: this.headers})).data
                        break;
                    case 'POST':
                        return_data = (await fetch.post(call, body, {headers: this.headers})).data
                        break;
                    case 'PATCH':
                        return_data = (await fetch.patch(call, body, {headers: this.headers})).data
                        break;
                    case 'PUT':
                        return_data = (await fetch.put(call, body, {headers: this.headers})).data
                        break;
                    case 'DELETE':
                        return_data = (await fetch.delete(call, {headers: this.headers})).data
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