const express = require('express');
const bodyParser = require('body-parser')
const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')

const adapter = new FileSync('.synthesis.json')
const db = low(adapter)

db.defaults({ signups: [] }).write()

const PORT = process.env.PORT || 3000;

const app = express();
app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(express.static(__dirname + '/public'));

app.get('/', function (req, res) {
    res.sendfile('./public/index.html');
});

app.post('/', function (req, res) {
    const isAjaxRequest = req.xhr;
    console.log(`Signup received : ${req.body.name} ${req.body.email}`)
    db.get('signups')
      .push({
        name: req.body.name,
        email: req.body.email
      })
      .write()

    if(isAjaxRequest){
        res.status(200).send()
    }else{
        res.redirect('/');
    }
});

app.listen(PORT, function (err) {
    if (err) {
        console.log(err);
    } else {
        console.log(`Listening on port on ${PORT}`);
    }
});