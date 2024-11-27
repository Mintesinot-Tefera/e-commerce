const request = require('supertest');
const app = require('../app'); 
const db = require('../src/config/db');

describe('Auth Endpoints', () => {
  afterAll(async () => {
    // Clean up the database after all tests
    await db.query('DELETE FROM users');
    await db.end();
  });

  describe('POST /auth/register', () => {
    it('should register a new user', async () => {
      const res = await request(app)
        .post('/auth/register')
        .send({
          username: 'testuser',
          email: 'testuser@example.com',
          password: 'Password123',
          role: 'user',
        });
      expect(res.statusCode).toEqual(201);
      expect(res.body).toHaveProperty('message', 'User registered successfully.');
    });

    it('should not register a user with existing email', async () => {
      // First registration
      await request(app)
        .post('/auth/register')
        .send({
          username: 'testuser1',
          email: 'duplicate@example.com',
          password: 'Password123',
          role: 'user',
        });

      // Attempt to register again with the same email
      const res = await request(app)
        .post('/auth/register')
        .send({
          username: 'testuser2',
          email: 'duplicate@example.com',
          password: 'Password123',
          role: 'user',
        });
      expect(res.statusCode).toEqual(400);
      expect(res.body).toHaveProperty('message', 'User already exists.');
    });

    it('should validate input data', async () => {
      const res = await request(app)
        .post('/auth/register')
        .send({
          username: '', // Invalid username
          email: 'invalidemail', // Invalid email
          password: 'short', // Invalid password
        });
      expect(res.statusCode).toEqual(400);
      expect(res.body).toHaveProperty('errors');
      expect(res.body.errors.length).toBeGreaterThan(0);
    });
  });
});



describe('POST /auth/login', () => {
    beforeAll(async () => {
      // Register a user to login
      await request(app)
        .post('/auth/register')
        .send({
          username: 'loginuser',
          email: 'loginuser@example.com',
          password: 'Password123',
          role: 'user',
        });
    });
  
    it('should authenticate user and return JWT token', async () => {
      const res = await request(app)
        .post('/auth/login')
        .send({
          email: 'loginuser@example.com',
          password: 'Password123',
        });
      expect(res.statusCode).toEqual(200);
      expect(res.body).toHaveProperty('token');
      expect(typeof res.body.token).toBe('string');
    });
  
    it('should not authenticate with incorrect password', async () => {
      const res = await request(app)
        .post('/auth/login')
        .send({
          email: 'loginuser@example.com',
          password: 'WrongPassword',
        });
      expect(res.statusCode).toEqual(400);
      expect(res.body).toHaveProperty('message', 'Invalid credentials.');
    });
  
    it('should not authenticate non-existent user', async () => {
      const res = await request(app)
        .post('/auth/login')
        .send({
          email: 'nonexistent@example.com',
          password: 'Password123',
        });
      expect(res.statusCode).toEqual(400);
      expect(res.body).toHaveProperty('message', 'Invalid credentials.');
    });
  
    it('should validate input data', async () => {
      const res = await request(app)
        .post('/auth/login')
        .send({
          email: 'invalidemail',
          password: '',
        });
      expect(res.statusCode).toEqual(400);
      expect(res.body).toHaveProperty('errors');
      expect(res.body.errors.length).toBeGreaterThan(0);
    });
  });
  