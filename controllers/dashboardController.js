const dashboard = require("../models/dashboard");

module.exports = {
    getDashboard: async (_, res) => {
        try {
            const todayResult = await dashboard.getTodaySales();
            const yesterdayResult = await dashboard.getYesterdaySales();
            const itemStatisticResult = await dashboard.getItemSalesStatistic();
            const recentTransaction = await dashboard.getRecentTransaction();
            res.status(200).send({todayResult, yesterdayResult, itemStatisticResult, recentTransaction});
        } catch (err) {
            console.log(err);
            res.status(500).send("Something went wrong!");
        }
    },

};
