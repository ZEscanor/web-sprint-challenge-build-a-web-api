require('dotenv').config() // neccessary in order to deploy to heroku
const express = require("express")

const action = require("./data/helpers/actionModel")
const project = require("./data/helpers/projectModel")
const PORT = process.env.PORT || 5000; // in order for heroku to use its own env variables
const server = express();

server.use(express.json())
server.use(cors())



//CRUD OPERATIONS BEGINNING
server.post("/actions",[validatePost],(req,res)=>{
action.insert(req.body)
.then(data=>{
    res.status(200).json({successmessage:`success you got ${data}`})
})
.catch(error=>{
    res.status(400).json({errormessage:"id not found"})
})
})

server.put("/actions/:id",[validatePost],(req,res)=>{
    console.log(req.params,req.body)
    action.update(req.params.id,req.body)
   
    .then(
        res.status(200).json({message:"success"})
      )
      .catch(error=>{
        res.status(400).json({errorMessage:"not found"})
      })
})

server.delete("/actions/:id", (req,res)=>{
    action.remove(req.params.id)
    .then(data=>{
        res.status(201).json(data)
    })
    .catch(error=>{
     res.status(500).json({errormessage:"Id doesnt exist"})
    })
    
})

server.get("/actions/:id",(req,res)=>{
    console.log(req.params)
    action.get(req.params.id)
    .then(data=>{
        res.status(200).json(data)
    })
    .catch(error=>{
        res.status(400).json({errormessage:"id not found"})
    })
})




server.post("/projects",[validateProject],(req,res)=>{
    project.insert(req.body)
    .then(data=>{
        res.status(200).json({successmessage:`success you got ${data}`})
    })
    .catch(error=>{
        res.status(400).json({errormessage:"id not found"})
    })
    })

    server.put("/projects/:id",[validateProject],(req,res)=>{
        console.log(req.params,req.body)
        project.update(req.params.id,req.body)
       
        .then(
            res.status(200).json({message:"success"})
          )
          .catch(error=>{
            res.status(400).json({errorMessage:"not found"})
          })
    })

    server.delete("/projects/:id", (req,res)=>{
        project.remove(req.params.id)
        .then(data=>{
            res.status(201).json(data)
        })
        .catch(error=>{
         res.status(500).json({errormessage:"Id doesnt exist"})
        })
        
    })


server.get("/projects/:id",(req,res)=>{
    console.log(req.params)
    project.get(req.params.id)
    .then(data=>{
        res.status(200).json(data)
    })
    .catch(error=>{
        res.status(400).json({errormessage:"id not found"})
    })
})

















server.get('*', (req,res)=>{
    res.send("Let's Begin Our Sprint!")
});

server.listen(PORT,()=>{
    console.log(`Server Running on PORT ${PORT}`)
})






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
  
  module.exports = server;