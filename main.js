var db = require('./db_functions')
var fs = require('fs')

var express = require('express')
var app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

function isvalidData(obj_body) {
    const username = obj_body.username
    const age = obj_body.age
    const bio = obj_body.bio
    const is_valid = (
        typeof(username)==='string' &&
        typeof(age)==='number' && Number.isInteger(age) &&
        typeof(bio)==='string' && bio.length>0
    )
    return is_valid
}


app.post('/createUser', (req, res, next) => {
    const body = req.body
    
    let json_response = {
        status: ""
    }
    
    if (!isvalidData(body)) {
        json_response.status = "error"
        json_response.reason = "some data is invalid"
        return res.send(JSON.stringify(json_response))
    }

    db.readUserDB("username", body.username, async user => {
        if (user!==undefined) {
            console.log("ESTE USUÁRIO JÁ EXISTE")
            json_response.status = "error"
            json_response.reason = "this username already exists"
            return await res.send(JSON.stringify(json_response))
        }
    })

    console.log("CHEGOU NO CREATE")
    db.createUserDB(body)

    console.log("CHEGOU NO OK")
    json_response.status = "ok"
    res.send(JSON.stringify(json_response))
})

app.get('/', (req, res) => {
    res.send("HOME")
})

app.listen(3000, () => {
    console.log('Listening')
})