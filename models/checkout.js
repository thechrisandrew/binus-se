const pool = require("../helpers/database");

module.exports = {
    createCheckoutHeader: function (id) {
        return new Promise((resolve, reject) => {
            pool.getConnection(function (err, conn) {
                if (err) console.log(err);
                else {
                    conn.query(`INSERT INTO outboundHeader(userId) VALUES (?)`, [id], async (err, queryResult) => {
                        if (err) {
                            reject(err);
                        } else {
                            resolve(queryResult);
                        }
                    });
                }
            });
        });
    },

    createCheckoutDetail: function (data, headerId) {
        return new Promise((resolve, reject) => {
            pool.getConnection(function (err, conn) {
                if (err) console.log(err);
                else {
                    conn.query(
                        `INSERT INTO outboundDetail VALUES (?, ?, ?)`,
                        [headerId, data.productId, data.quantity],
                        async (err, queryResult) => {
                            if (err) {
                                reject(err);
                            } else {
                                resolve(queryResult);
                            }
                        }
                    );
                }
            });
        });
    },
};
