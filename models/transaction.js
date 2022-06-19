const pool = require("../helpers/database");

module.exports = {
    transactionHistory: function (data) {
        return new Promise((resolve, reject) => {
            pool.getConnection(function (err, conn) {
                let query = "";
                if (data.startDate === "" || data.endDate === "") {
                    query = `SELECT
                                oh.id, 
                                od.id AS transactionId,
                                od.quantity, 
                                p.productName, 
                                p.productPrice * od.quantity AS subTotal
                            FROM outboundHeader oh
                            JOIN outboundDetail od ON oh.id = od.id
                            JOIN products p ON p.productId = od.productId
                            ORDER BY oh.id, subTotal ASC`;
                } else {
                    query = `SELECT
                                oh.id, 
                                od.id AS transactionId,
                                od.quantity, 
                                p.productName, 
                                p.productPrice * od.quantity AS subTotal
                            FROM outboundHeader oh
                            JOIN outboundDetail od ON oh.id = od.id
                            JOIN products p ON p.productId = od.productId
                            WHERE transactionDate BETWEEN ? AND ?
                            ORDER BY oh.id, subTotal ASC`;
                }
                if (err) console.log(err);
                else {
                    conn.query(query, [data.startDate, data.endDate], async (err, queryResult) => {
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
