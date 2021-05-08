require('dotenv').config();

module.exports = {
    assignment: {
      name: 'assignment',
      host: process.env.DB_HOST,
      port: 3306,
      database: 'calendar',
      user: process.env.DB_ADMIN,
      password: process.env.DB_PASS,
      connector: 'mysql',
      connectionLimit: 250,
      charset: 'utf8mb4',
      collation: 'utf8mb4_unicode_ci',
    }
}