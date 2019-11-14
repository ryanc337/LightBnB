const { Pool } = require('pg');
const properties = require('./json/properties.json');
const users = require('./json/users.json');

const pool = new Pool({
  user: 'vagrant',
  password: '123',
  database: 'light_bnb'
});

const getAllProperties = function(options, limit = 10) {
  return pool.query(`
  SELECT * FROM properties
  LIMIT $1
  `, [limit])
  .then(res => res.rows);
};

const getUserWithEmail = function (email) {
  return pool.query(`
  SELECT * FROM users
  WHERE email = $1`, [email])
  .then(res => res.rows[0] || null);
}

const getUserWithId = function (id) {
  return pool.query(`SELECT * FROM users
  WHERE id = $1`, [id])
  .then(res => res.rows[0] || null);
};

const addUser = function (user) {
  return pool.query(`INSERT INTO users (name, email, password) 
  VALUES ($1, $2, $3)
  RETURNING *`, [user.name, user.email, user.password])
  .then(res => res.rows[0] || null);
};

module.exports = { getAllProperties, getUserWithEmail, getUserWithId, addUser }


