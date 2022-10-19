const express = require("express");
let {users} = require("./userdata");
const cors = require('cors');
const PORT= process.env.PORT || 5000;

const app = express();

//middle ware
app.use(cors())
app.use(express.json())
app.use(express.text())

// generate random Number
function getRandom(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min); // The maximum is exclusive and the minimum is inclusive
  }
// api function
 
async function run(){

try{
    app.get('/user/all', async(req, res)=>{
    const {limit} = req.query;
        res.json(users.slice(0, limit || 5));
    })


    app.get('/user/random', async(req, res)=>{
        const arrayLength= users.length; 
        const random = getRandom(0, arrayLength)
        res.json(users[random]);
    })

    app.post('/user/save', async(req, res)=>{
        const body = req.body;
        users.push(body)
        res.send(users);
    })

    app.patch('/user/update', async(req, res)=>{
        const {ind} = req.query
        // const filter = { index: index}

        const newData = users.find(user=> user.index == ind)

        newData.index = ind
        newData.name = req.body.name;
        res.send(newData)
    })

    app.delete('/user/delete/:id', async(req, res)=>{
        const {id} = req.params;
        const filter = {_id: id};

        users = users.filter(user => user._id != id)

        res.send(users);
    })


} catch (error) {
    console.dir(error);
}
} 

run().catch(console.dir);
 

app.get('/', (req, res) => {
    res.send(' server working');
});

app.listen(PORT, () => {
    console.log('Listening to port', PORT);
}) 