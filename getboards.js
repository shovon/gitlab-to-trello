const Trello = require('node-trello');

const commandArguments = process.argv.slice(2);

if (commandArguments < 2) {
  console.error('Expecting an API key and an access token');
  process.exit(1);
}

const apiKey = commandArguments[0];
const accessToken = commandArguments[1];

const t = new Trello(apiKey, accessToken);

Promise.resolve(undefined)
  .then(() => {
    return new Promise((resolve, reject) => {
      t.get('/1/members/me', (err, data) => {
        if (err) {
          reject(err);
        } else {
          resolve(data);
        }
      })
    })
  }, (err) => { console.error(err); })
  .then((data) => {
    const promiseBoards = data.idBoards.map(boardId => {
      return new Promise((resolve, reject) => {
        t.get(`/1/boards/${boardId}`, (err, data) => {
          if (err) {
            reject(err);
          } else {
            resolve(data);
          }
        });
      });
    });
    const boardsPromise = Promise.all(promiseBoards);
    return boardsPromise;
  }, (err) => { console.error(err); })
  .then((boards) => {
    boards.forEach(board => console.log(board.id, board.name));
  });
