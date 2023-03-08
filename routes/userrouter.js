const express = require("express");
const router = express.Router()
const Blog = require('../models/blog') 



router.get("/",(req,res)=>{
  res.send("users")
}) 




const users = [{name:"Aryan"},{name:"Jenish"},{name:"Jignesh"}]
const blog = Blog
router.get("/all-blogs",(req,res)=>{
	blog.find()
	// .then((result)=>{res.send(result)})
	.then((result)=>{res.render("allblogpage",{blogs:result})})
	.catch((err)=>{console.log(err)});
	
}); 

router.post("/submit",(req,res)=>{  
	const blog = new Blog(req.body);
		// res.send(req.body)
    blog.save((err) => {
    if (err) {
      console.error(err);
      res.send('Error!');
    } else {
      res.send('Success!');
    }
  });
})

router.get(`/:id`,(req,res)=>{
	  const ID = req.params.id-1
	  if(ID>3){
	  	res.send("check your url")
	  }
	  const user = users[ID].name
	  // res.send(`new users ${req.params.id}`)
	  console.log(`${users[ID].name}`)
	  res.render("create", {user:user})
})


module.exports = router;