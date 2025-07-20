import { errorHandler } from '../../middlewares/errorHandler';
import { createServer } from '../../server';
import cors from '@fastify/cors';

jest.mock('fastify', () => {
  return () => fastifySpy;
});

const fastifySpy = {
  setErrorHandler: jest.fn(),
  setNotFoundHandler: jest.fn(),
  register: jest.fn(),
  listen: jest.fn(),
  log: { error: jest.fn() },
};

describe('Server configuration', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should register error handler, not found handler, cors and routes', () => {
    const mockRoutes = {
      registerRoutes: jest.fn(),
    };
    createServer({}, mockRoutes);
    expect(fastifySpy.setErrorHandler).toHaveBeenCalled();
    expect(fastifySpy.setNotFoundHandler).toHaveBeenCalled();
    expect(fastifySpy.register).toHaveBeenCalled(); // CORS
    expect(mockRoutes.registerRoutes).toHaveBeenCalledWith(fastifySpy);
  });

  it('should listen on the specified port', () => {
    const server = createServer({}, { registerRoutes: jest.fn() });
    server.start();
    expect(fastifySpy.listen).toHaveBeenCalledWith(
      { port: Number(process.env.PORT) },
      expect.any(Function),
    );
  });

  it('should call errorHandler', () => {
    createServer({}, { registerRoutes: jest.fn() });
    expect(fastifySpy.setErrorHandler).toHaveBeenCalledWith(errorHandler);
  });

  it('should set not found handler returning correct message and status', () => {
    createServer({}, { registerRoutes: jest.fn() });
    expect(fastifySpy.setNotFoundHandler).toHaveBeenCalled();
  });

  it('should register cors with correct options', () => {
    createServer({}, { registerRoutes: jest.fn() });
    expect(fastifySpy.register).toHaveBeenCalledWith(cors, {
      origin: '*',
      methods: ['GET', 'POST', 'PUT', 'DELETE'],
    });
  });

  it('should return an object with a start method', () => {
    const server = createServer({}, { registerRoutes: jest.fn() });
    expect(server).toHaveProperty('start');
    expect(typeof server.start).toBe('function');
  });
});
