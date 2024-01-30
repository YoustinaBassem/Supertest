const request = require('supertest');
const app = require('mock-user-auth'); 

describe('API Routes Test Suite', () => {
    it('AUTHENTICATE USER - Valid Request', async () => {
        const response = await request(app)
            .post('/api/v1/auth')
            .send({ username: 'validUser', password: 'validPassword' });
        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('token');
    });

    it('CREATE USER - Valid Request', async () => {
        const response = await request(app)
            .post('/api/v1/users')
            .send({ username: 'newUser', password: 'password123' });
        expect(response.status).toBe(201);
        expect(response.body).toHaveProperty('username', 'newUser');
    });

    it('GET USER - Auth - Valid Request', async () => {
        const loginResponse = await request(app)
            .post('/api/v1/auth')
            .send({ username: 'validUser', password: 'validPassword' });

        const token = loginResponse.body.token;

        const response = await request(app)
            .get('/api/v1/users')
            .set('Authorization', `Bearer ${token}`);

        expect(response.status).toBe(200);
    });

    it('PATCH USER - Auth - Valid Request', async () => {
        const loginResponse = await request(app)
            .post('/api/v1/auth')
            .send({ username: 'validUser', password: 'validPassword' });

        const token = loginResponse.body.token;

        const response = await request(app)
            .patch('/api/v1/users')
            .set('Authorization', `Bearer ${token}`)
            .send({ email: 'newemail@example.com' });

        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('message', 'User updated successfully');
    });

    it('DELETE USER - Auth - Valid Request', async () => {
        const loginResponse = await request(app)
            .post('/api/v1/auth')
            .send({ username: 'validUser', password: 'validPassword' });

        const token = loginResponse.body.token;

        const response = await request(app)
            .delete('/api/v1/users')
            .set('Authorization', `Bearer ${token}`);

        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('message', 'User deleted successfully');
    });

    it('DELETE ALL USERS - Valid Request', async () => {
        const response = await request(app)
            .delete('/api/v1/users');

        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('message', 'All users deleted successfully');
    });
});
