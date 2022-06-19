const transaction = require("../models/transaction");

function changeDateFormat(date) {
    if (date === "" || date === undefined) {
        return "";
    } else {
        const [day, month, year] = date.split("/");
        const result = [year, month, day].join("-");
        return result;
    }
    // console.log(new Date(startDate).toISOString());
}

module.exports = {
    transactionHistory: async (req, res) => {
        try {
            let startDate = changeDateFormat(req.query.startDate);
            let endDate = changeDateFormat(req.query.endDate);
            const data = {
                startDate: startDate,
                endDate: endDate,
            };
            console.log(data);
            const result = await transaction.transactionHistory(data);
            let transactionKe = [];
            let grandTotal = 0;
            let j = 0;
            for (let i = 0; i < result.length; i++) {
                if (i === 0) {
                    grandTotal += result[i].subTotal;
                    transactionKe[j] = {
                        transactionId: result[i].id,
                        items: [
                            {
                                quantity: result[i].quantity,
                                productName: result[i].productName,
                                subTotal: result[i].subTotal,
                            },
                        ],
                        grandTotal: grandTotal,
                    };
                } else if (result[i].transactionId === result[i - 1].transactionId) {
                    grandTotal += result[i].subTotal;
                    transactionKe[j].items.push({
                        quantity: result[i].quantity,
                        productName: result[i].productName,
                        subTotal: result[i].subTotal,
                    });
                    transactionKe[j].grandTotal = grandTotal;
                } else {
                    j++;
                    grandTotal = 0;
                    grandTotal += result[i].subTotal;
                    transactionKe[j] = {
                        transactionId: result[i].id,
                        items: [
                            {
                                quantity: result[i].quantity,
                                productName: result[i].productName,
                                subTotal: result[i].subTotal,
                            },
                        ],
                        grandTotal: grandTotal,
                    };
                }
            }
            console.log(transactionKe);
            res.status(200).send(transactionKe);
        } catch (err) {
            res.status(500).send({ message: "Something went wrong! : " + err });
        }
    },
};
