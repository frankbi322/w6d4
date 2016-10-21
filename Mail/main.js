let Router = require('./router.js');
let Inbox = require('./inbox.js');


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
