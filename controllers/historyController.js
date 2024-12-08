const testResults = []; // Simulasi database

const getHistory = async (request, h) => {
    const { userId } = request.params;

    const userHistory = testResults.filter((result) => result.userId === userId);
    return h.response({ history: userHistory }).code(200);
};

module.exports = { getHistory };
