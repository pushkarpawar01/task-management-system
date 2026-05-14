const axios = require('axios');

async function test() {
    try {
        console.log('Testing GET /api/auth/user (should be 401)...');
        await axios.get('http://127.0.0.1:5000/api/auth/user');
    } catch (err) {
        console.log('GET /api/auth/user status:', err.response?.status);
    }

    try {
        console.log('Testing POST /api/auth/login (should be 400 or 200, but not 404)...');
        await axios.post('http://127.0.0.1:5000/api/auth/login', { email: 'test@test.com', password: 'test' });
    } catch (err) {
        console.log('POST /api/auth/login status:', err.response?.status);
        if (err.response?.status === 404) {
            console.log('ERROR: 404 on /api/auth/login!');
        }
    }
}

test();
