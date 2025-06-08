// tests/EqDeckBuilder.test.js
import { describe, it, expect } from 'vitest';
import { EqDeckBuilder } from '../src/EqDeckBuilder.js';
import { Sp } from '../src/Sp.js';

describe('EqDeckBuilder', () => {
  it('builds a sequence of EQs with timing', () => {
    const deck = new EqDeckBuilder();
    deck.title(4, "Intro");
    deck.math(8, "x + y = z");

    const result = deck.build();
    expect(result.slide.length).toBe(2);
    expect(result.slide[0]).toMatchObject({ startTime: 0, endTime: 4, type: 'title' });
    expect(result.slide[1]).toMatchObject({ startTime: 4, endTime: 8, type: 'math' });
  });

  it('applies global SP if no per-line SP given', () => {
    const deck = new EqDeckBuilder();
    const globalSp = new Sp().text("Global info").getComponents();
    deck.setGlobalSp(globalSp);
    deck.text(5, "Global applied");

    const built = deck.build();
    expect(built.slide[0].sp).toEqual(globalSp);
  });

  it('overrides SP per line', () => {
    const deck = new EqDeckBuilder();
    const sp = new Sp().text("Line-specific").getComponents();
    deck.text(6, "Line");
    deck.setSp(sp);

    const built = deck.build();
    expect(built.slide[0].sp).toEqual(sp);
  });

  it('suppresses SP if empty array is used', () => {
    const deck = new EqDeckBuilder();
    const globalSp = new Sp().text("Global").getComponents();
    deck.setGlobalSp(globalSp);
    deck.text(3, "Hide SP");
    deck.setSp([]); // Explicit suppression

    const built = deck.build();
    expect(built.slide[0].sp).toEqual([]);
  });
});
