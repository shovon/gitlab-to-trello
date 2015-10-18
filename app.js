const express = require('express');
const Trello = require('node-trello');
const bodyParser = require('body-parser');

const apiKey = process.env.TRELLO_API_KEY;
const accessToken = process.env.TRELLO_API_ACCESS_TOKEN;
const listId = process.env.TRELLO_API_LIST_ID;

const trello = new Trello(apiKey, accessToken);

const app = express();

app.use((req, res, next) => {
  if (req.header('X-Gitlab-Event') !== 'Issue Hook') {
    res.status(400).json({ errors: [{ title: 'Hook not allowed' }] });
    return;
  }
  next();
});

app.use(bodyParser.json());

app.post('/hook', function (req, res, next) {
  const objectAttributes = req.body.object_attributes;

  if (
    !objectAttributes ||
    !objectAttributes.title ||
    !objectAttributes.url ||
    !objectAttributes.created_at ||
    !objectAttributes.updated_at
  ) {
    res.status(400).json({errors: [{title: 'Not a valid hook payload'}]});
    return;
  }

  if (objectAttributes.created_at !== objectAttributes.updated_at) {
    res.json({});
    return;
  }

  const params = {
    name: objectAttributes.title,
    due: null,
    idList: listId,
    urlSource: null,
    desc: objectAttributes.url
  };
  trello.post('/1/card', params, (err, data) => {
    if (err) {
      res.status(500).json({ errors: [{ title: 'An error occurred' }] });
      return;
    }
    res.json({});
  });
});

app.use(function (req, res) {
  res.status(404).json({ errors: [{title: 'Not found'}]});
});

app.listen(process.env.PORT || 3000, function () {
  console.log(this.address());
});
