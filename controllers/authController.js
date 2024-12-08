const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const users = []; // Simulasi database (gunakan database sebenarnya untuk produksi)

const register = async (request, h) => {
    const { username, password, email } = request.payload;

    const hashedPassword = await bcrypt.hash(password, 10);
    users.push({ username, email, password: hashedPassword });

    return h.response({ message: 'User registered successfully' }).code(201);
};

const login = async (request, h) => {
    const { email, password } = request.payload;

    const user = users.find((u) => u.email === email);
    if (!user) return h.response({ error: 'Invalid email or password' }).code(401);

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) return h.response({ error: 'Invalid email or password' }).code(401);

    const token = jwt.sign({ email }, process.env.JWT_SECRET, { expiresIn: '1h' });
    return h.response({ message: 'Login successful', token });
};

module.exports = { register, login };
