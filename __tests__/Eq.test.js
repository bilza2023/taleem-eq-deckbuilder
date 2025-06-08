// tests/Eq.test.js
import { describe, it, expect } from 'vitest';
import { Eq } from '../src/Eq.js';

describe('Eq class', () => {
  it('creates an Eq without SP', () => {
    const eq = new Eq(0, 5, 'math', 'x + y');
    expect(eq).toEqual({
      startTime: 0,
      endTime: 5,
      type: 'math',
      content: 'x + y'
    });
  });

  it('creates an Eq with SP', () => {
    const sp = [{ type: 'text', data: { text: 'Explanation' } }];
    const eq = new Eq(5, 10, 'text', 'This is text', sp);
    expect(eq).toEqual({
      startTime: 5,
      endTime: 10,
      type: 'text',
      content: 'This is text',
      sp
    });
  });
});
