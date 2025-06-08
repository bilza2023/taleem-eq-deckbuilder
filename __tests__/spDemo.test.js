// tests/spDemo.test.js
import { describe, it, expect } from 'vitest';
import spDemo from '../examples/sp-demo.js';

describe('spDemo deck', () => {
  it('has 10 slides', () => {
    expect(spDemo.slide.length).toBe(12);
  });

  it('each slide has increasing start and end times', () => {
    let lastEnd = -1;
    for (const slide of spDemo.slide) {
      expect(slide.startTime).toBeGreaterThanOrEqual(lastEnd);
      expect(slide.endTime).toBeGreaterThan(slide.startTime);
      lastEnd = slide.endTime;
    }
  });

  it('contains various SP types', () => {
    const types = new Set();
    for (const slide of spDemo.slide) {
      if (Array.isArray(slide.sp)) {
        for (const comp of slide.sp) {
          types.add(comp.type);
        }
      }
    }

    expect(types).toEqual(new Set([
      "title", "image", "text", "math", "table", "tableCode"
    ]));
  });
});
