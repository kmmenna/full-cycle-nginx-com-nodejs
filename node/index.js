const express = require('express')
const app = express()
const port = 3000
const config = {
    host: 'db',
    user: 'root',
    password: 'root',
    database:'nodedb'
};
const mysql = require('mysql')
const connection = mysql.createConnection(config)

const sqlTable = "CREATE TABLE IF NOT EXISTS people( id INT NOT NULL AUTO_INCREMENT, name VARCHAR(100) NOT NULL, PRIMARY KEY(id))"
connection.query(sqlTable)

async function insertName() {
    return new Promise((resolve, reject) => {
        connection.query(`INSERT INTO people(name) values('Wesley')`, (error, results) => {
            if (error) {
                return reject(error)
            }
            return resolve(results)
        })
    })
}

async function getNames() {
    return new Promise((resolve, reject) => {
        connection.query("SELECT name FROM people", (error, results) => {
            if (error) {
                return reject(error)
            }
            return resolve(results)
        })
    })
}

app.get('/', async (req,res) => {
    await insertName();
    const names = await getNames();
    
    let body = '<h1>Full Cycle</h1><ul>';
    for (const { name } of names) {
        body += `<li>${name}</li>`
    }
    body += '</ul>'
    
    res.send(body)
})

app.listen(port, ()=> {
    console.log('Rodando na porta ' + port)
})