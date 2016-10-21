/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	const DOMNodeCollection = __webpack_require__(1);

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


/***/ },
/* 1 */
/***/ function(module, exports) {

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


/***/ }
/******/ ]);