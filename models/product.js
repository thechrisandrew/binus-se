const pool = require("../helpers/database");

module.exports = {
    listProduct: function (data) {
        return new Promise((resolve, reject) => {
            pool.getConnection(function (err, conn) {
                if (err) console.log(err);
                else
                    conn.query(`SELECT * FROM products`, async (err, queryResult) => {
                        pool.releaseConnection(conn);
                        console.log(queryResult);
                        if (err) {
                            reject(err);
                        } else {
                            resolve(queryResult);
                        }
                    });
            });
        });
    },

    createProduct: function (data) {
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

    updateProduct: function (data) {
        return new Promise((resolve, reject) => {
            pool.getConnection(function (err, conn) {
                if (err) console.log(err);
                else
                    conn.query(
                        `UPDATE products SET ?? = ? WHERE id = ?`,
                        [data.key, data.value, data.id],
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

    deleteProduct: function (data) {
        return new Promise((resolve, reject) => {
            pool.getConnection(function (err, conn) {
                if (err) console.log(err);
                else
                    conn.query(`DELETE FROM products WHERE id = ?`, [data.id], async (err, queryResult) => {
                        pool.releaseConnection(conn);
                        console.log(queryResult);
                        if (err) {
                            reject(err);
                        } else {
                            resolve(queryResult);
                        }
                    });
            });
        });
    },
};
