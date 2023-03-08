const express= require("express");
const app =express();
const Blog = require('./models/blog')
const bodyParser = require('body-parser');
require('dotenv').config();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json()); 
 
const dbURI = process.env.DB_URI;
// const dbURI="mongodb+srv://aryan1982:<password>@nodetuts.e8bnnhz.mongodb.net/?retryWrites=true&w=majority";

const mongoose = require("mongoose");
mongoose.set('strictQuery', false);
mongoose.connect(`mongodb+srv://${dbURI}`)
  .then((result)=>{console.log("connectd to database");
                    app.listen(3000,()=>{
                    console.log("app running on port 3000")
                  })})
  .catch((err)=>{console.log(err)})
 
app.get("/new-blog",(req,res)=>{
    const blog = new Blog(req.body);

    blog.save()
      .then((result)=>{
        res.send(result); 
      })
        .catch((err)=>{
          console.log(err) 
        })
})

app.set('view engine', 'ejs')
app.get("/",(req,res)=>{
  res.send("working")
  // res.download("index.js")
}) 

const userRouter = require('./routes/userrouter')

app.use('/users', userRouter)

