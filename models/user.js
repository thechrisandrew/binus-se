const pool = require("./../helpers/database");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
// const req = require("express/lib/request");
// const res = require("express/lib/response");

module.exports = {
    auth: function (data) {
        return new Promise((resolve, reject) => {
            pool.getConnection(function (err, conn) {
                if (err) console.log(err);
                else
                    conn.query(
                        `SELECT * FROM users WHERE email = ?`,
                        [data.email],
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
    },
};
