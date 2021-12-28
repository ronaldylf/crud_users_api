const sqlite3 = require('sqlite3').verbose();

const db_path = './db/users.db'

async function createUserDB(info) {
    // open database
    let db = new sqlite3.Database(db_path, sqlite3.OPEN_READWRITE, err => {
        if (err) {
            throw err
            return;
        }

        //console.log('Connected to the in-memory SQlite database.');
    });
    
    sql = "INSERT INTO users (username, age, bio) VALUES (?, ?, ?)"
    db.serialize(() => {
        db.run(sql, [info.username, info.age, info.bio], err => {
            if (err) throw err
            return;
        })
    })

    // close the database connection
    await db.close((err) => {
        if (err) {
            throw err
            return;
        }
        //console.log('Close the database connection.');
    });
}
//////////////////////////////////////////////////////////////////////
async function deleteUserDB(row_id) {
    // open database
    let db = new sqlite3.Database(db_path, sqlite3.OPEN_READWRITE, err => {
        if (err) {
            throw err
            return;
        }

        //console.log('Connected to the in-memory SQlite database.');
    });
    
    sql = "DELETE FROM users WHERE row_id=?"
    db.serialize(() => {
        db.run(sql, row_id, err => {
            if (err) throw err
            return;
        })
    })

    // close the database connection
    await db.close((err) => {
        if (err) {
            throw err
            return;
        }
        //console.log('Close the database connection.');
    });
}
//////////////////////////////////////////////////////////////////////
async function updateUserDB(info) {
    // open database
    let db = new sqlite3.Database(db_path, sqlite3.OPEN_READWRITE, err => {
        if (err) {
            throw err
            return;
        }

        //console.log('Connected to the in-memory SQlite database.');
    });
    
    sql = "UPDATE users SET username=?, age=?, bio=? WHERE row_id=?"
    db.serialize(() => {
        db.run(sql, [info.username, info.age, info.bio, info.row_id], err => {
            if (err) throw err
            return;
        })
    })

    // close the database connection
    await db.close((err) => {
        if (err) {
            throw err
            return;
        }
        //console.log('Close the database connection.');
    });
}
////////////////////
async function readALL(callback) {
    // open database
    let db = new sqlite3.Database(db_path, sqlite3.OPEN_READWRITE, err => {
        if (err) {
            throw err
            return;
        }

        //console.log('Connected to the in-memory SQlite database.');
    });
    
    sql = "SELECT * FROM users"
    db.serialize(() => {
        db.all(sql, [], (err, rows) => {
            if (err) throw err
            callback(rows)
            db.close()
        })
    })
    
}
///////////////////////////////////////
async function readUserDB(field, value, callback) {
    // open database
    let db = new sqlite3.Database(db_path, sqlite3.OPEN_READWRITE, err => {
        if (err) {
            throw err
            return;
        }

        //console.log('Connected to the in-memory SQlite database.');
    });
    
    sql = "SELECT * FROM users WHERE "+field+"=?"
    db.serialize(() => {
        db.get(sql, [value], (err, row) => {
            if (err) throw err
            callback(row)
            db.close()
        })
    })
    
}

/**
Create -ok
Read - ok
Update - ok
Delete - ok
 */
const pseudo_class = {
    createUserDB, // create
    readUserDB, // read
    updateUserDB, // update
    deleteUserDB, // delete

    readALL, // read => return a callback
}

module.exports = pseudo_class