# EQS DeckBuilder Design Document

This document captures the complete architecture, reasoning, and data structures behind the `EQS DeckBuilder` system. It formalizes decisions taken to support the line-by-line presentation of mathematical and instructional content using a consistent and clean data format.

---

## 1. Purpose

The EQS DeckBuilder constructs slide-like presentations composed of `eq` items (equation lines), optionally enhanced with supporting visual information via a `sidePanel` (abbreviated `sp`). This system outputs a clean timeline-oriented JSON structure that is easy to render, inspect, and extend.

---

## 2. Slide and EQ Model

### Slide Structure

```js
const slide = [eq, eq, eq, ...];
```

Each `eq` item represents one visual line in the presentation, rendered sequentially by timing.

### EQ Object

```js
const eq = {
  startTime: Number,    // calculated by builder
  endTime: Number,      // provided by user
  type: "heading" | "math" | "text",
  content: String,
  sp: [spComponent] | [] | undefined
};
```

* `type` is semantic only; rendering is handled by the theme.
* `sp` is optional. If `sp` is undefined, the default global sidePanel is applied. If `sp` is an empty array `[]`, it explicitly suppresses any sidePanel.

---

## 3. SidePanel (`sp`) Logic

### Rationale for Every EQ Having an SP Slot

* Ensures a consistent 80/20 horizontal layout (80% for `eq`, 20% for `sp`)
* Prevents jarring realignments when switching between full-width and split-mode
* Reinforces the pedagogical value of always offering contextual aids

### Layout Rule

> The layout is permanently split: 80% for EQ content, 20% for SP. Even if an SP is empty, the layout structure remains stable.

### SP Injection Logic

| `eq.sp` Value      | Behavior                       |
| ------------------ | ------------------------------ |
| Defined as `[...]` | Use as-is                      |
| `undefined`        | Fallback to `defaultSp`        |
| `[]`               | Explicitly hide SP for this EQ |

---

## 4. SP Component Types

SP components are designed to be theme-agnostic and platform-independent. They mirror the structure of canvas `ItemBuilders` but are currently rendered via Svelte.

```js
const spComponent = {
  type: "title" | "text" | "math" | "table" | "image" | "code" | "tableCode",
  data: Object // see type-specific structure below
};
```

### Type-specific `data` formats:

* `title`

  ```js
  { text: string }
  ```

* `text`

  ```js
  { text: string }
  ```

* `math`

  ```js
  { latex: string }
  ```

* `table`

  ```js
  { rows: string[][] }
  ```

* `image`

  ```js
  { src: string, alt?: string }
  ```

* `code`

  ```js
  { language: string, code: string }
  ```

* `tableCode`

  ```js
  { rows: string[][] }
  ```

### Why Aligned with Canvas Components?

* Future-proofing: can later reuse canvas render engine if needed
* Consistent visual abstraction across rendering targets
* Enables declarative, swappable rendering

---

## 5. Timing Model

### Key Rules

* User supplies only `endTime` for each `eq`
* `startTime` is auto-calculated:

  ```js
  startTime = previous endTime (or 0 for first)
  ```
* This ensures a strict sequence and removes ambiguity of mixed timing models (e.g., `showAt`)
* No overlaps, no gaps, consistent animation and rendering flow

### Why This Timing Model?

* Aligns with canvas deckBuilder logic
* Ensures clean sequential flow
* Easy to generate, validate, and consume

---

## 6. Design Principles

* **Semantic Typing**: `eq.type` and `sp.type` describe content intent, not visuals
* **Pure Data**: No layout, style, or theme information inside `eq` or `sp`
* **Stable Layout**: 80/20 rule prevents visual reflow
* **Injection Pattern**: Global `defaultSp` reduces repetition, while allowing overrides
* **Flat Structure**: No nesting or complexity inside SP components; each is self-contained

---

## 7. Use Cases & Extensibility

This structure can power:

* Math tutorial presentations
* Problem explanation sequences
* Step-by-step instructional overlays
* Multi-platform rendering (Svelte now, canvas later)

It can also be extended via:

* New `sp.type` components
* Richer validation of `sp.data`
* Theme-driven rendering profiles

---

## Final Thought

This system was designed to be intuitive, consistent, declarative, and future-adaptable. Its flat and semantic structure makes it easy to write, validate, render, and transform for any downstream application.
