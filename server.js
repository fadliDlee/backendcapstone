require('dotenv').config();
const Hapi = require('@hapi/hapi');
const { register, login } = require('./controllers/authController');
const { submitTest } = require('./controllers/testController');
const { getTestHistory, saveTestHistory } = require('./controllers/historyController');

// Inisialisasi server Hapi
const init = async () => {
    const server = Hapi.server({
        port: process.env.PORT || 3002,
        host: process.env.HOST || 'localhost',
    });

    // Debugging: Cek apakah routes sudah benar
    console.log('Auth Routes:', register, login);
    console.log('Test Routes:', submitTest);
    console.log('History Routes:', { getTestHistory, saveTestHistory });

    // Register all routes
    server.route([
        ...require('./routes/authRoutes'),
        ...require('./routes/testRoutes'),
        ...require('./routes/historyRoutes')
    ]);

    await server.start();
    console.log(`Server running on ${server.info.uri}`);
};

// Error handling untuk unhandled rejection
process.on('unhandledRejection', (err) => {
    console.log(err);
    process.exit(1);
});

// Menjalankan server
init();
