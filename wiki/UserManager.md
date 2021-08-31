# UserManager - (instance).users

## list()

    Lists all present users

## get(id)

    Returns found user by provided id, else returns null

- `id`  - User ID

## getByExternalId(id)

    Returns found user by provided external id, else returns null

- `id`  - User External ID

## create(params)

    Creates a new user from provided parameters

- `params`
  - `external_id` (String) Nullable
  - `username` (String)
  - `email` (String)
  - `first_name` (String)
  - `last_name` (String)
  - `password` (String) Nullable
  - `root_admin` (Boolean) Nullable
  - `language` (String) Nullable

## edit(id, params)

    Edit the user specified by the id with provided parameters

- `id` - User ID
- `params`
  - `external_id` (String) Nullable
  - `username` (String)
  - `email` (String)
  - `first_name` (String)
  - `last_name` (String)
  - `password` (String) Nullable
  - `root_admin` (Boolean) Nullable
  - `language` (String) Nullable

## delete(id)

    Deletes the user account associated with the specified id
