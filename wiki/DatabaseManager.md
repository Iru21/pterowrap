# Database Manager - (instance).servers.databases

## list(server)

    Lists all present databases on the specified servers

- `server` - Server ID

## get(server, id)

    Returns found database with the specified id from the server, else returns null

- `server` - Server ID
- `id` - Database ID

## create(server, params)

    Creates a new database with the specified params on the server, then returns the database object

- `server` - Server ID
- `params`
  - `database` (String)
  - `remote` (String)
  - `host` (String)

## resetPassword(server, id)

    Resets the password for the specified database

- `server` - Server ID
- `id` - Database ID

## delete(server, id)

    Deletes the specified database from the server

- `server` - Server ID
- `id` - Database ID
