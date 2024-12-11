const tf = require('@tensorflow/tfjs-node');

async function loadModel() {
    const modelPath = process.env.MODEL_URL; // Pastikan variabel ini diatur dengan benar
    console.log(`Trying to load model from: ${modelPath}`);

    try {
        const model = await tf.loadGraphModel(modelPath);
        console.log('Model loaded successfully!');
        return model;
    } catch (error) {
        console.error('Error loading model:', error);
        throw error;
    }
}

module.exports = loadModel;
