db_functions = require('./db_functions')

// db_functions.createUserDB({
//     username: "AAAAAA",
//     age: 1111111,
//     bio: "GGGGGGGG"
// })


// db_functions.deleteUserDB(3)

// db_functions.updateUserDB({
//     username: "ronaldy",
//     age: 16,
//     bio: "nothing really matters to me",
//     row_id: 1
// })

// db_functions.readALL(rows => {
//     console.clear()
//     rows.map(user_current => {
//         console.table(user_current)
//         console.log("======================================")
//     })
// })

// db_functions.readALL(rows => {
//     console.log(rows)
//     console.log(typeof(rows))
//     console.log(rows.length)
// })

db_functions.readUserDB("username", "joao", user => {
    console.log(user==undefined)
    // console.log(user[0])
})