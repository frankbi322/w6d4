class DOMNodeCollection{
  constructor(html){
    this.htmltag = html; //array of html elements
  }

  html(string) {
    if (string) {
      this.htmltag.forEach(el => {
        el.innerHTML = string;
      });
    } else {
      return this.htmltag[0].innerHTML;
    }
  }

  empty() {
    this.htmltag.forEach(el => {
      el.innerHTML = "";
    });
  }

  append(content){
    if(typeof content === "string"){
      let that = this;
      this.htmltag.forEach((el)=>{
        el.innerHTML += content;
      });
    } else if (content instanceof HTMLElement){
      this.htmltag.forEach((el) => {
        el.appendChild(content);
      });
    } else {
      this.htmltag.forEach((el) =>{
        content.forEach((el2) => {
          el.appendChild(el2);
        });
      });
    }
  }

  children(){
    let allChildren = [];
    this.htmltag.forEach((el)=> {
      allChildren.push(el.children);
    });
    return new DOMNodeCollection(allChildren);
  }

  parent(){
    let allParents = [];
    this.htmltag.forEach((el)=> {
      allParents.push(el.parentElement);
    });
    return new DOMNodeCollection(allParents);
  }

  find(selector) {
    let result = [];
    this.htmltag.forEach((el)=> {
      result.push(el.querySelectorAll(selector));
    });
    return new DOMNodeCollection(result);
  }

  remove() {
    this.htmltag.forEach((el) => {
      el.parentElement.removeChild(el);
    });
    this.htmltag = [];
  }

  on(e, cb) {
    this.htmltag.forEach((el) =>{
      el.addEventListener(e, cb);
    });

  }

  off (e, cb) {
    this.htmltag.forEach((el) =>{
      el.removeEventListener(e, cb);
    });
  }
}

module.exports = DOMNodeCollection;
