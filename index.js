const express = require("express");
const {users} = require("./userdata");
const cors = require('cors');
const PORT= process.env.PORT || 5000;

const app = express();

//middle ware
app.use(cors())
app.use(express.json())

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


    app.post('/user/save ', async(req, res)=>{
        
        res.json("dd");
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