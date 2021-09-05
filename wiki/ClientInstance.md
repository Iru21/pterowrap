# Client Instance

Client Instance functions

## API

---

### listServers()

    Lists user's servers

### getServerInformation(id)

    Returns incomplete server information

- `id` - Server ID

### getServerResources(id)

    Returns resource usage such as disk and memory usage

- `id` - Server ID

### sendConsoleCommand(id, command)

    Sends a console command to the server

- `id` - Server ID

- `command` - The command to be executed

### sendPowerAction(id, action)

    Send a power action to the server

- `id` - Server ID

- `action` - The action to be executed on the server. Available actions:

  - `start`

  - `stop`

  - `restart`

  - `kill`

### call(endpoint, method, body)

    Internal function to call the api. Generally don't use it unless you know what you are doing

- `endpoint` - The endpoint of the api to call after `/client/`. Default: ' '
- `method` - The method to use on the request. Available methods:
  - `GET` (Default)
  - `POST`
  - `PATCH`
  - `PUT`
  - `DELETE`
- `body` - The request body. Default: `{}`
