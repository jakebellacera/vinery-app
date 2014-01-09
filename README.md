# Vinery

## What is this?

This is a basic app that fetches vines by tag name. Vine doesn't have any offical documentation for their API, [but it is available](https://github.com/starlock/vino/wiki/API-Reference).

## Getting up and running

Clone the project and then `cd` into it. Once you're inside, create a file named .env and add environment variables for:

* `PORT` - the port the webserver should bind to (e.g. 3000).
* `RACK_ENV` - the Rack environment you'd like to set (e.g. development).
* `VINE_USERNAME` - the vine username to be used for the Vine API.
* `VINE_PASSWORD` - the vine password to be used for the Vine API.

After your environment variables have been set up, run these commands:

```
bundle install
foreman start
```

Then navigate your browser to http://localhost:port.
