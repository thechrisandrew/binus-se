const pool = require("../helpers/database");

module.exports = {
    createCheckout: function (data) {
        return new Promise((resolve, reject) => {
            pool.getConnection(function (err, conn) {
                if (err) console.log(err);
                else
                    conn.query(
                        `INSERT INTO products VALUES (?,?,?,?)`,
                        [data.id, data.productName, data.quantity, data.price],
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
