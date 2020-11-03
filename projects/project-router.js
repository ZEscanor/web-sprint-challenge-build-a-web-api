const express = require('express');
 const project = require("../data/helpers/projectModel")

 const router = express.Router();


// posts a new project to the database
router.post("/projects",[validateProject],(req,res)=>{
    project.insert(req.body)
    .then(data=>{
        res.status(200).json(data)
    })
    .catch(error=>{
        res.status(400).json({errormessage:"id not found"})
    })
    })
    // changes an existing project
    router.put("/projects/:id",[validateProject],(req,res)=>{
        console.log(req.params,req.body)
        project.update(req.params.id,req.body)
       
        .then(
            res.status(200).json({message:"success"})
          )
          .catch(error=>{
            res.status(400).json({errorMessage:"not found"})
          })
    })
//deletes an existing project
    router.delete("/projects/:id", (req,res)=>{
        project.remove(req.params.id)
        .then(data=>{
            res.status(201).json(data)
        })
        .catch(error=>{
         res.status(500).json({errormessage:"Id doesnt exist"})
        })
        
    })
// gets a specific project at an ID, currently however there is only one project in the database
router.get("/projects/:id",(req,res)=>{
    console.log(req.params)
    project.get(req.params.id)
    .then(data=>{
        res.status(200).json(data)
    })
    .catch(error=>{
        res.status(400).json({errormessage:"id not found"})
    })
})



module.exports = router;




















 function validateProject(req, res, next) {
    if(!req.body){
      res.status(401).json({message:"You have no body"})
  }
  else if(!req.body.name){
    res.status(401).json({message:"Missing some key elements name"})
  }
  else if(!req.body.description){
    res.status(401).json({message:"Missing some key elements description"})

  }
  else{
    next();
  }
  }

function validatePost(req, res, next) {
    // do your magic!
    if(!req.body){
      res.status(401).json({message:"Missing some key elements NAME"})
  }
  else if(!req.body.project_id){
    res.status(401).json({message:"Missing some key elements proj id"})
  }
  else if(!req.body.description || !req.body.notes){
    res.status(401).json({message:"Missing some key elements desc or notes"})

  }
  else{
    next();
  }
  }