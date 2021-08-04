//This file is for library testing purposes.

import AdminInstance from "./instances/admininstance"
import ClientInstance from "./instances/clientinstance"
test()

async function test() {
    const client = new AdminInstance("https://panel.discordbothosting.com/", "dFzy1VyYo8aE6lplE3mZ5exe9I9xtU1iDKdqg0Phkjhb9oVl");

    //console.log(await client.nodes.list())

    // console.log(await client.locations.get(7))

    // const nodes = await client.nodes.list()
    // for(var i = 0; i < nodes.length; i++) {
    //     console.log(await client.nodes.listAllocations(nodes[i].id))
    // }
    
    //console.log(await client.nodes.listAllocations(14))

    
}

export default {
    AdminInstance,
    ClientInstance
}