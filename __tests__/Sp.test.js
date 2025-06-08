// tests/Sp.test.js
import { describe, it, expect } from 'vitest';
import { Sp } from '../src/Sp.js';

describe('Sp builder', () => {
  it('builds SP with title and math', () => {
    const sp = new Sp()
      .title("Energy")
      .math("E = mc^2")
      .getComponents();

    expect(sp).toEqual([
      { type: "title", data: { text: "Energy" } },
      { type: "math", data: { latex: "E = mc^2" } }
    ]);
  });

  it('builds SP with table and code', () => {
    const sp = new Sp()
      .table([["A", "B"]])
      .code("js", "console.log('Hi')")
      .getComponents();

    expect(sp).toEqual([
      { type: "table", data: { rows: [["A", "B"]] } },
      { type: "code", data: { language: "js", code: "console.log('Hi')" } }
    ]);
  });
});
