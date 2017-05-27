let express = require('express');
let bodyParser = require('body-parser');
let request = require('request');
let app = express();

app.use(express.static("public"));
app.set("view engine", "ejs");

require('dotenv').config({ path: 'variables.env' });

app.get('/', (req, res) => {
  res.render('search');
});

let key = process.env.PUBKEY;
let hash = process.env.HASH;

app.get('/results', (req, res) => {
  let query = req.query.search;
  let url = 'https://gateway.marvel.com/v1/public/characters?nameStartsWith='+query+'&limit=10&apikey='+key+'&ts=2&hash='+hash;

  request(url, function (error, response, body) {
    if(!error && response.statusCode == 200) {
      let data = JSON.parse(body);
      res.render('results',{data: data});
    }
  });
});


let PORT = process.env.PORT;
app.listen(PORT, function() {
  console.log(`This server is SUPERPOWERED on port ${PORT}!`);
});