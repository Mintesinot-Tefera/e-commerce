const request = require('supertest');
const app = require('../app');
const db = require('../src/config/db');

let userToken;
let adminToken;
let productId1;
let productId2;

beforeAll(async () => {
  // Register an admin user
  await request(app)
    .post('/auth/register')
    .send({
      username: 'adminorder',
      email: 'adminorder@example.com',
      password: 'AdminPass123',
      role: 'admin',
    });

  // Login as admin to get the token
  const adminLoginRes = await request(app)
    .post('/auth/login')
    .send({
      email: 'adminorder@example.com',
      password: 'AdminPass123',
    });
  adminToken = adminLoginRes.body.token;

  // Register a regular user
  await request(app)
    .post('/auth/register')
    .send({
      username: 'userorder',
      email: 'userorder@example.com',
      password: 'UserPass123',
      role: 'user',
    });

  // Login as user to get the token
  const userLoginRes = await request(app)
    .post('/auth/login')
    .send({
      email: 'userorder@example.com',
      password: 'UserPass123',
    });
  userToken = userLoginRes.body.token;

  // Insert sample products
  const res1 = await db.query(
    'INSERT INTO products (name, description, price, stock, category) VALUES (?, ?, ?, ?, ?)',
    ['Order Product A', 'Description A', 10.0, 100, 'Category A']
  );
  productId1 = res1[0].insertId;

  const res2 = await db.query(
    'INSERT INTO products (name, description, price, stock, category) VALUES (?, ?, ?, ?, ?)',
    ['Order Product B', 'Description B', 20.0, 50, 'Category B']
  );
  productId2 = res2[0].insertId;
});

afterAll(async () => {
  // Clean up the database
  await db.query('DELETE FROM order_items');
  await db.query('DELETE FROM orders');
  await db.query('DELETE FROM products');
  await db.query('DELETE FROM users');
  await db.end();
});

describe('Order Endpoints', () => {
  describe('POST /orders', () => {
    it('should allow user to place an order', async () => {
      const res = await request(app)
        .post('/orders')
        .set('Authorization', `Bearer ${userToken}`)
        .send({
          products: [
            { product_id: productId1, quantity: 2 },
            { product_id: productId2, quantity: 1 },
          ],
        });
      expect(res.statusCode).toEqual(201);
      expect(res.body).toHaveProperty('message', 'Order placed successfully.');
      expect(res.body).toHaveProperty('order_id');
    });

    it('should not allow placing an order with insufficient stock', async () => {
      const res = await request(app)
        .post('/orders')
        .set('Authorization', `Bearer ${userToken}`)
        .send({
          products: [
            { product_id: productId1, quantity: 1000 }, // Exceeds stock
          ],
        });
      expect(res.statusCode).toEqual(400);
      expect(res.body).toHaveProperty('message');
      expect(res.body.message).toMatch(/Insufficient stock/);
    });

    it('should not allow unauthenticated users to place an order', async () => {
      const res = await request(app)
        .post('/orders')
        .send({
          products: [
            { product_id: productId1, quantity: 1 },
          ],
        });
      expect(res.statusCode).toEqual(401);
      expect(res.body).toHaveProperty('message', 'Authorization token not provided.');
    });

    it('should validate input data', async () => {
      const res = await request(app)
        .post('/orders')
        .set('Authorization', `Bearer ${userToken}`)
        .send({
          products: [
            { product_id: 'invalid', quantity: -1 }, // Invalid data
          ],
        });
      expect(res.statusCode).toEqual(400);
      expect(res.body).toHaveProperty('errors');
      expect(res.body.errors.length).toBeGreaterThan(0);
    });
  });
});



describe('GET /orders', () => {
    let orderId;
  
    beforeAll(async () => {
      // Place an order to retrieve
      const res = await request(app)
        .post('/orders')
        .set('Authorization', `Bearer ${userToken}`)
        .send({
          products: [
            { product_id: productId1, quantity: 3 },
          ],
        });
      orderId = res.body.order_id;
    });
  
    it('should retrieve a list of orders for the authenticated user', async () => {
      const res = await request(app)
        .get('/orders')
        .set('Authorization', `Bearer ${userToken}`);
      expect(res.statusCode).toEqual(200);
      expect(Array.isArray(res.body)).toBe(true);
      expect(res.body.length).toBeGreaterThanOrEqual(1);
      expect(res.body[0]).toHaveProperty('id', orderId);
    });
  
    it('should not allow unauthenticated users to retrieve orders', async () => {
      const res = await request(app).get('/orders');
      expect(res.statusCode).toEqual(401);
      expect(res.body).toHaveProperty('message', 'Authorization token not provided.');
    });
  });

  

  describe('GET /orders/:id', () => {
    it('should retrieve details of a specific order', async () => {
      const res = await request(app)
        .get(`/orders/${orderId}`)
        .set('Authorization', `Bearer ${userToken}`);
      expect(res.statusCode).toEqual(200);
      expect(res.body).toHaveProperty('id', orderId);
      expect(res.body).toHaveProperty('user_id');
      expect(res.body).toHaveProperty('total_price');
      expect(res.body).toHaveProperty('items');
      expect(Array.isArray(res.body.items)).toBe(true);
      expect(res.body.items.length).toBeGreaterThanOrEqual(1);
    });
  
    it('should not allow users to access orders of other users', async () => {
      // Register and login as another user
      await request(app)
        .post('/auth/register')
        .send({
          username: 'otheruser',
          email: 'otheruser@example.com',
          password: 'OtherPass123',
          role: 'user',
        });
  
      const loginRes = await request(app)
        .post('/auth/login')
        .send({
          email: 'otheruser@example.com',
          password: 'OtherPass123',
        });
      const otherUserToken = loginRes.body.token;
  
      // Attempt to access the original user's order
      const res = await request(app)
        .get(`/orders/${orderId}`)
        .set('Authorization', `Bearer ${otherUserToken}`);
      expect(res.statusCode).toEqual(403);
      expect(res.body).toHaveProperty('message', 'Access denied. You do not own this order.');
    });
  
    it('should return 404 for non-existent order ID', async () => {
      const res = await request(app)
        .get('/orders/9999')
        .set('Authorization', `Bearer ${userToken}`);
      expect(res.statusCode).toEqual(404);
      expect(res.body).toHaveProperty('message', 'Order not found.');
    });
  });
  