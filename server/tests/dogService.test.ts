
import { describe, it, expect, vi, afterEach } from 'vitest';
import { getRandomDogImage } from '../services/dogService';

describe('dogService', () => {
  afterEach(() => {
    vi.unstubAllGlobals();
  });

 
  it('should return dog image URL and success status', async () => {
    const mockData = {
      message: 'https://images.dog.ceo/breeds/hound/example.jpg',
      status: 'success'
    };

    const mockFetch = vi.fn().mockResolvedValue({
      ok: true,
      status: 200,
      json: async () => mockData
    });

    vi.stubGlobal('fetch', mockFetch);

    const result = await getRandomDogImage();

    expect(result.imageUrl).toBe(mockData.message);
    expect(result.status).toBe('success');
    expect(mockFetch).toHaveBeenCalledOnce();
  });

  
  it('should throw an error when API returns status 500', async () => {
    const mockFetch = vi.fn().mockResolvedValue({
      ok: false,
      status: 500
    });

    vi.stubGlobal('fetch', mockFetch);

    await expect(getRandomDogImage()).rejects.toThrow(
      'Failed to fetch dog image: Dog API returned status 500'
    );
  });
});
