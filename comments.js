// Create web server
const express = require('express');
const app = express();
// Import comments.json
const comments = require('./comments.json');
// Import body-parser
const bodyParser = require('body-parser');
// Use body-parser
app.use(bodyParser.json());
// Create route
app.get('/comments', (req, res) => {
  res.json(comments);
});
// Create route
app.post('/comments', (req, res) => {
  if (req.body.email && req.body.comment) {
    comments.push({
      email: req.body.email,
      comment: req.body.comment
    });
    res.status(201).send('Comment added');
  } else {
    res.status(400).send('You need to input an email and a comment');
  }
});
// Create route
app.get('/comments/:id', (req, res) => {
  if (comments[req.params.id]) {
    res.json(comments[req.params.id]);
  } else {
    res.status(404).send('Comment not found');
  }
});
// Create route
app.put('/comments/:id', (req, res) => {
  if (comments[req.params.id]) {
    if (req.body.email && req.body.comment) {
      comments[req.params.id] = {
        email: req.body.email,
        comment: req.body.comment
      };
      res.status(200).send('Comment updated');
    } else {
      res.status(400).send('You need to input an email and a comment');
    }
  } else {
    res.status(404).send('Comment not found');
  }
});
// Create route
app.delete('/comments/:id', (req, res) => {
  if (comments[req.params.id]) {
    comments.splice(req.params.id, 1);
    res.status(204).send();
  } else {
    res.status(404).send('Comment not found');
  }
});
// Listen on port 3000
app.listen(3000, () => {
  console.log('Server is up and running on port 3000');
});