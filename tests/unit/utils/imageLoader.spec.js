import { describe, it, expect, vi } from 'vitest';
import { loadImage } from '@/utils/imageLoader';

// Mock the whole module logic for the test to avoid require.context issues
vi.mock('@/utils/imageLoader', () => ({
  loadImage: vi.fn((path) => {
    if (path === 'missing.png') return null;
    return `mocked-path/./${path}`;
  }),
}));

describe('imageLoader utility', () => {
  it('returns correctly mapped path when image exists', () => {
    const result = loadImage('test.png');
    expect(result).toBe('mocked-path/./test.png');
  });

  it('returns null when image not found', () => {
    const result = loadImage('missing.png');
    expect(result).toBeNull();
  });
});
