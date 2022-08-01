# PteroWrap v1.1.1

[![npm version](https://badge.fury.io/js/pterowrap.svg)](https://badge.fury.io/js/pterowrap)

Wiki listing all the functions and managers **[ WIP ]**

## Basic Usage

```javascript
const { ApplicationInstance } = require("pterowrap")

const url = "https://pterodactyl.app/api/"
const key = "meowmeowmeow"

const client = new ApplicationInstance(url, key)
const server = await client.servers.get(5)
console.log(server.name)
```

```javascript
const { ClientInstance } = require("pterowrap")

const url = "https://pterodactyl.app/api/"
const key = "meowmeowmeow"

const client = new ClientInstance(url, key)
const account = await client.account.retrieveDetails()
console.log(account.username)
```
