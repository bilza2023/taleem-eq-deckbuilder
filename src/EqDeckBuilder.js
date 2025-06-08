

  // EqDeckBuilder.js
  
  import { Eq } from "./Eq.js";
  
  export class EqDeckBuilder {
    constructor() {
      this.eqList = [];
      this.defaultSp = undefined;
      this.currentStart = 0;
    }
  
    setGlobalSp(spArray) {
      this.defaultSp = spArray;
    }
  
    /** @private */
    _add(type, endTime, content) {
      const eq = new Eq(this.currentStart, endTime, type, content);
      this.eqList.push(eq);
      this.currentStart = endTime;
    }
  
    title(endTime, content) {
      this._add("title", endTime, content);
    }
  
    heading(endTime, content) {
      this._add("heading", endTime, content);
    }
  
    text(endTime, content) {
      this._add("text", endTime, content);
    }
  
    math(endTime, latex) {
      this._add("math", endTime, latex);
    }
  
    setSp(spArray) {
      const last = this.eqList[this.eqList.length - 1];
      if (last) {
        last.sp = spArray;
      }
    }
  
    build() {
      return {
        slide: this.eqList.map(eq => {
          const out = { ...eq };
          if (out.sp === undefined && this.defaultSp) {
            out.sp = this.defaultSp;
          }
          return out;
        }),
        defaultSp: this.defaultSp
      };
    }
  }
  