const { Pool } = require('pg');
const properties = require('./json/properties.json');
const users = require('./json/users.json');

const pool = new Pool({
  user: 'vagrant',
  password: '123',
  database: 'light_bnb'
});

const getAllProperties = function(options, limit = 10) {
  // 1
  const queryParams = [];
  // 2
  let queryString = `
  SELECT properties.*, avg(property_reviews.rating) as average_rating
  FROM properties
  JOIN property_reviews ON properties.id = property_id
  `;

  // 3
  if (options.city) {
    queryParams.push(`%${options.city}%`);
    queryString += `WHERE city LIKE $${queryParams.length} `;
  }

  if (options.minimum_price_per_night) {
    queryParams.push(`${options.minimum_price_per_night}`)
    queryString += ` AND cost_per_night >= $${queryParams.length} * 100`
  }
  
  if (options.maximum_price_per_night) {
    queryParams.push(`${options.maximum_price_per_night}`)
    queryString +=` AND cost_per_night <= $${queryParams.length} * 100`
  }
  
  if (options.minimum_rating) {
    queryParams.push(`${options.minimum_rating}`);
    queryString += `
    GROUP BY properties.id
    HAVING AVG(property_reviews.rating) >= $${queryParams.length}`;
  } else {
    queryString += `
    GROUP BY properties.id`;
  }
  
  // 4
  queryParams.push(limit);
  queryString += `
  GROUP BY properties.id
  ORDER BY cost_per_night
  LIMIT $${queryParams.length};
  `;

  // 5
  console.log(queryString, queryParams);

  // 6
  return pool.query(queryString, queryParams)
  .then(res => res.rows);
};

const getUserWithEmail = function (email) {
  return pool.query(`
  SELECT * FROM users
  WHERE email = $1`, [email])
  .then(res => res.rows[0] || null);
};

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

const getAllReservations = function(guest_id, limit = 10) {
  return pool.query(`SELECT * FROM  reservations
  WHERE guest_id = $1
  LIMIT $2`, [guest_id, limit])
  .then(res => res.rows[0] || null);
};

module.exports = { getAllProperties, getUserWithEmail, getUserWithId, addUser, getAllReservations }


