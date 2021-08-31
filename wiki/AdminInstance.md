# Admin Instance

Admin Instance functions and managers

## API managers

---

### [Node Manager](https://github.com/Iru21/pterowrap/wiki/%5BA%5D-Node-Manager)

### [Location Manager](https://github.com/Iru21/pterowrap/wiki/%5BA%5D-Location-Manager)

### [Nest Manager](https://github.com/Iru21/pterowrap/wiki/%5BA%5D-Nest-Manager)

## API functions

---

### call(endpoint, method, body)

    Internal function to call the API. Generally don't use it unless you know what you are doing

- `endpoint` - The endpoint of the api to call after `/application/`. Default: ' '
- `method` - The method to use on the request. Available methods:
  - `GET` (Default)
  - `POST`
  - `PATCH`
  - `PUT`
  - `DELETE`
- `body` - The request body. Default: `{}`