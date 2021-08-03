import Client from "./client"
const client = new Client("https://panel.discordbothosting.com/", "dFzy1VyYo8aE6lplE3mZ5exe9I9xtU1iDKdqg0Phkjhb9oVl", "ADMIN");
(async () => {
    console.log(await client.nodes.list(true))
})();