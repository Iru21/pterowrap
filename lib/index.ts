//This file is for library testing purposes.

import AdminInstance from "./instances/admininstance"
import ClientInstance from "./instances/clientinstance"
test()

async function test() {
    const client = new AdminInstance("https://panel.discordbothosting.com/", "dFzy1VyYo8aE6lplE3mZ5exe9I9xtU1iDKdqg0Phkjhb9oVl");
    console.log(await client.nodes.list(true))
}

export default {
    AdminInstance,
    ClientInstance
}