const express = require('express');
const router = express.Router();
const {
    trackSharesForOperator, 
    rankOperatorsByShares
} = require('../controllers/controller');


router.get('/unique-operators', async (req, res) => {
    try {
        console.log("REQ RECEIVED")
        const operators = await rankOperatorsByShares();
        res.json({ success: true, data: operators });
    } catch (error) {
        console.error('Error fetching unique operators:', error);
        res.status(500).json({ success: false, message: 'Internal server error', details: error.message });
    }
});

router.get('/operator-shares/:operator', async (req, res) => {
    const { operator } = req.params;
    try {
        const sharesData = await trackSharesForOperator(operator);
        if (sharesData.length === 0) {
            return res.status(404).json({ success: false, message: "No data found for this operator." });
        }
        const chartData = sharesData.map(item => ({
            x: item.timestamp, 
            y: item.totalShares
        }));
        res.json({ success: true, data: chartData });
    } catch (error) {
        console.error('Error fetching operator shares:', error);
        res.status(500).json({ success: false, message: 'Internal server error', details: error.message });
    }
});

router.get('/top-operators', async (req, res) => {
    try {
        const topOperators = await rankOperatorsByShares();
        res.json({ success: true, data: topOperators });
    } catch (error) {
        console.error('Error fetching top operators:', error);
        res.status(500).json({ success: false, message: 'Internal server error', details: error.message });
    }
});

module.exports = router;
