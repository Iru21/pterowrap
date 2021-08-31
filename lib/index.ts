//This file is for library testing purposes.

require("dotenv").config()

import AdminInstance from "./instances/admininstance"
import ClientInstance from "./instances/clientinstance"
import { UserParams, AllocationParams, NodeParams, ServerParams, ServerBuildParams } from './arguments'
test()

async function test() {
    
    const url = process.env.API_URL
    const key = process.env.API_KEY
    const client = new AdminInstance(url, key);

    try {
        //console.log(client)

        //console.log(await client.nodes.list())

        // console.log(await client.locations.get(7))

        // const nodes = await client.nodes.list()
        // for(var i = 0; i < nodes.length; i++) {
        //     console.log(await client.nodes.listAllocations(nodes[i].id))
        // }
        
        //console.log(await client.nodes.listAllocations(14))

        //console.log(await client.nests.list())

        //console.log(await client.nests.get(999))

        //console.log(await client.nests.listEggs(5))

        //console.log(await client.nests.getEgg(5, 28))

        //console.log(await client.call("nests/5/eggs/28"))

        //console.log((await client.call("servers")).data[0])

        //console.log(await client.servers.list())

        //console.log(await client.servers.get(154))

        //console.log(await client.users.list())

        //console.log(await client.users.get(7))

        //console.log(await client.users.getByExternalId('288680166421692416'))

        // const params1: UserParams = {
        //     username: 'test',
        //     email: 'test@example.com',
        //     first_name: "John",
        //     last_name: "Smith"
        // }
        // const newUser = await client.users.create(params1)
        // console.log(newUser)

        // const params2: UserParams = {
        //     username: 'test-edited',
        //     email: 'test1@example.com',
        //     first_name: "John Hello",
        //     last_name: "Smith"
        // }

        // setTimeout(async () => {
        //     const edited = await client.users.edit(newUser.id, params2)
        //     console.log(edited)
        //     setTimeout(() => client.users.delete(newUser.id), 1000)
        // }, 1000)

        //console.log(await client.users.get(3453453))

    } catch (e) {
        console.error(e)
    }

}

export default {
    AdminInstance,
    ClientInstance,
}

export {
    UserParams,
    AllocationParams,
    NodeParams,
    ServerParams,
    ServerBuildParams
}