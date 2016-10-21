

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
