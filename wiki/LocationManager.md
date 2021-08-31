# Location Manager - (instance).locations

## list()

    Lists all present locations

## get(id)

    Returns found location by provided id, else returns null

- `id` - Location ID

## create(shortName, longName)

    Creates a location

- `shortName` (String)
- `longName` (String) - Will be automatically replaced with shortName if null

## edit(id, shortName, longName)

    Edit the location by provided id

- `id` - Location ID
- `shortName` (String)
- `longName` (String) - Will be automatically replaced with shortName if null

## delete(id)

    Deletes the location
