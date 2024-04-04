// 1.importing the express
const express = require('express')
const employeeModel =require("./model")

// 2.initializatiom
const app = new express()
// midware || parsing the parameter
app.use(express.urlencoded({extended:true}))
app.use(express.json())

// 3.api creartion
app.get('/',(req,res)=>{
    res.send("this message is from the server")
})

app.get('/trail',(req,res)=>{
    res.send("this is trail message ")
})

app.get('/hibamunna',(req,res)=>{
    res.send("this message is from Hiba Munna")
})

app.get('/data',(req,res)=>{
    res.json(
        {
            "name":"Hiba",
             "age":19
        }
    )
})

// api for adding data
app.post('/create',async(req,res)=>{
    var result = await new employeeModel(req.body)
    result.save()
    res.send("Data Added")
})

// api for  view data
app.get('/view',async(req,res)=>{
    var data = await employeeModel.find()
    res.json(data)
    console.log(data)
})

// api for deleting data
app.delete('/remove/:id',async(req,res)=>{
    console.log(req.params)
    let id = req.params.id
    await employeeModel.findByIdAndDelete(id)
    res.send("Deleted")
})

// api for updating  the data
app.put('/edit/:id',async(req,res)=>{
    let id = req.params.id
    await employeeModel.findByIdAndUpdate(id,req.body)
    res.send("Data Updated")
})

// 4.port
app.listen(3005,()=>{
    console.log("Port 3005 is up and running")
})
