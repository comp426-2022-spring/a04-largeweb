const Database = require("better-sqlite3")

const logdb = new Database("log.db");

// const stmt = logdb.prepare(`SELECT name FROM sqlite_master WHERE type='table' and 'access';`)
const stmt = logdb.prepare(`SELECT name FROM sqlite_master WHERE type='table' and name='accesslog';`)
let row = stmt.get();
if (row == undefined) {
    console.log('Log database appears to be empty.');

        // DROP TABLE userinfo;
    const sqlInit1 = `
        CREATE TABLE userinfo ( id INTEGER PRIMARY KEY, username TEXT, password TEXT );
        INSERT INTO userinfo (username, password) VALUES ('user1','supersecurepass'),('test','another-super-secret-pass');

    `
        // CREATE TABLE access ( id INTEGER PRIMARY KEY, remote-addr VARCHAR, remote-user VARCHAR, datetime VARCHAR, method VARCHAR, url VARCHAR, http-version NUMERIC, status INTEGER, content-length NUMERIC);


        // DROP TABLE accesslog;
    const sqlInit2 = `
        CREATE TABLE accesslog ( id INTEGER PRIMARY KEY, remoteaddr TEXT, remoteuser TEXT, time TEXT, method TEXT, url TEXT, protocol TEXT, httpversion TEXT, status TEXT, referer TEXT, useragent TEXT );
    `

    // const sqlInit = `
    //     DROP TABLE accesslog;
    //     CREATE TABLE accesslog ( id INTEGER PRIMARY KEY, remoteaddr TEXT, remoteuser TEXT, time TEXT, method TEXT, url TEXT, httpversion TEXT, server TEXT, status TEXT, referer TEXT, useragent TEXT);
    // `

    logdb.exec(sqlInit1);
    logdb.exec(sqlInit2);
} else {
    console.log('Log database exists.');
}

module.exports = logdb;