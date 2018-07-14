const conf = require('../configures/databseconf');
const mysql = require('mysql');

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
            call(null, null, {message: "Email is empty"});
        } else if (!data.password) {
            call(null, null, {message: "Password is empty"});
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
                                call(null, {message: "You are register"}, null);
                            }
                        }
                    )
                }
            });
        }

    }
}

const db = new DataBase();

module.exports = db;