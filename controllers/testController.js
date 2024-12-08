// testController.js

const submitTest = async (request, h) => {
    try {
        const { userId, answers } = request.payload;

        // Logika sederhana untuk menghitung skor dari jawaban pengguna
        const totalScore = answers.reduce((sum, score) => sum + score, 0);

        // Penentuan tingkat stres berdasarkan skor
        let stressLevel = '';
        if (totalScore < 10) {
            stressLevel = 'Low';
        } else if (totalScore >= 10 && totalScore < 20) {
            stressLevel = 'Moderate';
        } else {
            stressLevel = 'High';
        }

        // Simpan hasil tes ke database (simulasi)
        // Anda dapat mengganti ini dengan logika penyimpanan ke database sesungguhnya
        const testResult = {
            userId,
            totalScore,
            stressLevel,
            date: new Date(),
        };

        console.log('Test Result Saved:', testResult); // Debug log

        return h.response({
            message: 'Test submitted successfully!',
            data: testResult,
        }).code(200);
    } catch (error) {
        console.error('Error in submitTest:', error);
        return h.response({
            message: 'Failed to submit test',
            error: error.message,
        }).code(500);
    }
};

module.exports = { submitTest };
