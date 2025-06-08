// examples/sp-demo.js

import { EqDeckBuilder } from "../src/EqDeckBuilder.js";
import { Sp } from "../src/Sp.js";

const deck = new EqDeckBuilder();

// Default SP: Used by slide 1 only
const globalSp = new Sp()
  .title("The Beauty of Physics")
  .image("taleemclass", "Learning environment")
  .getComponents();
deck.setGlobalSp(globalSp);

// Slide 1: Uses global SP
deck.math(3, "E = mc^2");

// Slide 2: Lorentz factor with custom SP
deck.math(6, "\\gamma = \\frac{1}{\\sqrt{1 - \\frac{v^2}{c^2}}}");
deck.setSp(new Sp()
  .title("Relativity Begins")
  .image("physicsArt", "Lorentz transformation")
  .getComponents());

// Slide 3: Gravitational Force
deck.math(9, "F = G \\frac{m_1 m_2}{r^2}");
deck.setSp(new Sp()
  .title("Newton’s Gravity")
  .image("appleFallingFromTree", "Classic gravity story")
  .getComponents());

// Slide 4: Kinetic Energy
deck.math(12, "KE = \\frac{1}{2}mv^2");
deck.setSp(new Sp()
  .title("Motion Energy")
  .image("rocketTakeoff", "Rocket lifting off")
  .getComponents());

// Slide 5: Quadratic Formula
deck.math(15, "x = \\frac{-b \\pm \\sqrt{b^2 - 4ac}}{2a}");
deck.setSp(new Sp()
  .title("Solving Equations")
  .image("drops", "Mathematical abstraction")
  .getComponents());

// Slide 6: SP Table
deck.text(18, "SP: Constants Table");
deck.setSp(new Sp().table([
  ["Constant", "Symbol", "Value"],
  ["Speed of light", "c", "3.00×10^8 m/s"],
  ["Gravitational", "G", "6.67×10^-11 N·m²/kg²"],
  ["Planck", "h", "6.63×10^-34 J·s"]
]).getComponents());

// Slide 7: SP TableCode
deck.text(21, "SP: Variables as Code");
deck.setSp(new Sp().tableCode([
  ["Variable", "Type", "Example"],
  ["velocity", "float", "3.2"],
  ["name", "string", "'Ali'"]
]).getComponents());

// Slide 8: Visual identity
deck.text(24, "SP: Every Day Physics");
deck.setSp(new Sp()
  .title("Examples All Around")
  .image("everyDayItems", "Items in motion")
  .getComponents());

// Slide 9: Visual identity 2
deck.text(27, "SP: Female Teacher in Class");
deck.setSp(new Sp()
  .title("Educators at Work")
  .image("femaleTeacher", "Teaching science")
  .getComponents());

// Slide 10: Visual identity 3
deck.text(30, "SP: Forces in Action");
deck.setSp(new Sp()
  .title("Types of Force")
  .image("typesOfForce", "Demonstration of physical forces")
  .getComponents());

// Slide 11: Plain Text SP
deck.text(33, "SP: Text Type");
deck.setSp(new Sp()
  .text("This is a supporting text-only explanation.")
  .getComponents());

// Slide 12: Math Type SP
deck.text(36, "SP: Math Type");
deck.setSp(new Sp()
  .math("e^{i\\pi} + 1 = 0")
  .getComponents());

export default deck.build();
