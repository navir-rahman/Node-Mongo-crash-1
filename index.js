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
        const body = req.body
        
        let updated =[]
        if (body.length > 1) {
            res.status(400).send({success: false, error: {message: 'Bad Request Error'}});
        } else {
                const newData   = users.find(user=> user._id == body._id)
                newData.index   =body.index
                newData.picture =body.picture
                newData.name    =body.name
                newData.gender  =body.gender
                newData.email   =body.email
                newData.phone   =body.phone
                newData.address =body.address
    
                updated.push(newData)

            res.send(updated)
        }

        
        
    })


    app.patch('/user/bulk-update', async(req, res)=>{
        const body = req.body
        
        let updated =[]
        body.forEach(e => {
            const newData   = users.find(user=> user._id == e._id)
            newData.index   = e.index
            newData.picture =e.picture
            newData.name    =e.name
            newData.gender  =e.gender
            newData.email   =e.email
            newData.phone   =e.phone
            newData.address =e.address

            updated.push(newData)
        });
        
        res.send(updated)
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