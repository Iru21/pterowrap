# Node Manager - (instance).nodes

## List()

    Lists are present nodes

## get(id)

    Returns found node by provided id, else returns null

- `id` - Node ID

## create(params)

    Creates a node, then returns it

- `params`
  - `name` (String)
  - `description` (String) Nullable
  - `location_id` (Number)
  - `public` (Boolean) Nullable
  - `fqdn` (String)
  - `scheme` (`http` or `https`)
  - `behind_proxy`(Boolean) Nullable
  - `memory` (Number)
  - `memory_overallocate` (Number)
  - `disk` (Number)
  - `disk_overallocate` (Number)
  - `daemon_base` (String) Nullable
  - `daemon_listen` (Number)
  - `daemon_sftp` (Number)
  - `maintanance_mode` (Boolean) Nullable
  - `upload_size` (Number) Nullable

## edit(id, params)

    Edits a node, then returns it

- `id` - Node ID
- `params`
  - `name` (String)
  - `description` (String) Nullable
  - `location_id` (Number)
  - `public` (Boolean) Nullable
  - `fqdn` (String)
  - `scheme` (`http` or `https`)
  - `behind_proxy`(Boolean) Nullable
  - `memory` (Number)
  - `memory_overallocate` (Number)
  - `disk` (Number)
  - `disk_overallocate` (Number)
  - `daemon_base` (String) Nullable
  - `daemon_listen` (Number)
  - `daemon_sftp` (Number)
  - `maintanance_mode` (Boolean) Nullable
  - `upload_size` (Number) Nullable

## delete(id)

    Deletes a node

## listAllocations(nodeId)

    Lists all allocations for a specific node

- `id` - Node ID


## createAllocation(nodeId, params)

    Creates an allocation for a specific node

- `id` - Node ID
- `params`
  - `ip` (String)
  - `alias` (String) Nullable
  - `ports` (String Array)

## deleteAllocation(nodeId, allocationId)

    Deletes an allocation from the node

- `nodeId` - Node ID
- `allocationId` - Allocation ID