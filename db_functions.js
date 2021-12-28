const sqlite3 = require('sqlite3').verbose();

const db_path = './db/users.db'

async function close_db(db) {
    // close the database connection
    await db.close((err) => {
        if (err) {
            throw err
            return;
        }
        //console.log('Close the database connection.');
    });
}

async function createUserDB(info) {
    // open database
    let db = new sqlite3.Database(db_path, sqlite3.OPEN_READWRITE, err => {
        if (err) throw err
    });
    
    sql = "INSERT INTO users (username, age, bio) VALUES (?, ?, ?)"
    db.serialize(() => {
        db.run(sql, [info.username, info.age, info.bio], err => {
            if (err) throw err
        })
        close_db(db)
    })
}
//////////////////////////////////////////////////////////////////////
async function deleteUserDB(row_id) {
    // open database
    let db = new sqlite3.Database(db_path, sqlite3.OPEN_READWRITE, err => {
        if (err) throw err
    });
    
    sql = "DELETE FROM users WHERE row_id=?"
    db.serialize(() => {
        db.run(sql, row_id, err => {
            if (err) throw err
        })
        close_db(db)
    })
}
//////////////////////////////////////////////////////////////////////
async function updateUserDB(info) {
    // open database
    let db = new sqlite3.Database(db_path, sqlite3.OPEN_READWRITE, err => {
        if (err) throw err
    });
    
    sql = "UPDATE users SET username=?, age=?, bio=? WHERE row_id=?"
    db.serialize(() => {
        db.run(sql, [info.username, info.age, info.bio, info.row_id], err => {
            if (err) throw err
            return;
        })
        close_db(db)
    })
}
////////////////////
async function readALL(callback) {
    // open database
    let db = new sqlite3.Database(db_path, sqlite3.OPEN_READWRITE, err => {
        if (err) throw err
    });
    
    sql = "SELECT * FROM users"
    db.serialize(() => {
        db.all(sql, [], (err, rows) => {
            if (err) throw err
            callback(rows)
        })
        close_db(db)
    })
}
///////////////////////////////////////
async function readUserDB(field, value, callback) {
    // open database
    let db = new sqlite3.Database(db_path, sqlite3.OPEN_READWRITE, err => {
        if (err) throw err
    });
    
    sql = "SELECT * FROM users WHERE "+field+"=?"
    db.serialize(() => {
        db.get(sql, [value], (err, row) => {
            if (err) throw err
            callback(row)
        })
        close_db(db)
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

    readALL, // read => get the rows by a callback
}

module.exports = pseudo_class