import mysql from 'mysql2/promise';

const {MYSQL_HOST, MYSQL_USER,MYSQL_PASSWORD,MYSQL_PORT,MYSQL_DATABASE} = process.env;

export const client = await mysql.createConnection({
    host : MYSQL_HOST,
    port: MYSQL_PORT,
    database : MYSQL_DATABASE,
    user : MYSQL_USER,
    password: MYSQL_PASSWORD,
});