const request = require('supertest');
const express = require('express');
const { Sequelize } = require('sequelize');
const { Users } = require('../models'); // Adjust the path as needed

const app = express();
app.use(express.json());

// Initialize Sequelize for the test environment
const sequelize = new Sequelize('sqlite::memory:');


// Route to get all users
app.get('/users', async (req, res) => {
  try {
    const users = await Users.findAll();
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch users' });
  }
});

describe('GET /users', () => {

  // Sync the database
  beforeAll(async () => {
    await sequelize.sync({ force: true });
    await Users.create({ name: 'John Doe', email: 'john@example.com', birthDate: '1990-01-01' });
  });

  it('should return a list of users', async () => {
    const res = await request(app).get('/users');
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveLength(1);
    expect(res.body[0]).toHaveProperty('name', 'John Doe');
    expect(res.body[0]).toHaveProperty('email', 'john@example.com');
    expect(res.body[0]).toHaveProperty('birthDate', '1990-01-01');
  });

  afterAll(async () => {
    await sequelize.close();
  });
});
