const {Collection} = require('discord.js');
const fs = require('fs');

/**
* @param {Object<String>} paths An object of string representing the path where the events and commands are
*/
class Handlers {
  constructor(client, paths) {
    this.commands = new Collection;
    this.events = new Collection;

    this.client = client;
    this.commandsPath = paths.commands;
    this.eventsPath = paths.events;
  }

  eventsHandler() {
    const path = this.eventsPath;
    const files = fs.readdirSync(path);
    const client = this.client;

    // 'full' stands for the full name of the file (ready.js)
    // 'short' stadns for the name without extension (ready)
    files.forEach((full) => {
      const short = full.replace('.js', '');
      const run = require(`${path}/${full}`);

      this.events.set(short, run)
      this.client.on(short, (...args) => {run(this.client, ...args)});
    });
  }

  commandsHandler() {
    const path = this.commandsPath;
    const files = fs.readdirSync(path);
    const client = this.client;

    files.forEach((full) => {
      const short = full.replace('.js', '');
      const command = require(`${path}/${full}`);

      this.commands.set(short, {run: command, help: command.help || {}})
    })
  }
}

module.exports = Handlers;
