const express = require('express');
const { Sequelize, DataTypes } = require('sequelize');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;

// Initialize Sequelize
const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASS, {
  host: 'localhost',
  dialect: 'postgres'
});

// Define the User model
const Users = sequelize.define('Users', {
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  birthDate: {
    type: DataTypes.STRING,
    allowNull: false
  }
});

// Sync the database
sequelize.sync()
  .then(() => console.log('Database synced'))
  .catch((err) => console.error('Error syncing database:', err));

app.get('/', (req, res) => {
  res.send('Hello, world!');
});

app.get('/users', async (req, res) => {
  try {
    const users = await Users.findAll();
    console.log('All users:', JSON.stringify(users, null, 2));
    let userTable = '<table><tr><th>Name</th><th>Email</th><th>Birth Date</th></tr>';
    users.forEach(user => {
      userTable += `<tr><td>${user.name}</td><td>${user.email}</td><td>${user.birthDate}</td></tr>`;
    });
    userTable += '</table>';
    res.send(`
      <html>
        <head>
          <title>Users List</title>
        </head>
        <body>
          <h1>Users List</h1>
          ${userTable}
        </body>
      </html>
    `);
  } catch (err) {
    res.status(500).send('Failed to fetch users');
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
