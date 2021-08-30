//This file is for library testing purposes.

require("dotenv").config()

import AdminInstance from "./instances/admininstance"
import ClientInstance from "./instances/clientinstance"
test()

async function test() {
    
    const url = process.env.API_URL
    const key = process.env.API_KEY
    const client = new AdminInstance(url, key);

    console.log(await client.nodes.list())

    // console.log(await client.locations.get(7))

    // const nodes = await client.nodes.list()
    // for(var i = 0; i < nodes.length; i++) {
    //     console.log(await client.nodes.listAllocations(nodes[i].id))
    // }
    
    //console.log(await client.nodes.listAllocations(14))

    //console.log(await client.nests.list())

    //console.log(await client.nests.get(7))

    //console.log(await client.nests.listEggs(5))

    //console.log(await client.nests.getEgg(5, 28))

    //console.log(await client.call("nests/5/eggs/28"))

    //console.log((await client.call("servers")).data[0])

    //console.log(await client.servers.list())

    //console.log(await client.servers.get(154))

}

export default {
    AdminInstance,
    ClientInstance
}