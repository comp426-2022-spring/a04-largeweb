const Database = require("better-sqlite3")

const logdb = new Database("log.db");

const stmt = logdb.prepare(`SELECT name FROM sqlite_master WHERE type='table' and 'access';`)
let row = stmt.get();
if (row == undefined) {
    console.log('Log database appearrs to be empty.');

    const sqlInit = `
        DROP TABLE userinfo;
        CREATE TABLE userinfo ( id INTEGER PRIMARY KEY, username TEXT, password TEXT );
        INSERT INTO userinfo (username, password) VALUES ('user1','supersecurepass'),('test','another-super-secret-pass');

    `
        // CREATE TABLE access ( id INTEGER PRIMARY KEY, remote-addr VARCHAR, remote-user VARCHAR, datetime VARCHAR, method VARCHAR, url VARCHAR, http-version NUMERIC, status INTEGER, content-length NUMERIC);

    logdb.exec(sqlInit);
} else {
    console.log('Log database exists.');
}

module.exports = logdb;