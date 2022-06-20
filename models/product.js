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
                        [data.productId, data.productName, data.productStock, data.productPrice],
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
                        `UPDATE products SET productId = ?, productName = ?, productStock = ?, productPrice = ? WHERE productId = ?`,
                        [data.productId, data.productName, data.productStock, data.productPrice, data.oldProductId],
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
                    conn.query(
                        `DELETE FROM products WHERE productId = ?`,
                        [data.productId],
                        async (err, queryResult) => {
                            pool.releaseConnection(conn);
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

    describeProduct: function (data) {
        return new Promise((resolve, reject) => {
            pool.getConnection(function (err, conn) {
                if (err) console.log(err);
                else
                    conn.query(
                        `SELECT * FROM products WHERE productId = ?`,
                        [data.productId],
                        async (err, queryResult) => {
                            pool.releaseConnection(conn);
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

    updateStockProduct: function (data) {
        return new Promise((resolve, reject) => {
            pool.getConnection(function (err, conn) {
                if (err) console.log(err);
                else
                    conn.query(
                        `
						UPDATE products 
						SET productStock = productStock - ? 
						WHERE productId = ?`,
                        [data.quantity, data.productId],
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

    getProductStock: async (data) => {
        return new Promise((resolve, reject) => {
            pool.getConnection(function (err, conn) {
                if (err) console.log(err);
                else
                    conn.query(
                        `
					SELECT productStock 
					FROM products 
					WHERE productId LIKE ?`,
                        [data.productId],
                        async (err, queryResult) => {
                            pool.releaseConnection(conn);
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
