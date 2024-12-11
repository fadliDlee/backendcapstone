// historyController.js
const testResults = []; // Simulasi database

const getTestHistory = async (request, h) => {
    const { userId } = request.params;

    const userHistory = testResults.filter((result) => result.userId === userId);
    return h.response({ history: userHistory }).code(200);
};

const saveTestHistory = async (request, h) => {
    const { userId, testResult } = request.payload;
    testResults.push({ userId, testResult, date: new Date() });

    return h.response({ message: 'Test result saved successfully' }).code(201);
};

module.exports = { getTestHistory, saveTestHistory };
