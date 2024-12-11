const loadModel = require('../utils/loadModel'); // Pastikan path-nya benar
let model = null;

const submitTest = async (request, h) => {
    try {
        const { userId, answers } = request.payload;

        // Pastikan model sudah dimuat
        if (!model) {
            model = await loadModel();
        }

        // Proses input untuk model (convert answers ke tensor)
        const tf = require('@tensorflow/tfjs-node'); // Pastikan TensorFlow diimpor di sini
        const inputTensor = tf.tensor2d([answers], [1, answers.length]);

        // Prediksi menggunakan model
        const prediction = model.predict(inputTensor);
        const result = prediction.arraySync(); // Mendapatkan hasil prediksi

        // Skor total dan tingkat stres bisa dihitung berdasarkan output model
        const totalScore = answers.reduce((sum, score) => sum + score, 0);
        let stressLevel = '';
        if (totalScore < 10) {
            stressLevel = 'Low';
        } else if (totalScore >= 10 && totalScore < 20) {
            stressLevel = 'Moderate';
        } else {
            stressLevel = 'High';
        }

        // Simpan hasil tes ke database (simulasi)
        const testResult = {
            userId,
            totalScore,
            stressLevel,
            modelPrediction: result, // Menyertakan hasil dari model
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
