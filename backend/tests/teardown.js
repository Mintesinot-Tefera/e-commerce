const db = require('../src/config/db');

module.exports = async () => {
  await db.query('DROP TABLE IF EXISTS order_items');
  await db.query('DROP TABLE IF EXISTS orders');
  await db.query('DROP TABLE IF EXISTS products');
  await db.query('DROP TABLE IF EXISTS users');
  await db.end();
};
