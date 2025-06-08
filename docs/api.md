# EqDeckBuilder API Documentation

This document defines the usage pattern and design rationale for the `EqDeckBuilder` and `Sp` APIs, used to construct structured EQS slides.

---

## Overview

`EqDeckBuilder` constructs a timeline of `eq` entries, each of which may optionally include a sidePanel (`sp`) containing supporting components. The builder manages:

* Global and per-line SP injection
* Sequential `startTime` / `endTime` calculation
* Clear data separation (eq vs sp)
* Clean, flat output format suitable for any renderer

The `Sp` class helps construct structured SP component arrays with a builder-style API.

---

## EqDeckBuilder Class

### `new EqDeckBuilder()`

Initializes an empty deck.

### `.setGlobalSp(spArray)`

Sets the fallback `sp` to be used for any `eq` that doesn't define its own.

### `.title(endTime: number, content: string)`

Adds an EQ line of type `"title"` with `content` and `endTime`. Uses global SP.

### `.heading(endTime: number, content: string)`

Adds an EQ line of type `"heading"`. Uses global SP.

### `.text(endTime: number, content: string)`

Adds an EQ line of type `"text"`. Uses global SP.

### `.math(endTime: number, latex: string)`

Adds an EQ line of type `"math"`. Uses global SP.

### `.setSp(spArray: SpComponent[] | [])`

Assigns or overrides the `sp` for the **most recently added EQ**.

* Pass `[]` to **suppress SP** for that line
* Should be called **after** an `eq` method

### `.build()`

Returns the full slide structure:

```js
{
  slide: [
    { startTime, endTime, type, content, sp },
    ...
  ],
  defaultSp
}
```

---

## Sp Class (Builder)

### `new Sp()`

Initializes an empty SP array.

### `.title(text: string)`

Adds a `title` SP component.

### `.text(text: string)`

Adds a `text` SP component.

### `.math(latex: string)`

Adds a `math` SP component.

### `.table(rows: string[][])`

Adds a `table` SP component.

### `.image(src: string, alt?: string)`

Adds an `image` SP component.

### `.code(language: string, code: string)`

Adds a `code` SP component.

### `.tableCode(rows: string[][])`

Adds a `tableCode` SP component.

### `.getComponents(): SpComponent[]`

Returns the built component array for use in `.setSp()`.

---

## Design Requirements (Before Coding)

Before implementation, the following must be clear:

1. **Output Format**

   * Confirmed: flat array of `eq` entries, each with start/end and optional SP

2. **Theme Separation**

   * Confirmed: no styling inside `eq` or `sp`; rendering is theme-driven

3. **Timing Model**

   * Confirmed: only `endTime` provided by user; `startTime` is derived

4. **SP Application Model**

   * Confirmed: global SP fallback, per-line override, and opt-out via `[]`

5. **SP Component Vocabulary**

   * Locked: `title`, `text`, `math`, `table`, `image`, `code`, `tableCode`

6. **Validation Expectations**

   * SP components must be treated as opaque objects; rendering layer does validation

---

## Summary

This API enables clean, controlled, time-sequenced slide construction for EQS content. With builder patterns, semantic separation, and future-proof SP structures, it sets a solid foundation for authoring, rendering, and tooling around structured educational content.
