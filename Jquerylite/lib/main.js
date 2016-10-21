const DOMNodeCollection = require('./dom_node_collection.js');

  let queue = [];

//our version of jQuery's $() function
window.$l = function(selector){
    if (selector instanceof HTMLElement || typeof(selector) === "string"){
      let nodeList = document.querySelectorAll(selector); //gets all the elements
      let nodes = Array.from(nodeList);
      return new DOMNodeCollection(nodes); //returns an array of nodes (elements)
    }
    else if (typeof(selector)==="function") {
      queue.push(selector);
    }

};

window.$l (el  => console.log("hello"));
window.$l (el  => console.log(document.querySelectorAll("li")));

document.addEventListener('DOMContentLoaded', () => {
  queue.forEach(func => func());
});
