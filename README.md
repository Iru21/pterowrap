# PteroWrap v1.0.21

[![npm version](https://badge.fury.io/js/pterowrap.svg)](https://badge.fury.io/js/pterowrap)

A node.js wrapper for Pterodactyl API

## Installation

```sh
npm install pterowrap
```

## Usage

```javascript
const { AdminInstance } = require('pterowrap');

const url = "https://pterodactyl.app/api/"
const key = "meowmeowmeow"

const client = new AdminInstance(url, key);
(async () => {
    const server = await client.servers.get(5)
    console.log(server.name)
})();
```

## Documentation

### [Click Here](https://github.com/Iru21/pterowrap/wiki)
