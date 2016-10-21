let MessageStore = require('./message_store.js');

var Inbox = {

  render () {
    let container =  document.createElement("ul");
    container.className = "messages";
    container.innerHTML = "An Inbox Message";
    return container;
  }

};

module.exports = Inbox;
