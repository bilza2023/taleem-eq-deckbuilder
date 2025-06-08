



// Eq.js

export class Eq {
    /**
     * @param {number} startTime 
     * @param {number} endTime 
     * @param {EqType} type 
     * @param {string} content 
     * @param {SpComponent[]=} sp 
     */
    constructor(startTime, endTime, type, content, sp) {
      this.startTime = startTime;
      this.endTime = endTime;
      this.type = type;
      this.content = content;
      if (sp !== undefined) {
        this.sp = sp;
      }
    }
  }
  