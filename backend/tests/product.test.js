const request = require('supertest');
const app = require('../app');
const db = require('../src/config/db');

let adminToken;

beforeAll(async () => {
  // Register an admin user
  await request(app)
    .post('/auth/register')
    .send({
      username: 'adminuser',
      email: 'admin@example.com',
      password: 'AdminPass123',
      role: 'admin',
    });

  // Login as admin to get the token
  const res = await request(app)
    .post('/auth/login')
    .send({
      email: 'admin@example.com',
      password: 'AdminPass123',
    });
  adminToken = res.body.token;
});

afterAll(async () => {
  // Clean up the database
  await db.query('DELETE FROM products');
  await db.query('DELETE FROM users');
  await db.end();
});

describe('Product Endpoints', () => {
  describe('POST /products', () => {
    it('should allow admin to create a new product', async () => {
      const res = await request(app)
        .post('/products')
        .set('Authorization', `Bearer ${adminToken}`)
        .send({
          name: 'Test Product',
          description: 'This is a test product',
          price: 49.99,
          stock: 100,
          category: 'Testing',
        });
      expect(res.statusCode).toEqual(201);
      expect(res.body).toHaveProperty('message', 'Product created successfully.');
      expect(res.body.product).toHaveProperty('id');
      expect(res.body.product.name).toBe('Test Product');
    });

    it('should not allow non-admin users to create a product', async () => {
      // Register a regular user
      await request(app)
        .post('/auth/register')
        .send({
          username: 'regularuser',
          email: 'user@example.com',
          password: 'UserPass123',
          role: 'user',
        });

      // Login as regular user
      const loginRes = await request(app)
        .post('/auth/login')
        .send({
          email: 'user@example.com',
          password: 'UserPass123',
        });
      const userToken = loginRes.body.token;

      // Attempt to create a product
      const res = await request(app)
        .post('/products')
        .set('Authorization', `Bearer ${userToken}`)
        .send({
          name: 'Unauthorized Product',
          description: 'Should not be created',
          price: 19.99,
          stock: 50,
          category: 'Testing',
        });
      expect(res.statusCode).toEqual(403);
      expect(res.body).toHaveProperty('message', 'Access denied. Admins only.');
    });

    it('should validate input data', async () => {
      const res = await request(app)
        .post('/products')
        .set('Authorization', `Bearer ${adminToken}`)
        .send({
          name: '', // Invalid name
          price: -10, // Invalid price
          stock: -5, // Invalid stock
        });
      expect(res.statusCode).toEqual(400);
      expect(res.body).toHaveProperty('errors');
      expect(res.body.errors.length).toBeGreaterThan(0);
    });
  });
});





describe('GET /products', () => {
    beforeAll(async () => {
      // Insert sample products
      await db.query(
        'INSERT INTO products (name, description, price, stock, category) VALUES (?, ?, ?, ?, ?)',
        ['Product A', 'Description A', 29.99, 50, 'Category A']
      );
      await db.query(
        'INSERT INTO products (name, description, price, stock, category) VALUES (?, ?, ?, ?, ?)',
        ['Product B', 'Description B', 59.99, 20, 'Category B']
      );
    });
  
    it('should retrieve a list of products', async () => {
      const res = await request(app).get('/products');
      expect(res.statusCode).toEqual(200);
      expect(res.body).toHaveProperty('source'); // From cache or database
      expect(Array.isArray(res.body.data)).toBe(true);
      expect(res.body.data.length).toBeGreaterThanOrEqual(2);
    });
  
    it('should retrieve a specific product by ID', async () => {
      // Fetch all products to get an ID
      const allRes = await request(app).get('/products');
      const productId = allRes.body.data[0].id;
  
      const res = await request(app).get(`/products/${productId}`);
      expect(res.statusCode).toEqual(200);
      expect(res.body).toHaveProperty('id', productId);
      expect(res.body).toHaveProperty('name', 'Product A');
    });
  
    it('should return 404 for non-existent product ID', async () => {
      const res = await request(app).get('/products/9999');
      expect(res.statusCode).toEqual(404);
      expect(res.body).toHaveProperty('message', 'Product not found.');
    });
  });

  


  describe('PUT /products/:id', () => {
    let productId;
  
    beforeAll(async () => {
      // Insert a product to update
      const res = await db.query(
        'INSERT INTO products (name, description, price, stock, category) VALUES (?, ?, ?, ?, ?)',
        ['Product To Update', 'Initial Description', 39.99, 30, 'Category C']
      );
      productId = res[0].insertId;
    });
  
    it('should allow admin to update a product', async () => {
      const res = await request(app)
        .put(`/products/${productId}`)
        .set('Authorization', `Bearer ${adminToken}`)
        .send({
          name: 'Updated Product',
          price: 49.99,
        });
      expect(res.statusCode).toEqual(200);
      expect(res.body).toHaveProperty('message', 'Product updated successfully.');
  
      // Verify the update
      const getRes = await request(app).get(`/products/${productId}`);
      expect(getRes.body).toHaveProperty('name', 'Updated Product');
      expect(getRes.body).toHaveProperty('price', 49.99);
    });
  
    it('should not allow non-admin users to update a product', async () => {
      // Register and login as a regular user
      await request(app)
        .post('/auth/register')
        .send({
          username: 'updateuser',
          email: 'updateuser@example.com',
          password: 'UserPass123',
          role: 'user',
        });
  
      const loginRes = await request(app)
        .post('/auth/login')
        .send({
          email: 'updateuser@example.com',
          password: 'UserPass123',
        });
      const userToken = loginRes.body.token;
  
      // Attempt to update the product
      const res = await request(app)
        .put(`/products/${productId}`)
        .set('Authorization', `Bearer ${userToken}`)
        .send({
          name: 'Unauthorized Update',
        });
      expect(res.statusCode).toEqual(403);
      expect(res.body).toHaveProperty('message', 'Access denied. Admins only.');
    });
  
    it('should return 404 for updating non-existent product', async () => {
      const res = await request(app)
        .put('/products/9999')
        .set('Authorization', `Bearer ${adminToken}`)
        .send({
          name: 'Non-existent Product',
        });
      expect(res.statusCode).toEqual(404);
      expect(res.body).toHaveProperty('message', 'Product not found.');
    });
  
    it('should validate input data', async () => {
      const res = await request(app)
        .put(`/products/${productId}`)
        .set('Authorization', `Bearer ${adminToken}`)
        .send({
          price: -50, // Invalid price
        });
      expect(res.statusCode).toEqual(400);
      expect(res.body).toHaveProperty('errors');
      expect(res.body.errors.length).toBeGreaterThan(0);
    });
  });

  


  describe('DELETE /products/:id', () => {
    let productIdToDelete;
  
    beforeAll(async () => {
      // Insert a product to delete
      const res = await db.query(
        'INSERT INTO products (name, description, price, stock, category) VALUES (?, ?, ?, ?, ?)',
        ['Product To Delete', 'Description', 19.99, 10, 'Category D']
      );
      productIdToDelete = res[0].insertId;
    });
  
    it('should allow admin to delete a product', async () => {
      const res = await request(app)
        .delete(`/products/${productIdToDelete}`)
        .set('Authorization', `Bearer ${adminToken}`);
      expect(res.statusCode).toEqual(200);
      expect(res.body).toHaveProperty('message', 'Product deleted successfully.');
  
      // Verify deletion
      const getRes = await request(app).get(`/products/${productIdToDelete}`);
      expect(getRes.statusCode).toEqual(404);
      expect(getRes.body).toHaveProperty('message', 'Product not found.');
    });
  
    it('should not allow non-admin users to delete a product', async () => {
      // Register and login as a regular user
      await request(app)
        .post('/auth/register')
        .send({
          username: 'deleteuser',
          email: 'deleteuser@example.com',
          password: 'UserPass123',
          role: 'user',
        });
  
      const loginRes = await request(app)
        .post('/auth/login')
        .send({
          email: 'deleteuser@example.com',
          password: 'UserPass123',
        });
      const userToken = loginRes.body.token;
  
      // Insert another product to attempt deletion
      const insertRes = await db.query(
        'INSERT INTO products (name, description, price, stock, category) VALUES (?, ?, ?, ?, ?)',
        ['Another Product', 'Description', 29.99, 15, 'Category E']
      );
      const anotherProductId = insertRes[0].insertId;
  
      // Attempt to delete as a regular user
      const res = await request(app)
        .delete(`/products/${anotherProductId}`)
        .set('Authorization', `Bearer ${userToken}`);
      expect(res.statusCode).toEqual(403);
      expect(res.body).toHaveProperty('message', 'Access denied. Admins only.');
  
      // Clean up
      await db.query('DELETE FROM products WHERE id = ?', [anotherProductId]);
    });
  
    it('should return 404 for deleting non-existent product', async () => {
      const res = await request(app)
        .delete('/products/9999')
        .set('Authorization', `Bearer ${adminToken}`);
      expect(res.statusCode).toEqual(404);
      expect(res.body).toHaveProperty('message', 'Product not found.');
    });
  });
  