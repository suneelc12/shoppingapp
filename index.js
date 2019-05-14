// JavaScript source code
var express = require("express");
const app = express();
const MongoClient = require('mongodb').MongoClient;
var ObjectId = require('mongodb').ObjectID;
const bodyParser = require('body-parser');
const db_url = "mongodb://localhost:27017/botdb";

app.use(bodyParser.urlencoded({ extended: true }));



app.get('/',(req,res)=>{
    res.sendFile(__dirname,'/index.html');
})
app.get('/details', (req, res) => {
    MongoClient.connect(db_url, { useNewUrlParser: true }, function (err, db) {
        if (err) throw err;
        var dbo = db.db("botdb");
        console.log("connected");
        dbo.collection("products").find().toArray((err, result) => {
            if (err)
                console.log(err);
            else
                res.json(result);
        });
    });
})
app.post('/details/add', (req, res) => {

    var details = {
        id: req.body.id,
        contact: req.body.contact
    };
    MongoClient.connect(db_url, { useNewUrlParser: true }, function (err, db) {
        if (err) throw err;
        var dbo = db.db("botdb");
        console.log("connected");
        dbo.collection("products").insertOne(details, (err, result) => {
            if (err)
                console.log(err);
            else
                res.json(result);
        });
    });
})
app.delete('/details/:id', (req, res) => {
    let id = ObjectId(req.params.id) || ObjectId(req.body.id);
    MongoClient.connect(db_url, { useNewUrlParser: true }, function (err, db) {
        if (err) throw err;
        var dbo = db.db("botdb");
        console.log("connected");
        dbo.collection("products").deleteOne({ "_id": id }, (err, result) => {
            if (err)
                console.log(err);
            else
                res.json(result);
        });
    });
})

app.listen(8000,function(req,res){
console.log("listening");
});