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

	let Router = __webpack_require__(1);
	let Inbox = __webpack_require__(2);


	document.addEventListener("DOMContentLoaded", function(){

	  document.querySelectorAll(".sidebar-nav li").forEach(function(el) {
	    el.addEventListener("click", function(){
	      let inner = el.innerText;
	      inner = inner.toLowerCase();
	      window.location.hash = inner;
	    });
	  });
	  let content = document.querySelector(".content");
	  let router = new Router(content, routes);
	  router.start();
	});

	var routes = {
	    inbox: Inbox
	};


/***/ },
/* 1 */
/***/ function(module, exports) {

	

	class Router {
	  constructor(node, routes) {
	    this.node = node;
	    this.routes = routes;
	  }
	  start () {
	    this.render ();
	    let that = this;
	    window.addEventListener("hashchange",function () {
	      that.render();
	    });

	  }

	  activeRoute() {
	    let componentName = window.location.hash.replace('#', '');
	    return this.routes[componentName];

	  }

	  render() {
	    this.node.innerHTML = "";
	    let component = this.activeRoute();
	    let newNode = document.createElement("p");
	    // newNode.innerHTML = routeName;
	    // this.node.appendChild(newNode);
	    if (!component) {
	      this.node.innerHTML = "";
	    } else{
	      this.node.innerHTML = "";
	      let newNode = component.render();
	      this.node.appendChild(newNode);
	    }
	  }
	}

	module.exports = Router;


/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	let MessageStore = __webpack_require__(3);

	var Inbox = {

	  render () {
	    let container =  document.createElement("ul");
	    container.className = "messages";
	    container.innerHTML = "An Inbox Message";
	    return container;
	  }

	};

	module.exports = Inbox;


/***/ },
/* 3 */
/***/ function(module, exports) {

	let messages = {
	  sent: [
	    {to: "friend@mail.com", subject: "Check this out", body: "It's so cool"},
	    {to: "person@mail.com", subject: "zzz", body: "so booring"}
	  ],
	  inbox: [
	    {from: "grandma@mail.com", subject: "Fwd: Fwd: Fwd: Check this out", body:
	"Stay at home mom discovers cure for leg cramps. Doctors hate her"},
	  {from: "person@mail.com", subject: "Questionnaire", body: "Take this free quiz win $1000 dollars"}
	]
	};

	let MessageStore = {

	  getInboxMessages() {
	    return messages.inbox;
	  },

	  getSentMessages(){
	    return messages.sent;
	  }

	};


	module.exports = MessageStore;


/***/ }
/******/ ]);