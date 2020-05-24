const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");

// instanseiera express
const app = express();

// Read mongoose Schema
var climbingModel = require('./post-schema');

// Database connection
mongoose.connect("mongodb+srv://Elin:DataBasiskt@krypto-ewfrc.mongodb.net/test?retryWrites=true&w=majority", {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

var db = mongoose.connection;
db.on('open', () => {
    console.log('Connected to mongoDB');
});
db.on('error', (error) => {
    console.log(error)
});



// Middleware 
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());



// GET POSTS
app.get("/api/posts", function(req, res) {
    
    climbingModel.find(function(err, Posts) {
        if(err) {
            res.send(err);
        }
        res.json(Posts);
    });
});
  

// CREATE POST 
app.post('/api/posts/add', (req, res) => {
    var newPost = new climbingModel;

    console.log(req.body)

    newPost.name = req.body.newPost.name;
    newPost.grade = req.body.newPost.grade;
    newPost.area = req.body.newPost.area;
    newPost.description = req.body.newPost.description;
    newPost.type = req.body.newPost.type;
    newPost.createdAt = new Date();

    // save post and write error message
    newPost.save((err) => {
      if(err){
        res.send("Error while adding post");
      }else{
        res.send("Post added");
      }
  });
});

// UPDATE POST
app.patch('/api/posts/update/:id',(req, res) => {
    climbingModel.findByIdAndUpdate(req.params.id, (err, todo) => {
      if(!err){
        res.send("Good Work");
      }
    });
});

// DELETE POST 
app.delete('/api/posts/delete/:id', (req, res) => {
    var query = { _id: req.params.id }
    climbingModel.deleteOne(query, (err) => {
      if(err){
        res.send("Error while deleting Post")
      }else{
        res.send("Post deleted")
      }
    });
  });


const port = process.env.PORT || 5000;

// Start server
app.listen(port, () => console.log(`Server started on port ${port}`));