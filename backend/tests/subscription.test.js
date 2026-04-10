process.env.JWT_SECRET = 'test-secret';

jest.mock('../src/config/database', () => ({
  execute: jest.fn()
}));

const request = require('supertest');
const jwt = require('jsonwebtoken');
const pool = require('../src/config/database');
const app = require('../src/index');

const createToken = (payload) => jwt.sign(payload, process.env.JWT_SECRET);

describe('Subscription Routes', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('POST /api/subscriptions should apply loyalty and referral bonus months', async () => {
    const token = createToken({ id: 25, role: 'MEMBER', email: 'member@rubygym.com' });

    pool.execute
      .mockResolvedValueOnce([[{ id: 5 }]])
      .mockResolvedValueOnce([[{ id: 5, join_date: '2024-01-01', is_loyal: 0 }]])
      .mockResolvedValueOnce([{}])
      .mockResolvedValueOnce([[{ total_referrals: 2 }]])
      .mockResolvedValueOnce([{ insertId: 9 }]);

    const res = await request(app)
      .post('/api/subscriptions')
      .set('Authorization', `Bearer ${token}`)
      .send({
        member_id: 5,
        plan_type: 'ANNUAL',
        start_date: '2026-04-01'
      });

    expect(res.statusCode).toBe(201);
    expect(res.body.subscriptionId).toBe(9);
    expect(res.body.is_loyal).toBe(true);
    expect(res.body.free_extension_months).toBe(5);
    expect(res.body.end_date).toBe('2027-09-01');
  });

  test('PUT /api/subscriptions/:id should recalculate end date on update', async () => {
    const token = createToken({ id: 1, role: 'ADMIN', email: 'admin@rubygym.com' });

    pool.execute
      .mockResolvedValueOnce([[{
        id: 3,
        member_id: 8,
        plan_type: 'QUARTERLY',
        start_date: '2026-04-01',
        status: 'ACTIVE'
      }]])
      .mockResolvedValueOnce([[{ id: 8, join_date: '2025-09-01', is_loyal: 0 }]])
      .mockResolvedValueOnce([[{ total_referrals: 1 }]])
      .mockResolvedValueOnce([{}]);

    const res = await request(app)
      .put('/api/subscriptions/3')
      .set('Authorization', `Bearer ${token}`)
      .send({
        plan_type: 'SEMI_ANNUAL',
        start_date: '2026-04-01'
      });

    expect(res.statusCode).toBe(200);
    expect(res.body.free_extension_months).toBe(1);
    expect(res.body.end_date).toBe('2026-11-01');
  });

  test('POST /api/subscriptions should reject member creating subscription for another member', async () => {
    const token = createToken({ id: 25, role: 'MEMBER', email: 'member@rubygym.com' });
    pool.execute.mockResolvedValueOnce([[{ id: 5 }]]);

    const res = await request(app)
      .post('/api/subscriptions')
      .set('Authorization', `Bearer ${token}`)
      .send({
        member_id: 6,
        plan_type: 'QUARTERLY',
        start_date: '2026-04-01'
      });

    expect(res.statusCode).toBe(403);
    expect(res.body.error).toBe('Access denied');
  });
});
