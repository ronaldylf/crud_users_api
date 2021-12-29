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


app.post('/createUser', async (req, res, next) => {
    const body = req.body
    
    let json_response = {
        status: ""
    }
    
    if (!isvalidData(body)) {
        json_response.status = "error"
        json_response.reason = "some data is invalid"
        return res.send(JSON.stringify(json_response))
    }

    
    await db.readUserDB("username", body.username, user => {
        if (user!==undefined) {
            json_response.status = "error"
            json_response.reason = "this username already exists"
            return res.send(JSON.stringify(json_response))
        }

        db.createUserDB(body)
        json_response.status = "ok"
        return res.send(JSON.stringify(json_response))
    })
})
///////////////////////////////////////////////
app.post("/readUser", (req, res) => {
    const field = req.body.field
    const value = req.body.value
    let json_response = {

    }

    if (field===undefined || value===undefined) {
        json_response.status = "error"
        json_response.reason = "some data is missing"
        console.log(json_response.reason)
        return res.send(JSON.stringify(json_response))
    }


    db.readUserDB(field, value, (user) => {
        if (user===undefined) {
            json_response.status = "error"
            json_response.reason = "user not found"
        } else {
            json_response.status = "ok"
            json_response.user = user
        }
        
        return res.send(JSON.stringify(json_response))
    })
})
///////////////////////////////////////////////
app.post("/updateUser", (req, res) => {
    const possible_user = req.body
    let json_response = {

    }

    if (!isvalidData(possible_user)) {
        json_response.status = "error"
        json_response.reason = "some data is invalid"
        return res.send(JSON.stringify(json_response))
    }

    db.readUserDB("id_", possible_user.id_, (user) => {
        if (user===undefined) {
            json_response.status = "error"
            json_response.reason = "user not found"
            return res.send(JSON.stringify(json_response))
        }
        
        db.updateUserDB(possible_user)
        json_response.status = "ok"
        return res.send(JSON.stringify(json_response))
    })
})

app.get('/', (req, res) => {
    res.send("HOME")
})

app.listen(3000, () => {
    console.log('Listening')
})