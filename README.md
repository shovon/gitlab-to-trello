# GitLab to Trello

> Create Trello cards the moment a GitLab issue is created.

## Getting Started

- acquire your Trello API key
- retrieve an access token from:

```
https://trello.com/1/connect?key=<YOUR_KEY>&name=<AN_EASILY_IDENTIFIABLE_NAME>&expiration=never&response_type=token&scope=read,write
```

Be sure to replace `<YOUR_KEY>` with your API key, and `<AN_EASILY_IDENTIFIABLE_NAME>` with a name that you can easily identify.

- get your board's ID, by running `node getboards <YOUR_KEY> <ACCESS_TOKEN>`
- get your list's ID, by running `node getlists <YOUR_KEY> <ACCESS_TOKEN> <LIST_ID>`
- spin up an `app` instance by running `node app`. Be sure that you have the following environment variables set

```
TRELLO_API_KEY
TRELLO_API_ACCESS_TOKEN
TRELLO_API_LIST_ID
```
