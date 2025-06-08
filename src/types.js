
// types.js

/** @typedef {"title" | "heading" | "text" | "math"} EqType */

/**
 * @typedef {Object} Eq
 * @property {number} startTime
 * @property {number} endTime
 * @property {EqType} type
 * @property {string} content
 * @property {SpComponent[]=} sp
 */

/**
 * @typedef {Object} SpComponent
 * @property {string} type
 * @property {Object} data
 */
