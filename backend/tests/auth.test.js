process.env.JWT_SECRET = 'test-secret';

jest.mock('../src/config/database', () => ({
  execute: jest.fn()
}));

const request = require('supertest');
const bcrypt = require('bcryptjs');
const pool = require('../src/config/database');
const app = require('../src/index');

describe('Auth Routes', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('POST /api/auth/register should create a new user', async () => {
    pool.execute.mockResolvedValueOnce([{ insertId: 11 }]);

    const res = await request(app)
      .post('/api/auth/register')
      .send({
        email: 'new.member@rubygym.com',
        password: 'member123',
        full_name: 'New Member',
        phone: '0909999999'
      });

    expect(res.statusCode).toBe(201);
    expect(res.body.message).toBe('User registered');
    expect(res.body.userId).toBe(11);
    expect(pool.execute).toHaveBeenCalledWith(
      'INSERT INTO users (email, password_hash, full_name, phone, role) VALUES (?, ?, ?, ?, ?)',
      expect.arrayContaining(['new.member@rubygym.com', expect.any(String), 'New Member', '0909999999', 'MEMBER'])
    );
  });

  test('POST /api/auth/login should return token with valid credentials', async () => {
    const passwordHash = await bcrypt.hash('admin123', 10);
    pool.execute.mockResolvedValueOnce([[
      {
        id: 1,
        email: 'admin@rubygym.com',
        role: 'ADMIN',
        password_hash: passwordHash
      }
    ]]);

    const res = await request(app)
      .post('/api/auth/login')
      .send({ email: 'admin@rubygym.com', password: 'admin123' });

    expect(res.statusCode).toBe(200);
    expect(res.body.token).toBeDefined();
    expect(res.body.user.email).toBe('admin@rubygym.com');
    expect(res.body.user.role).toBe('ADMIN');
  });

  test('POST /api/auth/login should reject invalid credentials', async () => {
    pool.execute.mockResolvedValueOnce([[]]);

    const res = await request(app)
      .post('/api/auth/login')
      .send({ email: 'missing@rubygym.com', password: 'wrong' });

    expect(res.statusCode).toBe(401);
    expect(res.body.error).toBe('Invalid credentials');
  });
});
