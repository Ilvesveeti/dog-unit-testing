
import { describe, it, expect, vi } from 'vitest';
import type { Request, Response } from 'express';
import { getDogImage } from '../controllers/dogController';
import { getRandomDogImage } from '../services/dogService';

vi.mock('../services/dogService', () => ({
  getRandomDogImage: vi.fn()
}));

describe('dogController', () => {
  it('should return success true and mocked dog data', async () => {
    const mockDogData = {
      imageUrl: 'https://images.dog.ceo/breeds/hound/example.jpg',
      status: 'success'
    };

    vi.mocked(getRandomDogImage).mockResolvedValue(mockDogData);

    const req = {} as Request;

    const res = {
      json: vi.fn(),
      status: vi.fn().mockReturnThis()
    } as unknown as Response;

    await getDogImage(req, res);

    expect(res.json).toHaveBeenCalledWith({
      success: true,
      data: mockDogData
    });
  });
});
