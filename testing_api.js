const axios = require('axios')

axios
  .post('http://localhost:3000/createUser', {
    username: "rick sanchez",
    age: 777777777,
    bio: "hahaha im a fake b******",
  })
  .then(res => {
    console.log(`statusCode: ${res.status}`)
    console.log(res.data)
  })
  .catch(error => {
    console.error(error)
  })