
import { describe, it, expect, vi, beforeEach } from 'vitest';
import express from 'express';
import request from 'supertest';
import dogRoutes from '../routes/dogRoutes';
import { getDogImage } from '../controllers/dogController';

vi.mock('../controllers/dogController', () => ({
  getDogImage: vi.fn()
}));

describe('dogRoutes', () => {
  const app = express();

  app.use('/api/dogs', dogRoutes);

  beforeEach(() => {
    vi.clearAllMocks();
  });

 
  it('should return status 200 and dog image', async () => {
    const mockImageUrl =
      'https://images.dog.ceo/breeds/hound/example.jpg';

    vi.mocked(getDogImage).mockImplementation(async (_req, res) => {
      res.status(200).json({
        success: true,
        data: {
          imageUrl: mockImageUrl,
          status: 'success'
        }
      });
    });

    const response = await request(app)
      .get('/api/dogs/random');

    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);
    expect(response.body.data.imageUrl).toBe(mockImageUrl);
  });


  it('should return status 500 and error message', async () => {
    const mockError =
      'Failed to fetch dog image: Network error';

    vi.mocked(getDogImage).mockImplementation(async (_req, res) => {
      res.status(500).json({
        success: false,
        error: mockError
      });
    });

    const response = await request(app)
      .get('/api/dogs/random');

    expect(response.status).toBe(500);
    expect(response.body.error).toBe(mockError);
  });
});
