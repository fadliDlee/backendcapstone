// historyRoutes.js
const { getTestHistory, saveTestHistory } = require('../controllers/historyController');

module.exports = [
    {
        method: 'GET',
        path: '/history/{userId}',
        handler: getTestHistory,
    },
    {
        method: 'POST',
        path: '/history',
        handler: saveTestHistory,
    }
];
