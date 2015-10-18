const Trello = require('node-trello');

const commandArguments = process.argv.slice(2);

if (commandArguments < 2) {
  console.error('Expecting an API key, an access token, and a board ID');
  process.exit(1);
}

const apiKey = commandArguments[0];
const accessToken = commandArguments[1];
const boardId = commandArguments[2];

const t = new Trello(apiKey, accessToken);

Promise.resolve(undefined)
  .then((data) => {
    return new Promise((resolve, reject) => {
      t.get(`/1/boards/${boardId}/lists`, (err, data) => {
        if (err) {
          reject(err);
        } else {
          resolve(data);
        }
      });
    });
  }, (err) => { console.error(err); })
  .then(lists => {
    lists.forEach(list => {
      console.log(list.id, list.name);
    });
  });
