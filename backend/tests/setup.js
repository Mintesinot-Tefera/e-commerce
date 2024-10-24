const db = require('../src/config/db');
const fs = require('fs');
const path = require('path');

module.exports = async () => {
  const schema = fs.readFileSync(path.join(__dirname, 'schema.sql'), 'utf-8');
  await db.query(schema);
};
