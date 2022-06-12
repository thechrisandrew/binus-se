const pool = require("../helpers/database");

module.exports = {
    checkEmail: function (data) {
        return new Promise((resolve, reject) => {
            pool.getConnection(function (err, conn) {
                if (err) console.log("error : " + err);
                else
                    conn.query(
                        "SELECT * FROM users WHERE `email` = ?",
                        [data.email],
                        function (err, result, fields) {
                            pool.releaseConnection(conn);
                            if (err) {
                                reject(err);
                            } else {
                                resolve(result);
                            }
                        }
                    );
            });
        });
    },
    create: function (data) {
        return new Promise((resolve, reject) => {
            pool.getConnection(function (err, conn) {
                if (err) console.log("error : " + err);
                else
                    conn.query(
                        `INSERT INTO users(email, password, firstName, lastName, roleId) VALUES (?,?,?,?,?)`,
                        [
                            data.email,
                            data.password,
                            data.firstName,
                            data.lastName,
                            data.roleId,
                        ],
                        function (err, result) {
                            pool.releaseConnection(conn);
                            if (err) {
                                reject(err);
                            } else {
                                resolve("Successfully registered an account");
                            }
                        }
                    );
            });
        });
    },

    auth: function (data) {
        return new Promise((resolve, reject) => {
            pool.getConnection(function (err, conn) {
                if (err) console.log(err);
                else
                    conn.query(
                        `SELECT * FROM users WHERE email = ?`,
                        [data.email],
                        async (err, queryResult) => {
                            // console.log(queryResult);
                            if (err) {
                                reject(err);
                            } else {
                                resolve(queryResult);
                            }
                        }
                    );
            });
        });
    },

    checkUserExists: function() {
        return new Promise((resolve, reject) => {
            pool.getConnection(function (err, conn) {
                if (err) console.log(err);
                else
                    conn.query(
                        `SELECT * FROM users`,
                        async (err, queryResult) => {
                            console.log(queryResult);
                            if (err) {
                                reject(err);
                            } else {
                                resolve(queryResult);
                            }
                        }
                    );
            });
        });
    }
};
