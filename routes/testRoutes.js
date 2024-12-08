const Joi = require('joi');
const TestController = require('../controllers/testController');
console.log('Loading testController...');

console.log('testController loaded successfully.');


module.exports = [
    {
        method: 'POST',
        path: '/mental-health-test',
        handler: TestController.submitTest,
        options: {
            validate: {
                payload: Joi.object({
                    userId: Joi.string().required(),
                    answers: Joi.array().items(Joi.number().required()).required(),
                }),
            },
        },
    },
];
