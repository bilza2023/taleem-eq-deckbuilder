

  
  // Sp.js
  
  export class Sp {
    constructor() {
      this.components = [];
    }
  
    title(text) {
      this.components.push({ type: "title", data: { text } });
      return this;
    }
  
    text(text) {
      this.components.push({ type: "text", data: { text } });
      return this;
    }
  
    math(latex) {
      this.components.push({ type: "math", data: { latex } });
      return this;
    }
  
    table(rows) {
      this.components.push({ type: "table", data: { rows } });
      return this;
    }
  
    image(src, alt) {
      this.components.push({ type: "image", data: { src, alt } });
      return this;
    }
  
    code(language, code) {
      this.components.push({ type: "code", data: { language, code } });
      return this;
    }
  
    tableCode(rows) {
      this.components.push({ type: "tableCode", data: { rows } });
      return this;
    }
  
    getComponents() {
      return this.components;
    }
  }
  
  