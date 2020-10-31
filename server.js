const express = require('express');
const cors = require('cors');
const app = express();
const port = 3000;
const mongoDBClient = require('mongodb').MongoClient;
const mongoose = require("mongoose")
const bodyParser = require('body-parser');
const myBudgetModel = require("./models/budgets_schema")
let url = 'mongodb://localhost:27017/data_'; 
app.use(bodyParser.json());
app.use('/', express.static('public'));


app.use(cors());

app.get('/budget',(req, res) => {
    mongoose.connect(url, {useNewUrlParser: true, useUnifiedTopology: true})
    .then(()=>{
        console.log("connected to database")
        myBudgetModel.find({})
            .then((data)=>{
                res.json(data);
                mongoose.connection.close()
            })
            .catch((connectionError)=>{
                console.log(connectionError)
            })
    })
    .catch((connectionError) => {
        console.log(connectionError)
    })
});


app.post('/addBudget', (req, res) => {
    mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true})
        .then(() =>{
            var myItem = new myBudgetModel({
                title: req.body.title,
                budget:req.body.budget,
                color: req.body.color
            });
            myBudgetModel.insertMany(myItem)
            .then ((data) => {
                res.json(data);
                mongoose.connection.close();
            })
            .catch((connectionError) => {
                console.log(connectionError);
            });
            
        })
        .catch((connectionError) => {
            console.log(connectionError);
    });
});

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});

