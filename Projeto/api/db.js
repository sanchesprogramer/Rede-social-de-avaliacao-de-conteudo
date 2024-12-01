import mysql from 'mysql'

export const db = mysql.createConnection({

    host:'localhost',
    user: 'root',
    password: 'Inter_Games88#',
    database:"thomaz"

})