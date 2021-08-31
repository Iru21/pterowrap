# Server Manager  - (instance).servers

## API Managers

### [Database Manager](https://github.com/Iru21/pterowrap/wiki/%5BA,-S%5D-Database-Manager)

---

## API Functions

### List()

    Returns all present servers

### get(id)

    Returns found server by provided id, else returns null

- `id` - Server ID

### getByExternalId(id)

    Returns found server by provided external id, else returns null

- `id` - Server External ID

### create(params)

    Creates a new server from provided parameters, then returns it

- `params`
  - `external_id` (String) Nullable
  - `name` (String)
  - `user` (Number)
  - `description` (String) Nullable
  - `egg` (Number)
  - `pack` (Number) Nullable
  - `docker_image` (String) Nullable
  - `startup` (String)
  - `limits` (Number Array)
    - `memory` (Number)
    - `swap` (Number)
    - `disk` (Number)
    - `io` (Number)
    - `cpu` (Number)
  - `feature_limits` (Number Array)
    - `databases` (Number)
    - `allocations` (Number)
    - `backups` (Number)
  - `environment` (Object)
  - `allocation` (Object) Nullable
    - `default` (Number)
    - `additional` (Number Array) Nullable
  - `deploy` (Array) Nullable
    - `loactions` (Number Array)
    - `dedicated_ip` (Boolean)
    - `port_range` (String Array)
  - `start_on_completion` (Boolean) Nullable
  - `skip_scripts` (Boolean) Nullable
  - `oom_disabled` (Boolean) Nullable

### updateExternalID(id, external_id)

    Updates server's external_id, then returns the server object

- `id` - Server ID
- `external_id` - New Server External ID

### updateName(id, name)

    Updates server's name, then returns the server object

- `id` - Server ID
- `name` - New Server Name

### updateUser(id, user)

    Updates server's owner, then returns the server object

- `id` - Server ID
- `user` - New Server Owner id

### updateDescription(id, description)

    Updates server's description, then returns the server object

- `id` - Server ID
- `description` - New Server Description

### updateStartup(id, startup)

    Updates server's startup command, then returns the server object

- `id` - Server ID
- `startup` - New Server Startup Command

### updateEnvironment(id, environment)

    Updates server's environment, then returns the server object

- `id` - Server ID
- `environment` - New Server Environment Object

### updateEgg(id, egg)

    Updates server's egg, then returns the server object

- `id` - Server ID
- `egg` - New Server Egg ID

### updatePack(id, pack)

    Updates server's pack, then returns the server object

- `id` - Server ID
- `pack` - New Server Pack ID

### updateImage(id, image)

    Updates server's image, then returns the server object

- `id` - Server ID
- `image` - New Server Image

### updateScripts(id, skip_scripts)

    Sets if server's scripts should be skipped, then returns the server object

- `id` - Server ID
- `skip_skripts` - true / false

### updateBuildConfiguration(id, params)

    Updates server's build configuration, then returns the server object

- `id` - Server ID
- `params`
  - `allocation` (Number)
  - `oom_disabled` (Boolean) Nullable
  - `limits` (Number Array) Nullable
    - `memory` (Number) Nullable
    - `swap` (Number) Nullable
    - `disk` (Number) Nullable
    - `io` (Number) Nullable
    - `cpu` (Number) Nullable
  - `add_alocations` (Number Array) Nullable
  - `remove_allocations` (Number Array) Nullable
  - `feature_limits` (Number Array)
    - `databases` (Number) Nullable
    - `allocations` (Number) Nullable

### suspend(id)

    Suspends the server with the specified id

- `id` - Server ID

### unsuspend(id)

    Unsuspends the server with the specified id

- `id` - Server ID

### reinstall(id)

    Reinstalls the server with the specified id

- `id` - Server ID

### rebuild(id)

    Rebuilds the server with the specified id

- `id` - Server ID

### delete(id, force)

    Deletes the server with the specified id

- `id` - Server ID
- `force` - Whether to force the server deletion
