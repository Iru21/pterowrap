# PteroWrap

Wiki listing all the functions and managers **[ WIP ]**

## Basic Usage

```javascript
const { AdminInstance } = require('pterowrap');

const url = "https://pterodactyl.app/api/" //process.env.API_URL -- use this
const key = "meowmeowmeow" //process.env.API_KEY -- use this

const client = new AdminInstance(url, key);
(async () => {
    const server = await client.servers.get(5)
    console.log(server.name)
})();
```

## Page Prefix

>[prefix] Page name

- `A` - Admin Instance
- `S` - Server Manager
