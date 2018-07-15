const {Client} = require('discord.js');

/**
* @param {String} token The client's token uses to authorize the client.
* @param {Object} clientOptions Apply client options such as: disableEveryone.
*/
class Park extends Client {
    constructor(token, clientOptions) {
      super();
      this.token = token;
      this.clientOptions = clientOptions;
    }

    connect() {
      this.login(this.token);
      return this;
    }
}

module.exports = Park;
