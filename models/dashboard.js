const pool = require("../helpers/database");

module.exports = {
    getTodaySales: function () {
        return new Promise((resolve, reject) => {
            pool.getConnection(function (err, conn) {
                if (err) console.log(err);
                else {
                    conn.query(`
                    SELECT SUM(p.productPrice * od.quantity) AS 'Total Income'
                    FROM outboundHeader oh
                    JOIN outboundDetail od ON od.id = oh.id
                    JOIN products p ON p.productId = od.productId
                    WHERE oh.transactionDate = CAST(NOW() AS DATE)
                    `, 
                    async (err, queryResult) => {
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

    getYesterdaySales: function () {
        return new Promise((resolve, reject) => {
            pool.getConnection(function (err, conn) {
                if (err) console.log(err);
                else {
                    conn.query(`
                    SELECT SUM(p.productPrice * od.quantity) AS 'Total Income'
                    FROM outboundHeader oh
                    JOIN outboundDetail od ON od.id = oh.id
                    JOIN products p ON p.productId = od.productId
                    WHERE oh.transactionDate = CAST(NOW() AS DATE) - 1`, 
                    async (err, queryResult) => {
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

    getItemSalesStatistic: function () {
        return new Promise((resolve, reject) => {
            pool.getConnection(function (err, conn) {
                if (err) console.log(err);
                else {
                    conn.query(`
                    SELECT 
                        COUNT(id) AS 'Total Transaction',
                        transactionDate
                    FROM outboundHeader
                    GROUP BY transactionDate`, 
                    async (err, queryResult) => {
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

    getRecentTransaction: function () {
        return new Promise((resolve, reject) => {
            pool.getConnection(function (err, conn) {
                if (err) console.log(err);
                else {
                    conn.query(`
                    SELECT 
                        od.quantity,
                        p.productName,
                        p.productPrice * od.quantity AS 'Sub Total',
                        SUM(p.productPrice * od.quantity) AS 'Grand Total'
                    FROM outboundHeader oh
                    JOIN outboundDetail od ON oh.id = od.id
                    JOIN products p ON p.productId = od.productId
                    WHERE transactionDate = CAST(NOW() AS DATE)
                    GROUP BY od.quantity, p.productName, 'Sub Total'
                    ORDER BY oh.id DESC
                    LIMIT 1`, 
                    async (err, queryResult) => {
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
};
