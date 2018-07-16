const conf = require('../configures/databseconf');
const mysql = require('mysql');
const fs = require('fs');

class DataBase {
    constructor() {
        this.connection = mysql.createConnection(conf);
        this.connection.connect((err) => {
            if (err) {
                console.log(err);
            } else {
                console.log('DataBase is connect');
            }
        });
        this.getConnection = this.getConnection.bind(this);
    }
    getConnection() {
        return this.connection;
    }

    getStatus() {
        console.log(this.connection.state);
    }
    getUserByEmail(email, call = (err, user) => { }) {
        this.connection.query(
            `SELECT * FROM test_server.users Where users.email = "${email}";`,
            (err, res) => {
                if (res.length > 0) {
                    call(null, res[0])
                } else {
                    call(err, null);
                }
            });
    }
    getUserById(id, call = (err, user) => { }) {
        this.connection.query(
            `SELECT * FROM test_server.users Where users.id = ${id};`,
            (err, res) => {
                if (res.length > 0) {
                    call(null, res[0])
                } else {
                    call(err, null);
                }
            });
    }
    addNewUser(data, call = (err, user, info) => { }) {
        if (!data.email) {
            call(null, null, { message: "Email is empty" });
        } else if (!data.password) {
            call(null, null, { message: "Password is empty" });
        } else if (data.password !== data.passconf) {
            call(null, null, { message: "Password not confirmed" });
        } else {
            this.getUserByEmail(data.email, (err, user) => {
                if (err) {
                    call(err, null, null);
                } else if (user) {
                    call(null, null, { message: "Email in use" });
                } else {
                    this.connection.query(
                        `INSERT INTO test_server.users (Name, Email, Password) VALUES ('${data.name}', '${data.email}', '${data.password}');`,
                        (er, res) => {
                            if (er) {
                                call(er, null, null);
                            } else {
                                call(null, null, { message: "You are register" });
                            }
                        }
                    )
                }
            });
        }
    }
    updateUserPhoto(user, url, filename, call = (err, info) => { }) {
        let update = (id, url, call) => {
            this.connection.query(`UPDATE test_server.users SET Photo ='${url}' WHERE Id = '${id}';`, (err, res) => {
                if (err) {
                    call(err);
                } else {
                    call(null, { message: "Update success" });
                }
            })
        }

        update = update.bind(this);

        if (!user) {
            call({ message: "No user" }, null);
        } else if (!url) {
            call({ message: "No url" }, null);
        } else if (!filename) {
            call({ message: "No filename" }, null);
        } else {
            if (user.Photo) {
                const dist = `${__dirname}/../res${user.Photo}`;
                fs.unlink(dist, (err) => {
                    if (err) {
                        call(err);
                    } else {
                        update(user.Id, url, call);
                    }
                })
            } else {
                update(user.Id, url, call);
            }
        }
    }
}

const db = new DataBase();

module.exports = db;