// historyController.js

// Simulasi database untuk menyimpan riwayat tes
let testHistory = [];

const getTestHistory = async (request, h) => {
    try {
        // Mengembalikan seluruh riwayat tes
        return h.response({
            message: 'Test history retrieved successfully',
            data: testHistory,
        }).code(200);
    } catch (error) {
        console.error('Error fetching test history:', error);
        return h.response({
            message: 'Failed to retrieve test history',
            error: error.message,
        }).code(500);
    }
};

const saveTestHistory = async (request, h) => {
    try {
        const { userId, totalScore, stressLevel } = request.payload;

        // Simpan data ke riwayat tes
        const newEntry = {
            id: testHistory.length + 1,
            userId,
            totalScore,
            stressLevel,
            date: new Date(),
        };

        testHistory.push(newEntry);

        return h.response({
            message: 'Test history saved successfully',
            data: newEntry,
        }).code(201);
    } catch (error) {
        console.error('Error saving test history:', error);
        return h.response({
            message: 'Failed to save test history',
            error: error.message,
        }).code(500);
    }
};

module.exports = { getTestHistory, saveTestHistory };
