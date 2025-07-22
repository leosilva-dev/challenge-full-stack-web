import { describe, expect, test, beforeAll, afterAll, beforeEach } from '@jest/globals';
import { createServer } from '../../server';
import { registerRoutes } from '../../routes';
import { prisma } from '../../lib/prisma';

const server = createServer({ logger: false }, { registerRoutes });

describe('Auth Routes', () => {
  beforeAll(async () => {});

  beforeEach(async () => {
    await prisma.user.deleteMany({});
  });

  afterAll(async () => {
    await prisma.user.deleteMany({});
    await prisma.$disconnect();
  });

  describe('POST /auth/register', () => {
    test('should register a new user successfully', async () => {
      const userData = {
        email: 'test@example.com',
        password: 'password123',
        name: 'Test User',
      };

      const response = await server.app.inject({
        method: 'POST',
        url: '/auth/register',
        payload: userData,
      });

      expect(response.statusCode).toBe(201);
      const result = JSON.parse(response.body);
      expect(result.success).toBe(true);
      expect(result.data.token).toBeDefined();
      expect(result.data.user.email).toBe(userData.email);
      expect(result.data.user.name).toBe(userData.name);
    });

    test('should fail with invalid email', async () => {
      const userData = {
        email: 'invalid-email',
        password: 'password123',
        name: 'Test User',
      };

      const response = await server.app.inject({
        method: 'POST',
        url: '/auth/register',
        payload: userData,
      });

      expect(response.statusCode).toBe(400);
    });

    test('should fail with short password', async () => {
      const userData = {
        email: 'test2@example.com',
        password: '123',
        name: 'Test User',
      };

      const response = await server.app.inject({
        method: 'POST',
        url: '/auth/register',
        payload: userData,
      });

      expect(response.statusCode).toBe(400);
    });
  });

  describe('POST /auth/login', () => {
    test('should login with valid credentials', async () => {
      const userData = {
        email: 'login-test@example.com',
        password: 'password123',
        name: 'Login Test User',
      };

      await server.app.inject({
        method: 'POST',
        url: '/auth/register',
        payload: userData,
      });

      const response = await server.app.inject({
        method: 'POST',
        url: '/auth/login',
        payload: {
          email: userData.email,
          password: userData.password,
        },
      });

      expect(response.statusCode).toBe(200);
      const result = JSON.parse(response.body);
      expect(result.success).toBe(true);
      expect(result.data.token).toBeDefined();
      expect(result.data.user.email).toBe(userData.email);
    });

    test('should fail with invalid credentials', async () => {
      const response = await server.app.inject({
        method: 'POST',
        url: '/auth/login',
        payload: {
          email: 'nonexistent@example.com',
          password: 'wrongpassword',
        },
      });

      expect(response.statusCode).toBe(401);
      const result = JSON.parse(response.body);
      expect(result.success).toBe(false);
    });
  });

  describe('GET /auth/me', () => {
    test('should return user data with valid token', async () => {
      const userData = {
        email: 'me-test@example.com',
        password: 'password123',
        name: 'Me Test User',
      };

      const registerResponse = await server.app.inject({
        method: 'POST',
        url: '/auth/register',
        payload: userData,
      });

      const { token } = JSON.parse(registerResponse.body).data;

      const response = await server.app.inject({
        method: 'GET',
        url: '/auth/me',
        headers: {
          authorization: `Bearer ${token}`,
        },
      });

      expect(response.statusCode).toBe(200);
      const result = JSON.parse(response.body);
      expect(result.success).toBe(true);
      expect(result.data.email).toBe(userData.email);
      expect(result.data.name).toBe(userData.name);
    });

    test('should fail without token', async () => {
      const response = await server.app.inject({
        method: 'GET',
        url: '/auth/me',
      });

      expect(response.statusCode).toBe(401);
      const result = JSON.parse(response.body);
      expect(result.success).toBe(false);
    });

    test('should fail with invalid token', async () => {
      const response = await server.app.inject({
        method: 'GET',
        url: '/auth/me',
        headers: {
          authorization: 'Bearer invalid-token',
        },
      });

      expect(response.statusCode).toBe(401);
      const result = JSON.parse(response.body);
      expect(result.success).toBe(false);
    });
  });
});
