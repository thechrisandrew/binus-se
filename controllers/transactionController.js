const transaction = require("../models/transaction");

module.exports = {
    transactionHistory: async (req, res) => {
        try{
            const data = {
                startDate   : req.body.startDate,
                endDate     : req.body.endDate,
            };
            const result = await transaction.transactionHistory(data);
            res.status(200).send(result);
        } catch (err) {
            res.status(500).send({message: "Something went wrong!"});
        }
    },

    // listInboundTransaction: () => {

    // }
};