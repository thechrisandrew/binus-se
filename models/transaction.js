const pool = require("../helpers/database");

module.exports = {
    transactionHistory: function (data) {
        return new Promise((resolve, reject) => {
            pool.getConnection(function (err, conn) {
                let query = "";
                if(data.startDate === "" || data.endDate === ""){
                    query = "SELECT * FROM outboundHeader";
                } else {
                    query = "SELECT * FROM outboundHeader WHERE transactionDate BETWEEN ? AND ?"
                }
                if (err) console.log(err);
                else {
                    conn.query(query, [data.startDate, data.endDate], 
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
